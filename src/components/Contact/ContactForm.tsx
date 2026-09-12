'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSending(true)
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      travelDate: formData.get('travelDate'),
      travellers: formData.get('travellers'),
      interests: formData.get('interests'),
      message: formData.get('message'),
      website: formData.get('website'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send enquiry')
      }

      setSubmitted(true)
      form.reset()
    } catch (error) {
      console.error(error)
      setError('Sorry, we could not send your enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border border-ink/8 shadow-sm">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-gold-deep font-semibold block mb-2">
          Start Your Conversation
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
          Plan Your Sri Lankan Journey
        </h2>
        <p className="text-ink/70 mt-2 text-base font-sans">
          Tell us a little about your trip and our local travel designers will craft a tailored itinerary for you.
        </p>
      </div>

      {submitted ? (
        <div className="bg-ivory border border-gold/40 rounded-2xl p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-gold/20 text-gold-deep rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-ink">
            Enquiry Sent Successfully.
          </h3>
          <p className="text-ink/80 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. One of our destination specialists will review your requirements and get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs uppercase tracking-wider font-bold text-violet hover:underline pt-2 inline-block"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
                Phone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="travelDate" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
                Estimated Travel Date
              </label>
              <input
                id="travelDate"
                name="travelDate"
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="travellers" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
                Number of Guests
              </label>
              <input
                id="travellers"
                name="travellers"
                type="number"
                min="1"
                placeholder="2"
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="interests" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
              Primary Travel Interest
            </label>
            <select
              id="interests"
              name="interests"
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all"
            >
              <option value="" disabled>
                Select your preferred travel style
              </option>
              <option value="beaches">Beaches & Coastal Relaxation</option>
              <option value="culture">Ancient Culture & UNESCO Heritage</option>
              <option value="wildlife">Wildlife Safaris & Nature</option>
              <option value="adventure">Highlands & Adventure Trekking</option>
              <option value="honeymoon">Romantic Escapes & Honeymoons</option>
              <option value="family">Family Island Journeys</option>
              <option value="luxury">Luxury & Tea Estate Retreats</option>
              <option value="custom">Fully Tailored Custom Journey</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
              Tell Us About Your Vision
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Share places you dream of visiting, special requests, preferred pace of travel, or any dietary/accessibility needs."
              className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-all resize-y"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gold hover:bg-gold-deep text-ink font-semibold tracking-wide shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {sending ? (
              <>
                <svg className="animate-spin w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Submitting Your Enquiry...</span>
              </>
            ) : (
              'Send Trip Enquiry'
            )}
          </button>
        </form>
      )}
    </div>
  )
}
