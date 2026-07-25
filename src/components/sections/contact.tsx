"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { buildContactEmailContent, buildMailtoLink, type ContactFormValues } from "@/lib/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 1500;

const EMPTY_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  linkedin: "",
  message: "",
};

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  function updateField<K extends keyof ContactFormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // A real email-sending backend is deferred — this is the one line that
    // will need to change (to a fetch() against an API route) once one is
    // picked. buildContactEmailContent/buildMailtoLink stay reusable either way.
    const mailtoUrl = buildMailtoLink(profile.email, values);
    window.location.href = mailtoUrl;

    setSubmitted(true);
    window.setTimeout(() => setIsSubmitting(false), 1000);
  }

  async function handleCopy() {
    const { subject, body } = buildContactEmailContent(values);
    const text = `Subject: ${subject}\n\n${body}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can reject without permission or in insecure contexts —
      // silently no-op rather than throwing in the visitor's face.
    }
  }

  const messageLength = values.message.length;

  return (
    <section
      id="contact"
      className="border-t border-border bg-[color-mix(in_oklab,var(--muted)_40%,transparent)]"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s work together
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              I&apos;m open to internships, collaborations, and interesting problems. Reach out
              any time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={`mailto:${profile.email}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "cursor-pointer bg-cta text-cta-foreground hover:bg-[color-mix(in_oklab,var(--cta)_90%,transparent)]"
                )}
              >
                <Mail data-icon="inline-start" />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cursor-pointer")}
              >
                <GithubIcon data-icon="inline-start" className="size-4" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cursor-pointer")}
              >
                <LinkedinIcon data-icon="inline-start" className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-left ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)] sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
                    Company
                  </label>
                  <Input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(event) => updateField("company", event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contact-linkedin" className="mb-1.5 block text-sm font-medium">
                    LinkedIn
                  </label>
                  <Input
                    id="contact-linkedin"
                    name="linkedin"
                    autoComplete="url"
                    placeholder="linkedin.com/in/..."
                    value={values.linkedin}
                    onChange={(event) => updateField("linkedin", event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={MESSAGE_MAX_LENGTH}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : "contact-message-counter"}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  {errors.message ? (
                    <p id="contact-message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span id="contact-message-counter" className="text-xs text-muted-foreground">
                    {messageLength} / {MESSAGE_MAX_LENGTH}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(buttonVariants({ size: "lg" }), "mt-2 w-full cursor-pointer")}
              >
                <Mail data-icon="inline-start" />
                Send message
              </button>

              {submitted && (
                <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-[color-mix(in_oklab,var(--muted)_50%,transparent)] p-4 text-sm">
                  <p className="text-muted-foreground">
                    Your email client should have opened with this message pre-filled. If nothing
                    happened, copy it below and paste it into your webmail instead.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer self-start")}
                  >
                    {copied ? (
                      <>
                        <Check data-icon="inline-start" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy data-icon="inline-start" />
                        Copy message to clipboard
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
