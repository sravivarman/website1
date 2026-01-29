import { LinkPreset, type NavbarLink } from "@/types/config";


export const LinkPresets: { [key in LinkPreset]: NavbarLink } = {
    [LinkPreset.Home]: {
        name: "Home",
        url: "/",
        icon: "material-symbols:home",
        description: "Twilight - A simple, clean, and beautiful blog theme.",
    },
    [LinkPreset.Archive]: {
        name: "Archive",
        url: "/archive/",
        icon: "material-symbols:archive",
        description: "A chronological list of all published posts.",
    },
    [LinkPreset.Projects]: {
        name: "Projects",
        url: "/projects/",
        icon: "material-symbols:work",
        description: "My amazing projects showcase",
    },
    [LinkPreset.Skills]: {
        name: "Skills",
        url: "/skills/",
        icon: "material-symbols:psychology",
        description: "My technical expertise and proficiency",
    },
    [LinkPreset.Timeline]: {
        name: "Timeline",
        url: "/timeline/",
        icon: "material-symbols:timeline",
        description: "My journey through time",
    },
    [LinkPreset.Diary]: {
        name: "Diary",
        url: "/diary/",
        icon: "material-symbols:book",
        description: "Daily moments and thoughts",
    },
    [LinkPreset.Albums]: {
        name: "Albums",
        url: "/albums/",
        icon: "material-symbols:photo-library",
        description: "Photo collections and galleries",
    },
    [LinkPreset.Anime]: {
        name: "Anime",
        url: "/anime/",
        icon: "material-symbols:movie",
        description: "A list of anime I have watched.",
    },
    [LinkPreset.Friends]: {
        name: "Friends",
        url: "/friends/",
        icon: "material-symbols:group",
        description: "A curated list of friend sites.",
    },
    [LinkPreset.About]: {
        name: "About",
        url: "/about/",
        icon: "material-symbols:info",
        description: "About me",
    },
};