import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Este endpoint solo acepta peticiones POST.'
    });
  }

  try {
    const {
      clientEmail,
      clientName,
      companyName,
      consecutive,
      concept,
      scope,
      subtotal,
      iva,
      total,
      paymentTerms
    } = req.body || {};

    if (!clientEmail || typeof clientEmail !== 'string' || !clientEmail.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'No se especificó una dirección de correo válida para el cliente.'
      });
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
    const fromSender = process.env.RESEND_FROM_EMAIL || 'Corplex Solutions <cotizaciones@corplexsolutions.co>';
    const bccRecipients = process.env.RESEND_BCC_EMAIL ? [process.env.RESEND_BCC_EMAIL] : ['triangelturbo@gmail.com'];

    const formattedConsecutive = consecutive || 'CPX-QT-2026';
    const formattedClientName = clientName || 'Estimado Cliente';
    const formattedCompany = companyName ? ` (${companyName})` : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Cotización Formal - Corplex Solutions S.A.S.</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d1722; color: #e2e8f0; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #142332; border: 1px solid #2b5b84; border-radius: 16px; overflow: hidden; }
          .header { background-color: #1b3852; padding: 24px; text-align: center; border-bottom: 2px solid #ffd343; }
          .title { color: #ffffff; font-size: 20px; font-weight: bold; margin: 0; }
          .subtitle { color: #ffd343; font-size: 12px; font-weight: bold; margin-top: 4px; }
          .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
          .highlight-box { background-color: #0d1722; border: 1px solid #2b5b84; border-radius: 12px; padding: 16px; margin: 16px 0; }
          .badge { display: inline-block; background-color: #ffd343; color: #0d1722; font-weight: bold; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table th { text-align: left; padding: 8px; border-bottom: 1px solid #2b5b84; color: #94a3b8; font-size: 12px; }
          .table td { padding: 10px 8px; border-bottom: 1px solid #1b3852; color: #ffffff; font-size: 13px; }
          .footer { background-color: #0d1722; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #2b5b84; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">CORPLEX SOLUTIONS S.A.S.</h1>
            <div class="subtitle">NIT 902061373-5 • COTIZACIÓN COMERCIAL FORMAL</div>
          </div>
          <div class="content">
            <p>Estimado(a) <strong>${formattedClientName}</strong>${formattedCompany},</p>
            <p>Nos complace adjuntar la propuesta comercial formal <strong>${formattedConsecutive}</strong> correspondiente a los requerimientos técnicos de su organización.</p>
            
            <div class="highlight-box">
              <span class="badge">RADICADO: ${formattedConsecutive}</span>
              <table class="table">
                <thead>
                  <tr>
                    <th>CONCEPTO</th>
                    <th style="text-align: right;">VALOR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>${concept || 'Servicios de Ingeniería de Software & IA'}</strong><br><small style="color: #94a3b8;">${scope || 'Alcance acordado'}</small></td>
                    <td style="text-align: right;">${subtotal || '$0 COP'}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8;">IVA (19% / Régimen Aplicable)</td>
                    <td style="text-align: right; color: #c084fc;">${iva || '$0 COP'}</td>
                  </tr>
                  <tr style="font-weight: bold; background-color: #1b3852;">
                    <td style="color: #ffd343;">TOTAL COTIZADO (COP)</td>
                    <td style="text-align: right; color: #ffd343; font-size: 15px;">${total || '$0 COP'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p><strong>Condiciones de Pago:</strong><br>
            <small style="color: #94a3b8;">${paymentTerms || '50% anticipado, 50% a la entrega.'}</small></p>

            <p>Quedamos a su entera disposición para resolver cualquier inquietud o avanzar a la fase de contratación formal.</p>
          </div>
          <div class="footer">
            CORPLEX SOLUTIONS S.A.S. • Calle 50 # 45-20, Medellín, Colombia<br>
            Línea Comercial: +57 320 710 5618 • cotizaciones@corplexsolutions.co • www.corplexsolutions.co
          </div>
        </div>
      </body>
      </html>
    `;

    if (!apiKey) {
      console.warn('RESEND_API_KEY no configurada. Modo Simulación activo.');
      return res.status(200).json({
        success: true,
        mode: 'simulation',
        message: `Cotización ${formattedConsecutive} procesada correctamente en modo simulación. Para envío real a ${clientEmail}, configura RESEND_API_KEY en Vercel.`,
        consecutive: formattedConsecutive,
        recipient: clientEmail,
        bcc: bccRecipients
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromSender,
        to: [clientEmail.trim()],
        bcc: bccRecipients,
        subject: `Cotización Formal Corplex Solutions — ${formattedConsecutive}${formattedCompany}`,
        html: htmlContent
      })
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      console.error('❌ Error de Resend API:', resendResponse.status, resendData);
      return res.status(resendResponse.status).json({
        success: false,
        error: resendData?.name || 'ResendAPIError',
        message: resendData?.message || `HTTP ${resendResponse.status}: Error devuelto por Resend API.`,
        details: resendData
      });
    }

    return res.status(200).json({
      success: true,
      message: `Correo transaccional enviado exitosamente a ${clientEmail}.`,
      consecutive: formattedConsecutive,
      resendId: resendData?.id
    });

  } catch (error) {
    console.error('Excepción no controlada en Serverless Function:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Error desconocido procesando el envío de correo.'
    });
  }
}
