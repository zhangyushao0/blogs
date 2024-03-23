// src/types/blog.ts
export interface Metadata {
    title: string;
    date: string;
    summary: string;
    link: string;
}

export interface Post {
    date: string;
    content: string;
}