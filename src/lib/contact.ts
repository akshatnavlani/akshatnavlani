export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  linkedin: string;
  message: string;
}

/**
 * Builds a `mailto:` URL from a set of contact form values.
 *
 * Subject and body are encoded individually with `encodeURIComponent` before
 * being concatenated into the URL — encoding the assembled string as a whole
 * would double-encode the `?`/`&` that glue the query params together, and
 * skipping encoding entirely would let `&`/`?`/newlines inside the message
 * break the URL. This split is also what keeps a future "swap mailto for a
 * real API route" change contained: `buildContactEmailContent` below is the
 * part an API route would reuse as-is.
 */
export function buildContactEmailContent(values: ContactFormValues): {
  subject: string;
  body: string;
} {
  const subject = `New portfolio contact from ${values.name}`;

  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
  ];

  if (values.company.trim()) {
    lines.push(`Company: ${values.company}`);
  }

  if (values.linkedin.trim()) {
    lines.push(`LinkedIn: ${values.linkedin}`);
  }

  lines.push("", "Message:", values.message);

  const body = lines.join("\n");

  return { subject, body };
}

export function buildMailtoLink(to: string, values: ContactFormValues): string {
  const { subject, body } = buildContactEmailContent(values);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
