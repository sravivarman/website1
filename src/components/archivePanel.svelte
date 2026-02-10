<script lang="ts">
import { onMount } from "svelte";

import { getPostUrl } from "@utils/url";
import { i18n } from "@i18n/translation";
import I18nKey from "@i18n/i18nKey";

const PAGE_SIZE = 20;

interface Post {
    id: string;
    data: {
        title: string;
        tags: string[];
        category?: string;
        published: Date | string;
        routeName?: string;
    };
}

interface Group {
    year: number;
    posts: Post[];
}

interface Props {
    sortedPosts?: Post[];
}

let { sortedPosts = [] }: Props = $props();

let tags = $state<string[]>([]);
let categories = $state<string[]>([]);
let uncategorized = $state<string | null>(null);
let currentPage = $state(1);

onMount(() => {
    const params = new URLSearchParams(window.location.search);
    tags = params.has("tag") ? params.getAll("tag") : [];
    categories = params.has("category") ? params.getAll("category") : [];
    uncategorized = params.get("uncategorized");
    // Reset to page 1 when filters change
    currentPage = 1;
});

function formatDate(date: Date | string) {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
    return tagList.map((t) => `#${t}`).join(" ");
}

// Get all filtered posts (before pagination)
let allFilteredPosts = $derived.by(() => {
    let filteredPosts = sortedPosts.map((post) => ({
        ...post,
        data: {
            ...post.data,
            published: new Date(post.data.published),
        },
    }));

    if (tags.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) =>
                Array.isArray(post.data.tags) &&
                post.data.tags.some((tag) => tags.includes(tag)),
        );
    }

    if (categories.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) => post.data.category && categories.includes(post.data.category),
        );
    }

    if (uncategorized !== null) {
        filteredPosts = filteredPosts.filter((post) => !post.data.category);
    }

    // 按发布时间倒序排序，确保不受置顶影响
    filteredPosts = filteredPosts.slice().sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

    return filteredPosts;
});

// Calculate total pages
let totalPages = $derived(Math.ceil(allFilteredPosts.length / PAGE_SIZE));

// Reset to page 1 when filters change and page is out of bounds
$effect(() => {
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = 1;
    }
});

// Get paginated posts for current page
let paginatedPosts = $derived.by(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allFilteredPosts.slice(start, end);
});

// Group paginated posts by year
let groups = $derived.by(() => {
    const grouped = paginatedPosts.reduce(
        (acc, post) => {
            const year = post.data.published.getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(post);
            return acc;
        },
        {} as Record<number, Post[]>,
    );

    const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
        year: Number.parseInt(yearStr, 10),
        posts: grouped[Number.parseInt(yearStr, 10)],
    }));

    groupedPostsArray.sort((a, b) => b.year - a.year);

    return groupedPostsArray;
});

// Generate page numbers for pagination
let pageNumbers = $derived.by(() => {
    const HIDDEN = -1;
    const ADJ_DIST = 2;
    const VISIBLE = ADJ_DIST * 2 + 1;
    
    let count = 1;
    let l = currentPage;
    let r = currentPage;
    while (0 < l - 1 && r + 1 <= totalPages && count + 2 <= VISIBLE) {
        count += 2;
        l--;
        r++;
    }
    while (0 < l - 1 && count < VISIBLE) {
        count++;
        l--;
    }
    while (r + 1 <= totalPages && count < VISIBLE) {
        count++;
        r++;
    }

    let pages: number[] = [];
    if (l > 1) pages.push(1);
    if (l === 3) pages.push(2);
    if (l > 3) pages.push(HIDDEN);
    for (let i = l; i <= r; i++) pages.push(i);
    if (r < totalPages - 2) pages.push(HIDDEN);
    if (r === totalPages - 2) pages.push(totalPages - 1);
    if (r < totalPages) pages.push(totalPages);
    
    return pages;
});

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        // Scroll to top of the archive panel
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
</script>

<div>
    {#each groups as group}
        <div>
            <div class="flex flex-row w-full items-center h-[3.75rem]">
                <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                    {group.year}
                </div>
                <div class="w-[15%] md:w-[10%]">
                    <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto outline-offset-[2px] z-50 outline-3"></div>
                </div>
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
                </div>
            </div>
            {#each group.posts as post}
                <a href={getPostUrl(post)}
                    aria-label={post.data.title}
                    class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                >
                    <div class="flex flex-row justify-start items-center h-full">
                        <!-- date -->
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(post.data.published)}
                        </div>
                        <!-- dot and line -->
                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                                bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                                outline outline-4 z-50
                                outline-[var(--card-bg)]
                                group-hover:outline-[var(--btn-plain-bg-hover)]
                                group-active:outline-[var(--btn-plain-bg-active)]"
                            ></div>
                        </div>
                        <!-- post title -->
                        <div class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                            group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                            text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                        >
                            {post.data.title}
                        </div>
                        <!-- tag list -->
                        <div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                        >
                            {formatTag(post.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}

    <!-- Pagination Controls -->
    {#if totalPages > 1}
        <div class="flex flex-row gap-3 justify-center mt-8">
            <!-- Previous button -->
            <button
                onclick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                class="btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11 flex items-center justify-center"
                class:disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            
            <!-- Page numbers -->
            <div class="bg-[var(--card-bg)] flex flex-row rounded-lg items-center text-neutral-700 dark:text-neutral-300 font-bold">
                {#each pageNumbers as p}
                    {#if p === -1}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mx-1">
                            <path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"/>
                        </svg>
                    {:else if p === currentPage}
                        <div class="h-11 w-11 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold text-white dark:text-black/70">
                            {p}
                        </div>
                    {:else}
                        <button
                            onclick={() => goToPage(p)}
                            aria-label={`Page ${p}`}
                            class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85] flex items-center justify-center"
                        >
                            {p}
                        </button>
                    {/if}
                {/each}
            </div>
            
            <!-- Next button -->
            <button
                onclick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                class="btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11 flex items-center justify-center"
                class:disabled={currentPage === totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8.59 16.59L10 18l6-6l-6-6l-1.41 1.41L13.17 12z"/>
                </svg>
            </button>
        </div>
    {/if}
</div>