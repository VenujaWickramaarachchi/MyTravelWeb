import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5

let lastRateLimitCleanup = 0
const RATE_LIMIT_CLEANUP_INTERVAL = 10 * 60 * 1000 // 10 minutes

function cleanupRateLimit() {
  const now = Date.now()

  if (now - lastRateLimitCleanup < RATE_LIMIT_CLEANUP_INTERVAL) {
    return
  }

  lastRateLimitCleanup = now

  for (const [ip, entry] of rateLimit.entries()) {
    if (now >= entry.resetAt) {
      rateLimit.delete(ip)
    }
  }
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')

    const ip =
      forwardedFor?.split(',')[0]?.trim() ||
      realIp ||
      'unknown'

    const now = Date.now()

    cleanupRateLimit()

    const existing = rateLimit.get(ip)

    if (existing && now < existing.resetAt) {
      if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
        return NextResponse.json(
          { message: 'Too many enquiries. Please try again later.' },
          { status: 429 },
        )
      }

      existing.count += 1
    } else {
      rateLimit.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW,
      })
    }

    const body = await request.json()
    const {
      name,
      email,
      phone,
      travelDate,
      travellers,
      interests,
      message,
      website
    } = body

    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json(
        { message: 'Enquiry sent successfully.' },
        { status: 200 },
      )
    }

    // Basic type validation
    if (
      typeof name !== 'string' ||
      typeof email !== 'string'
    ) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 },
      )
    }

    // Clean and normalize input
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone =
      typeof phone === 'string' ? phone.trim() : ''
    const cleanTravelDate =
      typeof travelDate === 'string' ? travelDate.trim() : ''
    const cleanInterests =
      typeof interests === 'string' ? interests.trim() : ''
    const cleanMessage =
      typeof message === 'string' ? message.trim() : ''

    // Required field validation
    if (!cleanName || !cleanEmail) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 },
      )
    }

    // Input length limits
    if (cleanName.length > 100) {
      return NextResponse.json(
        { message: 'Name is too long.' },
        { status: 400 },
      )
    }

    if (cleanEmail.length > 254) {
      return NextResponse.json(
        { message: 'Email address is too long.' },
        { status: 400 },
      )
    }

    if (cleanPhone.length > 50) {
      return NextResponse.json(
        { message: 'Phone number is too long.' },
        { status: 400 },
      )
    }

    if (cleanTravelDate.length > 30) {
      return NextResponse.json(
        { message: 'Travel date is invalid.' },
        { status: 400 },
      )
    }

    if (cleanInterests.length > 100) {
      return NextResponse.json(
        { message: 'Travel interest is invalid.' },
        { status: 400 },
      )
    }

    if (cleanMessage.length > 5000) {
      return NextResponse.json(
        { message: 'Message is too long.' },
        { status: 400 },
      )
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 },
      )
    }

    // Validate travellers when provided
    let cleanTravellers = ''

    if (travellers !== null && travellers !== undefined && travellers !== '') {
      const travellersNumber = Number(travellers)

      if (
        !Number.isInteger(travellersNumber) ||
        travellersNumber < 1 ||
        travellersNumber > 100
      ) {
        return NextResponse.json(
          { message: 'Number of travellers is invalid.' },
          { status: 400 },
        )
      }

      cleanTravellers = String(travellersNumber)
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `New Travel Enquiry from ${cleanName}`,
      text: `
New travel enquiry received from the Viora Lanka website.

Name: ${cleanName}
Email: ${cleanEmail}
Phone / WhatsApp: ${cleanPhone || 'Not provided'}
Preferred Travel Date: ${cleanTravelDate || 'Not provided'}
Number of Travellers: ${cleanTravellers || 'Not provided'}
Travel Interest: ${cleanInterests || 'Not provided'}

Message:
${cleanMessage || 'No message provided'}
      `,
    })

    return NextResponse.json(
      { message: 'Enquiry sent successfully.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { message: 'Unable to send enquiry.' },
      { status: 500 },
    )
  }
}