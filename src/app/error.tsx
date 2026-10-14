'use client'

import { useEffect } from 'react'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Error boundaries must be Client Components.
    }, [])

    return (
        <main className='min-h-screen bg-paper flex items-center justify-center px-4 py-24'>
            <section className='max-w-2xl mx-auto text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-violet-deep mb-4'>
                    Something went wrong
                </p>

                <h1 className='font-serif text-4xl md:text-6xl font-semibold text-ink mb-6'>
                    We couldn’t complete that journey.
                </h1>

                <p className='text-base md:text-lg text-ink/70 leading-relaxed max-w-xl mx-auto mb-8'>
                    Something unexpected happened while loading this page. Please try
                    again, or return to the home page.
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                    <button
                        type='button'
                        onClick={() => reset()}
                        className='inline-flex items-center justify-center rounded-full bg-violet-deep px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90'
                    >
                        Try Again
                    </button>

                    <a
                        href='/'
                        className='inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5'
                    >
                        Back to Home
                    </a>
                </div>
            </section>
        </main>
    )
}