import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble, Send, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import Button from '../components/common/Button.jsx';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/alexmorgan', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alexmorgan', icon: Linkedin },
  { label: 'X', href: 'https://x.com/alexmorgan', icon: Twitter },
  { label: 'Dribbble', href: 'https://dribbble.com/alexmorgan', icon: Dribbble },
];

function FormField({ label, name, register, error, type = 'text', as = 'input', ...props }) {
  const Tag = as;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-white/90">
        {label}
      </label>
      <Tag
        id={name}
        type={as === 'input' ? type : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-dim focus-visible:outline-2 focus-visible:outline-accent-cyan resize-none"
        {...register(name)}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} role="alert" className="text-xs text-accent-magenta">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data) {
    // Replace with a real endpoint (e.g. Formspree, Resend, or a serverless function).
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 4000);
  }

  return (
    <section id="contact" className="section-padding relative" aria-label="Contact">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Get in touch"
          title="Have a project in mind? Let's build it."
          description="Open to select freelance engagements and full-time opportunities for 2026."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <GlassCard className="lg:col-span-3 p-8 md:p-10" glow>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Name" name="name" register={register} error={errors.name} />
                <FormField label="Email" name="email" type="email" register={register} error={errors.email} />
              </div>
              <FormField label="Company (optional)" name="company" register={register} error={errors.company} />
              <FormField
                label="Message"
                name="message"
                as="textarea"
                rows={5}
                register={register}
                error={errors.message}
              />

              <Button type="submit" className="self-start mt-2" icon={Send}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-accent-cyan"
                    role="status"
                  >
                    <CheckCircle2 size={16} />
                    Message sent — I&apos;ll get back to you within a day or two.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>

          <GlassCard className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Prefer email or social? Reach out directly — I usually respond within
                24 hours.
              </p>
              <a
                href="mailto:hello@alexmorgan.dev"
                className="font-display text-xl md:text-2xl text-white hover:text-accent-cyan transition-colors break-all"
              >
                hello@alexmorgan.dev
              </a>
            </div>

            <ul className="flex items-center gap-3 mt-10">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass w-11 h-11 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-glass-hover transition-colors"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
