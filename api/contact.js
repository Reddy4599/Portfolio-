const CONTACT_EMAIL = "saimanjunadhareddy1309@gmail.com";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function validateContact(body) {
  const name = clean(body?.name, 120);
  const email = clean(body?.email, 254).toLowerCase();
  const message = clean(body?.message, 4000);
  const website = clean(body?.website, 200);

  if (website) return { error: "Unable to send this message." };
  if (name.length < 2) return { error: "Please enter your name." };
  if (!EMAIL_PATTERN.test(email))
    return { error: "Please enter a valid email address." };
  if (message.length < 10)
    return { error: "Please write a message of at least 10 characters." };

  return { name, email, message };
}

export function buildEmail({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return {
    from:
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL || CONTACT_EMAIL],
    reply_to: email,
    subject: `Portfolio message from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#17211e">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#537064">New portfolio enquiry</p>
        <h1 style="font-size:28px;margin:8px 0 24px">Message from ${safeName}</h1>
        <div style="padding:20px;border-left:3px solid #7ab894;background:#f4f8f5;line-height:1.7">${safeMessage}</div>
        <p style="margin-top:24px"><strong>Reply to:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p style="font-size:12px;color:#718079">Sent from your portfolio contact form.</p>
      </div>
    `,
    text: `New portfolio enquiry\n\nFrom: ${name}\nEmail: ${email}\n\n${message}`,
  };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form is missing RESEND_API_KEY.");
    return response
      .status(503)
      .json({
        error:
          "Messaging is temporarily unavailable. Please email me directly.",
      });
  }

  const validated = validateContact(request.body);
  if (validated.error) return response.status(400).json(validated);

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildEmail(validated)),
    });
    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error(
        "Resend rejected contact email:",
        result?.message || resendResponse.status,
      );
      return response
        .status(502)
        .json({
          error:
            "The message could not be delivered. Please email me directly.",
        });
    }

    return response.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error(
      "Contact email failed:",
      error instanceof Error ? error.message : error,
    );
    return response
      .status(502)
      .json({
        error: "The message could not be delivered. Please email me directly.",
      });
  }
}
