import { Project, ProjectCategory, PROJECTS } from "@/data/projects";

// Placeholder URL - User needs to replace this
const GAS_API_URL = process.env.NEXT_PUBLIC_API_URL || "YOUR_GAS_WEB_APP_URL_HERE";

interface GasWork {
    id: number;
    timestamp: string;
    author: string;
    twitter: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    workUrl: string;
}

interface GasResponse {
    success: boolean;
    count: number;
    works: GasWork[];
    updatedAt: string;
    error?: string;
}

function mapCategory(gasCategory: string): ProjectCategory {
    // Basic mapping based on GAS script logic
    if (gasCategory === 'apps') return "Apps & Tools";
    if (gasCategory === 'documents') return "Documents";
    if (gasCategory === 'data') return "Data & Analysis";
    if (gasCategory === 'creative') return "Creative";
    return "Others";
}

export async function fetchProjects(): Promise<Project[]> {
    if (GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL_HERE")) {
        console.warn("API URL not set. Returning mock data.");
        return PROJECTS;
    }

    console.log("[API] Fetching projects from:", GAS_API_URL);

    try {
        const response = await fetch(GAS_API_URL, {
            method: "GET",
            cache: "no-store",
            // Revalidate every request
            next: { revalidate: 0 }
        });

        console.log("[API] Response status:", response.status);

        if (!response.ok) {
            console.error("[API] HTTP error:", response.status, response.statusText);
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }

        const data: GasResponse = await response.json();
        console.log("[API] Data received:", data);

        if (!data.success) {
            console.error("[API] API returned success: false", data.error);
            throw new Error(data.error || "Unknown API error");
        }

        return data.works.map((work) => ({
            id: String(work.id),
            title: work.title,
            description_short: work.description.length > 80 ? work.description.substring(0, 80) + "..." : work.description,
            description: work.description,
            category: mapCategory(work.category),
            thumbnail_url: work.imageUrl,
            project_url: work.workUrl || undefined,
            creator_name: work.author,
            creator_x_id: work.twitter,
            creator_x_url: work.twitter ? `https://x.com/${work.twitter}` : undefined,
            status: "approved",
        }));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}
