// Courses data configuration file
// Used to manage data for the courses page
import { getCollection } from "astro:content";

export interface Course {
    id: string;
    title: string;
    code: string;
    description: string;
    cover: string;
    academicYear: string;
    semester: string;
    credits?: number;
    tags: string[];
    active: boolean;
    order: number;
    body: string;
}

export async function getCoursesData(): Promise<Course[]> {
    const courses = await getCollection("courses");
    return courses
        .map((course) => ({
            id: course.id,
            title: course.data.title,
            code: course.data.code,
            description: course.data.description,
            cover: course.data.cover,
            academicYear: course.data.academicYear,
            semester: course.data.semester,
            credits: course.data.credits,
            tags: course.data.tags,
            active: course.data.active,
            order: course.data.order,
            body: course.body || "",
        }))
        .sort((a, b) => {
            // Sort by: active first, then by academicYear (desc), then by order
            if (a.active !== b.active) return a.active ? -1 : 1;
            if (a.academicYear !== b.academicYear) return b.academicYear.localeCompare(a.academicYear);
            return a.order - b.order;
        });
}

export async function getActiveCourses(): Promise<Course[]> {
    const courses = await getCoursesData();
    return courses.filter((c) => c.active);
}

export async function getArchivedCourses(): Promise<Course[]> {
    const courses = await getCoursesData();
    return courses.filter((c) => !c.active);
}

export async function getCoursesByYear(year: string): Promise<Course[]> {
    const courses = await getCoursesData();
    return courses.filter((c) => c.academicYear === year);
}
