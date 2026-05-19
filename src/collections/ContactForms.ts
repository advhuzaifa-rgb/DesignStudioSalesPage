import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canDelete } from '../access/roles'

const sendBrevo = async (payload: {
  sender: { email: string; name: string }
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
}) => {
  const apiKey = (process.env.BREVO_API_KEY || '').trim()
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY not set')
    return
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 10000)
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      const text = await res.text().catch(() => '<no-body>')
      if (!res.ok) throw new Error(`Brevo ${res.status}: ${text}`)
      console.log(`✅ Brevo email sent (attempt ${attempt})`)
      return
    } catch (err: any) {
      clearTimeout(timer)
      console.error(`❌ Brevo attempt ${attempt} failed:`, err?.message)
      if (attempt === 2) throw err
      await new Promise((r) => setTimeout(r, 400))
    }
  }
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  hospitality: 'Hospitality',
  commercial: 'Commercial',
}

export const ContactForms: CollectionConfig = {
  slug: 'contact-forms',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'projectType', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    read: isAdminOrEditor,
    create: () => true,
    update: isAdminOrEditor,
    delete: canDelete,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'location', label: 'Location', type: 'text' },
        {
          name: 'projectType',
          label: 'Project Type',
          type: 'select',
          options: [
            { label: 'Residential', value: 'residential' },
            { label: 'Hospitality', value: 'hospitality' },
            { label: 'Commercial', value: 'commercial' },
          ],
        },
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
    },
  ],
  timestamps: true,

  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return

        const verifiedSender = process.env.VERIFIED_SENDER || process.env.ADMIN_EMAIL
        const adminEmail = process.env.ADMIN_EMAIL

        if (!verifiedSender) {
          console.error('❌ VERIFIED_SENDER or ADMIN_EMAIL not set')
          return
        }

        const fullName = `${doc.firstName || ''} ${doc.lastName || ''}`.trim()
        const projectLabel = PROJECT_TYPE_LABELS[doc.projectType] || doc.projectType || 'Not specified'
        const submittedAt = doc.createdAt || new Date().toISOString()

        // Admin notification
        if (adminEmail) {
          try {
            await sendBrevo({
              sender: { email: verifiedSender, name: 'Al Huzaifa Design Studio' },
              to: [{ email: adminEmail, name: 'Admin' }],
              subject: `📩 New Enquiry — ${fullName}`,
              htmlContent: `
                <h2 style="color:#333;font-family:sans-serif">New Contact Form Submission</h2>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${fullName}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.email}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.phone}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Location</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.location || '—'}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Project Type</strong></td><td style="padding:8px;border:1px solid #ddd">${projectLabel}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.message || '—'}</td></tr>
                </table>
                <p style="color:#999;font-size:12px;font-family:sans-serif">Submitted on ${submittedAt}</p>
              `,
            })
            console.log('✅ Admin notification sent to', adminEmail)
          } catch (err) {
            console.error('❌ Failed to send admin email:', err)
          }
        }

        // User confirmation
        if (doc.email) {
          try {
            await sendBrevo({
              sender: { email: verifiedSender, name: 'Al Huzaifa Design Studio' },
              to: [{ email: doc.email, name: fullName }],
              subject: 'Thank you for contacting Al Huzaifa Design Studio',
              htmlContent: `
                <h2 style="color:#333;font-family:sans-serif">Thank you, ${doc.firstName}!</h2>
                <p style="font-family:sans-serif">We've received your enquiry and will be in touch shortly.</p>
                <h3 style="color:#555;font-family:sans-serif">Your submission summary:</h3>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${fullName}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.email}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.phone}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Location</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.location || '—'}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Project Type</strong></td><td style="padding:8px;border:1px solid #ddd">${projectLabel}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${doc.message || '—'}</td></tr>
                </table>
                <p style="margin-top:24px;font-family:sans-serif">Warm regards,<br/><strong>Al Huzaifa Design Studio</strong></p>
                <p style="color:#999;font-size:12px;font-family:sans-serif">Submitted on ${submittedAt}</p>
              `,
            })
            console.log('✅ Confirmation email sent to', doc.email)
          } catch (err) {
            console.error('❌ Failed to send user confirmation email:', err)
          }
        }
      },
    ],
  },
}
