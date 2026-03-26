"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MessageSquare,
  Users,
  Sun,
  FileText,
  Heart,
  Share2,
  Phone,
  CalendarDays,
  ChevronDown,
  Clock,
  AlertTriangle,
  UserX,
  Check,
  ArrowRight,
  Mail,
  Plus,
  Minus,
} from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Static counter (no animation) ─── */
function useCountUp(target: number, _duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const count = target;
  return { count, ref };
}

/* ─── Animated section wrapper ─── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </section>
  );
}

/* ─── FAQ item ─── */
function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden transition-colors duration-300 hover:border-border-hover">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className={`font-medium pr-4 transition-colors duration-300 ${open ? "text-gold" : "text-text"}`}>
          {question}
        </span>
        <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300 ${open ? "border-gold/40 bg-gold/10" : "border-border"}`}>
          {open ? (
            <Minus className="w-3.5 h-3.5 text-gold" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-text-muted" />
          )}
        </span>
      </button>
      <div className={`faq-content ${open ? "open" : ""}`}>
        <div>
          <p className="px-6 pb-5 text-text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Features data ─── */
const features = [
  {
    icon: MessageSquare,
    title: "Lead follow-up",
    desc: "Instant SMS and email to every enquiry. No lead waits more than 90 seconds.",
  },
  {
    icon: Users,
    title: "CRM management",
    desc: "Contacts enriched and tracked automatically. No manual data entry.",
  },
  {
    icon: Sun,
    title: "Morning briefings",
    desc: "Daily pipeline report delivered before your first coffee.",
  },
  {
    icon: FileText,
    title: "Appraisal proposals",
    desc: "Data-driven proposals generated in minutes, not hours.",
  },
  {
    icon: Heart,
    title: "Vendor nurture sequences",
    desc: "Automated updates and check-ins that keep vendors warm.",
  },
  {
    icon: Share2,
    title: "Social media scheduling",
    desc: "AI-drafted posts published at optimal times across platforms.",
  },
  {
    icon: Phone,
    title: "Call classification",
    desc: "Every call summarised and routed to the right workflow.",
  },
  {
    icon: CalendarDays,
    title: "Calendar management",
    desc: "Scheduling and reminders on autopilot so nothing slips.",
  },
];

const faqs = [
  {
    q: "What do I need to get started?",
    a: "A Mac or PC, an internet connection, and 90 minutes for setup. That is it.",
  },
  {
    q: "How long until it is running?",
    a: "2-3 weeks from signup to fully operational. We handle the heavy lifting.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. We handle everything. You show up to one training call and we walk you through it all.",
  },
  {
    q: "What if I do not like it?",
    a: "You get a 30-day support period. If it is not working for you, we will fix it or discuss options.",
  },
  {
    q: "Is my data safe?",
    a: "Your AI runs on your own machine. Your data never leaves your control.",
  },
  {
    q: "Can I cancel the monthly support?",
    a: "Yes, anytime. No lock-in contracts.",
  },
];

const inclusions = [
  "Full AI system install",
  "8 core automations",
  "Market training for your area",
  "CRM integration",
  "Lead follow-up sequences",
  "Morning briefings",
  "1-on-1 training session",
  "30 days support included",
];

/* ─── Main Page ─── */
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Counter hooks for ROI section */
  const missedLeads = useCountUp(3, 1500);
  const lostConversations = useCountUp(156, 2000);
  const lostListings = useCountUp(8, 1800);
  const lostIncomeMin = useCountUp(84000, 2500);
  const lostIncomeMax = useCountUp(120000, 2500);

  const formatCurrency = useCallback((n: number) => {
    return "$" + n.toLocaleString();
  }, []);

  return (
    <>
      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">
            Agent<span className="text-gold">Setup</span>
          </span>
          <a
            href="#book"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-bg font-semibold text-sm px-5 py-2.5 rounded-lg btn-glow transition-all duration-300"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <main className="flex-1">
        {/* ── 1. Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden">
          {/* Radial gold glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gold/[0.07] blur-[180px] animate-glow pointer-events-none"
            aria-hidden="true"
          />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center pb-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] -tracking-[0.02em] mb-8">
              Every lead{" "}
              <span className="gold-shimmer">after hours</span>
              <br />
              is a listing you lose
            </h1>
            <p className="font-light text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              AgentSetup responds in 90 seconds. 24 hours a day. While you
              sleep, eat, and live your life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold to-gold-light text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300"
              >
                Book a Call
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-card px-8 py-4 rounded-xl text-lg text-text-muted font-medium hover:text-text transition-all duration-300"
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. Problem ── */}
        <Section className="py-32 px-5 section-divider">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Sound familiar?
            </h2>
            <p className="text-text-muted text-center mb-16 max-w-xl mx-auto text-lg font-light">
              These problems cost agents thousands every year. Most just accept
              it.
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  text: "Leads come in at 9pm. You reply at 9am. They have already spoken to 3 other agents.",
                },
                {
                  icon: AlertTriangle,
                  text: "You spend 15+ hours a week on admin that does not generate income.",
                },
                {
                  icon: UserX,
                  text: "Your CRM is a graveyard of contacts you meant to follow up.",
                },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-text-muted leading-relaxed text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 3. How it works ── */}
        <Section id="how-it-works" className="py-32 px-5 section-divider">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Three steps. Then it runs.
            </h2>
            <div className="grid gap-8 sm:grid-cols-3 relative">
              {[
                {
                  step: "1",
                  title: "You sign up",
                  desc: "One 90-minute Zoom call to understand your business and set up your system.",
                },
                {
                  step: "2",
                  title: "We build your system",
                  desc: "2-3 weeks, fully configured to your market, your brand, and your workflows.",
                },
                {
                  step: "3",
                  title: "It runs",
                  desc: "24/7 lead follow-up, CRM, proposals, briefings. You focus on listings.",
                },
              ].map(({ step, title, desc }, i) => (
                <div key={i} className="text-center relative">
                  {/* Connecting line */}
                  {i < 2 && (
                    <div className="hidden sm:block step-connector" aria-hidden="true" />
                  )}
                  <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6 bg-bg relative z-10">
                    <span className="text-xl font-bold text-gold">{step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-text-muted text-base leading-relaxed max-w-xs mx-auto">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 4. Features ── */}
        <Section id="features" className="py-32 px-5 section-divider">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              What your AI handles
            </h2>
            <p className="text-text-muted text-center mb-16 max-w-xl mx-auto text-lg font-light">
              Eight core automations working around the clock so you can focus on
              what actually makes money.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">{title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 5. Social proof ── */}
        <Section className="py-32 px-5 section-divider relative">
          {/* Darker background */}
          {/* removed alternate background for seamless flow */}

          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Built by agents who use it every day
            </h2>

            <div className="space-y-8">
              <blockquote className="glass-card rounded-2xl p-8 sm:p-10 border-l-4 border-l-gold">
                <p className="text-lg leading-relaxed mb-6 text-text">
                  &ldquo;We built AgentSetup because we saw agents drowning in
                  admin while leads went cold. This system does the work that
                  does not make you money, so you can focus on the work that
                  does.&rdquo;
                </p>
                <footer>
                  <div className="text-lg font-semibold text-text">Xavier Stevens</div>
                  <div className="text-sm text-text-muted">Co-founder, AgentSetup</div>
                </footer>
              </blockquote>

              <blockquote className="glass-card rounded-2xl p-8 sm:p-10 border-l-4 border-l-gold">
                <p className="text-lg leading-relaxed mb-6 text-text">
                  &ldquo;I built AgentSetup because I was losing leads to faster
                  agents. Now my AI handles follow-up while I focus on
                  listings.&rdquo;
                </p>
                <footer>
                  <div className="text-lg font-semibold text-text">Jarrod Pretty</div>
                  <div className="text-sm text-text-muted">Co-founder, AgentSetup</div>
                </footer>
              </blockquote>
            </div>
          </div>
        </Section>

        {/* ── 6. The math ── */}
        <Section className="py-32 px-5 section-divider">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              What losing 3 leads a week actually costs you
            </h2>
            <p className="text-text-muted text-center mb-16 text-lg font-light">
              The numbers are hard to ignore.
            </p>

            <div className="grid gap-12 lg:grid-cols-5 items-center">
              {/* Left: calculation steps */}
              <div className="lg:col-span-3 glass-card rounded-2xl p-8 sm:p-10 space-y-0">
                {[
                  {
                    label: "Missed leads per week",
                    valueRef: missedLeads,
                    format: (n: number) => String(n),
                    note: undefined,
                  },
                  {
                    label: "Lost conversations per year",
                    valueRef: lostConversations,
                    format: (n: number) => String(n),
                    note: "3 x 52 weeks",
                  },
                  {
                    label: "Lost listings at 5% conversion",
                    valueRef: lostListings,
                    format: (n: number) => `7-${n}`,
                    note: undefined,
                  },
                  {
                    label: "Average commission per listing",
                    valueRef: null,
                    format: (_n: number) => "$12,000-$15,000",
                    note: undefined,
                  },
                ].map(({ label, valueRef, format, note }, i) => (
                  <div
                    key={i}
                    ref={i === 0 ? missedLeads.ref : i === 1 ? lostConversations.ref : i === 2 ? lostListings.ref : undefined}
                    className="flex items-center justify-between py-5 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="text-text-muted text-sm sm:text-base">
                      {label}
                      {note && (
                        <span className="text-text-dim ml-2 text-xs">
                          ({note})
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-text tabular-nums">
                      {valueRef ? format(valueRef.count) : format(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right: big result */}
              <div className="lg:col-span-2 text-center lg:text-left" ref={lostIncomeMin.ref}>
                <div ref={lostIncomeMax.ref}>
                  <div className="text-sm text-text-muted uppercase tracking-wider mb-4 font-medium">
                    Lost income per year
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold gradient-text-gold leading-tight mb-6">
                    {formatCurrency(lostIncomeMin.count)}-{formatCurrency(lostIncomeMax.count)}
                  </div>
                  <p className="text-text-muted text-lg">
                    AgentSetup costs{" "}
                    <span className="text-gold font-semibold">$10,000</span> to set
                    up.{" "}
                    <span className="text-text font-semibold">
                      The math is not close.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 7. Pricing ── */}
        <Section id="pricing" className="py-32 px-5 section-divider">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
              Simple pricing. No surprises.
            </h2>

            <div className="gradient-border p-8 sm:p-10 relative overflow-hidden">
              {/* Subtle glow */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 bg-gold/[0.06] rounded-full blur-[80px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="text-center mb-8">
                  <div className="text-sm text-gold font-semibold uppercase tracking-wider mb-3">
                    One-time setup
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold mb-1">
                    $10,000{" "}
                    <span className="text-lg text-text-muted font-normal">
                      + GST
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-10" role="list">
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/[0.03] rounded-xl p-5 mb-10 text-center border border-white/[0.06]">
                  <div className="text-sm text-text-muted mb-1">
                    Ongoing support
                  </div>
                  <div className="text-2xl font-bold">
                    $750{" "}
                    <span className="text-sm text-text-muted font-normal">
                      + GST/month
                    </span>
                  </div>
                  <div className="text-xs text-text-dim mt-1.5">
                    Monitoring, updates, and priority support. Cancel anytime.
                  </div>
                </div>

                <a
                  href="#book"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold to-gold-light text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>

                <p className="text-center text-text-dim text-xs mt-5">
                  100% Australian built and supported
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 8. FAQ ── */}
        <Section className="py-32 px-5 section-divider">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <FAQ key={i} question={q} answer={a} />
              ))}
            </div>
          </div>
        </Section>

        {/* ── 9. CTA / Booking ── */}
        <Section id="book" className="py-32 px-5 section-divider">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                Ready to stop losing leads?
              </h2>
              <p className="text-text-muted text-lg font-light">
                Book a free 10-minute call. We will walk you through your setup.
              </p>
            </div>

            <BookingCalendar />

            {/* Divider */}
            <div className="flex items-center gap-4 my-14">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <span className="text-text-muted text-sm whitespace-nowrap">
                Or reach out directly
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            {/* Contact info */}
            <div className="grid gap-6 sm:grid-cols-2 max-w-xl mx-auto">
              <div className="glass-card rounded-2xl p-6 min-w-[280px]">
                <h4 className="font-semibold text-lg mb-3">Xavier Stevens</h4>
                <div className="space-y-3 text-sm text-text-muted">
                  <a
                    href="tel:0403152642"
                    className="flex items-center gap-3 hover:text-gold transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    0403 152 642
                  </a>
                  <a
                    href="mailto:xaviers@areaspecialist.com.au"
                    className="flex items-center gap-3 hover:text-gold transition-colors duration-300 break-all"
                  >
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    xaviers@areaspecialist.com.au
                  </a>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 min-w-[280px]">
                <h4 className="font-semibold text-lg mb-3">Jarrod Pretty</h4>
                <div className="space-y-3 text-sm text-text-muted">
                  <a
                    href="mailto:jarrodjamespretty@hotmail.com"
                    className="flex items-center gap-3 hover:text-gold transition-colors duration-300 break-all"
                  >
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    jarrodjamespretty@hotmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* ── 10. Footer ── */}
      <footer className="py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-dim pt-8">
          <div>
            <span className="font-semibold text-text-muted">
              Agent<span className="text-gold">Setup</span>
            </span>{" "}
            <span className="text-text-dim">by Avara Collective</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-text-muted transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="hover:text-text-muted transition-colors duration-300">
              Terms
            </a>
          </div>
          <div className="text-text-dim text-xs text-center sm:text-right">
            ABN XX XXX XXX XXX
          </div>
        </div>
      </footer>
    </>
  );
}
