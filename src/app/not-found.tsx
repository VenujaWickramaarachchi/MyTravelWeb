import Link from 'next/link'

export default function NotFound() {
    return (
        <main className='min-h-screen bg-paper flex items-center justify-center px-4 py-24'>
            <section className='max-w-2xl mx-auto text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-violet-deep mb-4'>
                    404 — Page Not Found
                </p>

                <h1 className='font-serif text-4xl md:text-6xl font-semibold text-ink mb-6'>
                    This journey seems to have taken a different route.
                </h1>

                <p className='text-base md:text-lg text-ink/70 leading-relaxed max-w-xl mx-auto mb-8'>
                    The page you are looking for may have moved, been removed, or
                    the address may be incorrect.
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                    <Link
                        href='/'
                        className='inline-flex items-center justify-center rounded-full bg-violet-deep px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90'
                    >
                        Back to Home
                    </Link>

                    <Link
                        href='/tours'
                        className='inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5'
                    >
                        Explore Tours
                    </Link>
                </div>
            </section>
        </main>
    )
}