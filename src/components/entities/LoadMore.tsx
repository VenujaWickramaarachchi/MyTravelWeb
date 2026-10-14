'use client'

interface LoadMoreProps {
    hasMore: boolean
    isLoading: boolean
    onClick: () => void
}

export default function LoadMore({
    hasMore,
    isLoading,
    onClick,
}: LoadMoreProps) {
    if (!hasMore) {
        return null
    }

    return (
        <div className="flex justify-center pt-8">
            <button
                type="button"
                onClick={onClick}
                disabled={isLoading}
                className="border border-ink px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {isLoading ? 'Loading...' : 'View More'}
            </button>
        </div>
    )
}