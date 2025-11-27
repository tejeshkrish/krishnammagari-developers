import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, message, plotNumber } = await req.json()

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f5; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
            .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; }
            .logo-text { color: #fbbf24; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0; text-transform: uppercase; }
            .subtitle { color: #94a3b8; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
            .content { padding: 40px 32px; }
            .title { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { font-size: 16px; color: #1e293b; background-color: #f8fafc; padding: 12px 16px; border-radius: 6px; border: 1px solid #e2e8f0; }
            .value.highlight { background-color: #fffbeb; border-color: #fcd34d; color: #92400e; font-weight: 600; }
            .footer { background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; }
            .footer-text { font-size: 12px; color: #94a3b8; margin: 0; }
            .button { display: inline-block; background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-text">Krishnammagari</div>
              <div class="subtitle">Developers</div>
            </div>
            <div class="content">
              <h2 class="title">New Website Inquiry</h2>
              
              <div class="field-group">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="field-group">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${phone}" style="color: inherit; text-decoration: none;">${phone}</a>
                </div>
              </div>

              ${email ? `
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: inherit; text-decoration: none;">${email}</a>
                </div>
              </div>
              ` : ''}

              ${plotNumber ? `
              <div class="field-group">
                <div class="label">Interested In</div>
                <div class="value highlight">${plotNumber}</div>
              </div>
              ` : ''}

              ${message ? `
              <div class="field-group">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              ` : ''}

              <div style="margin-top: 32px; text-align: center;">
                <a href="tel:${phone}" class="button">Call Customer</a>
              </div>
            </div>
            <div class="footer">
              <p class="footer-text">This email was sent from your website contact form.</p>
              <p class="footer-text">&copy; ${new Date().getFullYear()} Krishnammagari Developers</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Krishnammagari Developers <onboarding@resend.dev>',
      to: 'krishnammagaridevelopers@gmail.com',
      subject: `New Inquiry from ${name} ${plotNumber ? `(${plotNumber})` : ''}`,
      html: html,
    })

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
