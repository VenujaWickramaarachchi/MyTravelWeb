import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coming Soon | Viora Lanka",
    description:
        "Viora Lanka is preparing exceptional Sri Lankan travel experiences. Our website will be available soon.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function MaintenancePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F8F4E9] px-6 text-center">
            <div className="max-w-2xl">
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#8B5FBF]">
                    VIORA LANKA
                </p>

                <h1 className="font-serif text-4xl text-[#3B0F6B] md:text-6xl">
                    Something beautiful is on the way.
                </h1>

                <p className="mx-auto mt-6 max-w-lg leading-7 text-[#2B0E45]/80">
                    We are crafting exceptional journeys through Sri Lanka.
                    Our website is currently being prepared for launch.
                    Please check back soon.
                </p>

                <p className="mt-10 text-sm text-[#5B1E96]">
                    Discover Sri Lanka differently.
                </p>
            </div>
        </main>
    );
}