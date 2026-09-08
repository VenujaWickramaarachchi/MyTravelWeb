import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone, travelDate, travellers, interests, message } =
      body

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 },
      )
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
      replyTo: email,
      subject: `New Travel Enquiry from ${name}`,
      text: `
New travel enquiry received from the Viora Lanka website.

Name: ${name}
Email: ${email}
Phone / WhatsApp: ${phone || 'Not provided'}
Preferred Travel Date: ${travelDate || 'Not provided'}
Number of Travellers: ${travellers || 'Not provided'}
Travel Interest: ${interests || 'Not provided'}

Message:
${message || 'No message provided'}
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
