import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message }: InquiryData = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">New Plot Inquiry</h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}
        </div>
        <p style="color: #6b7280; font-size: 14px;">-- Krishnammagari Developers Inquiry System</p>
      </div>
    `;

    // Using Resend API - you need to set RESEND_API_KEY in Supabase secrets
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'inquiries@yourdomain.com', // Update with your verified domain
          to: ['tejeshkumar448@gmail.com'],
          subject: `New Plot Inquiry from ${name}`,
          html: emailHtml,
        }),
      });

      if (!res.ok) {
        console.error('Resend API error:', await res.text());
      }
    } else {
      console.log('RESEND_API_KEY not set. Email not sent.');
      console.log('Inquiry details:', { name, email, phone, message });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry submitted successfully' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});