interface EmailData {
  name: string
  email: string
  phone?: string
  message?: string
  service?: string
  projectType?: string
  location?: string
  budget?: string
  timeline?: string
}

export async function sendEmail(data: EmailData, type: 'contact' | 'quote') {
  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_TO_EMAIL = process.env.BREVO_TO_EMAIL || 'infohermansoftware@gmail.com'
  const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || 'infohermansoftware@gmail.com'

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY not set')
    throw new Error('Email service not configured')
  }

  const subject = type === 'quote' 
    ? `New Quote Request from ${data.name}`
    : `New Contact Message from ${data.name}`

  const htmlContent = type === 'quote' 
    ? `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${data.projectType || 'N/A'}</p>
      <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
      <p><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message || 'No additional details provided.'}</p>
    `
    : `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message || 'No message provided.'}</p>
    `

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: BREVO_FROM_EMAIL, name: 'RIGO Website' },
      to: [{ email: BREVO_TO_EMAIL }],
      subject,
      htmlContent,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Brevo error:', error)
    throw new Error('Failed to send email')
  }

  return response.json()
}