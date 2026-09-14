export default function Loading() {
    return (
        <main className='min-h-screen bg-paper flex items-center justify-center px-4 py-24'>
            <div className='text-center'>
                <div
                    className='mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-violet-deep'
                    aria-hidden='true'
                />

                <p className='text-sm font-medium text-ink/70'>
                    Preparing your Sri Lanka journey...
                </p>
            </div>
        </main>
    )
}