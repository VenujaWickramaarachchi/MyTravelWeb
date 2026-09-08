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
    <section>
      <div>
        <h2>Plan Your Sri Lankan Journey</h2>

        <p>
          Tell us a little about your trip and we'll help you start planning.
        </p>

        {submitted ? (
          <p>Thank you. Your enquiry has been received.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Full Name</label>
              <input id='name' name='name' type='text' required />
            </div>

            <div>
              <label htmlFor='email'>Email</label>
              <input id='email' name='email' type='email' required />
            </div>

            <div>
              <label htmlFor='phone'>Phone / WhatsApp</label>
              <input id='phone' name='phone' type='tel' />
            </div>

            <div>
              <label htmlFor='travelDate'>Preferred Travel Date</label>
              <input id='travelDate' name='travelDate' type='date' />
            </div>

            <div>
              <label htmlFor='travellers'>Number of Travellers</label>
              <input id='travellers' name='travellers' type='number' min='1' />
            </div>

            <div>
              <label htmlFor='interests'>Travel Interests</label>
              <select id='interests' name='interests' defaultValue=''>
                <option value='' disabled>
                  Select an interest
                </option>
                <option value='beaches'>Beaches & Relaxation</option>
                <option value='culture'>Culture & Heritage</option>
                <option value='wildlife'>Wildlife & Nature</option>
                <option value='adventure'>Adventure</option>
                <option value='honeymoon'>Honeymoon</option>
                <option value='family'>Family Holiday</option>
                <option value='luxury'>Luxury Travel</option>
                <option value='custom'>Custom Journey</option>
              </select>
            </div>

            <div>
              <label htmlFor='message'>Tell Us About Your Trip</label>
              <textarea
                id='message'
                name='message'
                rows={6}
                placeholder='Tell us where you would like to go, what you would like to experience, or anything else about your trip.'
              />
            </div>

            {error ? <p role='alert'>{error}</p> : null}

            <button type='submit' disabled={sending}>
              {sending ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
