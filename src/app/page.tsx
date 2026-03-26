"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

/* ── FAQ item ── */
function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className={`font-medium text-lg pr-4 transition-colors duration-300 ${
            open ? "text-gold" : "text-text"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-gold" : "text-text-muted"
          }`}
        />
      </button>
      <div className={`faq-content ${open ? "open" : ""}`}>
        <div>
          <p className="pb-6 text-text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "What do I need to get started?",
    a: "A Mac or PC, an internet connection, and 90 minutes for setup. That is it.",
  },
  {
    q: "How long until it is running?",
    a: "2 to 3 weeks from signup to fully operational. We handle the heavy lifting.",
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
  "Full AI system configured for your business",
  "8 core automations activated and tested",
  "Custom training on your local market",
  "CRM integration and contact import",
  "Lead follow-up sequences configured",
  "Morning briefing reports",
  "1-on-1 video training session",
  "30 days post-launch support",
];

/* ── Main Page ── */
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment setup is almost ready. Please book a discovery call or contact Xavier on 0403 152 642.");
      }
    } catch {
      alert("Payment setup is almost ready. Please book a discovery call or contact Xavier on 0403 152 642.");
    } finally {
      setCheckoutLoading(false);
    }
  };

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
          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="hidden sm:inline-flex items-center text-sm text-text-muted hover:text-text transition-colors duration-300 border border-white/[0.1] px-4 py-2 rounded-lg hover:border-white/[0.2]"
            >
              Book a Call
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center bg-gold text-bg font-semibold text-sm px-5 py-2 rounded-lg btn-glow transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ── Section 1: Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden">
          {/* Radial gold glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gold/[0.06] blur-[180px] animate-glow pointer-events-none"
            aria-hidden="true"
          />

          {/* Particles */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>

          <div className="relative max-w-3xl mx-auto text-center pb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] -tracking-[0.02em] mb-8">
              We were losing leads at 9pm.
              <br />
              So we{" "}
              <span className="gold-shimmer">built something</span> about it.
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              AgentSetup is an AI operations system built by real estate agents,
              for real estate agents. It handles your follow-up, admin, and CRM
              while you focus on listings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gold text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {checkoutLoading
                  ? "Loading..."
                  : "Get Started - $11,000 inc GST"}
              </button>
              <a
                href="#book"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/[0.15] px-8 py-4 rounded-xl text-lg text-text-muted font-medium hover:text-text hover:border-white/[0.3] transition-all duration-300"
              >
                Book a Discovery Call
              </a>
            </div>
            <p className="text-text-dim text-sm mt-6">
              Setup takes 2 weeks. Cancel support anytime.
            </p>
          </div>
        </section>

        {/* ── Section 2: The Story ── */}
        <section className="py-32 px-5">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-10">
                Built by agents.
                <br />
                Not by a tech company.
              </h2>
              <div className="text-lg leading-[1.8] text-text-muted space-y-6">
                <p>
                  I am a real estate agent in regional Victoria. I was working 60
                  hour weeks and still losing leads because I could not reply fast
                  enough. My CRM was a mess. My follow-up was inconsistent. I was
                  doing an hour of admin work when I should have been on the phone
                  with vendors.
                </p>
                <p>
                  So I built a system to handle it. An AI that responds to every
                  lead in under 90 seconds. That updates my CRM automatically.
                  That sends nurture sequences while I sleep. That drafts my
                  proposals and briefs me every morning.
                </p>
                <p>
                  It changed everything. My pipeline filled up. My admin
                  disappeared. I got my weekends back.
                </p>
                <p className="text-text">
                  Xavier and I now set up the same system for other agents across
                  Australia. That is AgentSetup.
                </p>
              </div>
              <p className="mt-10 text-sm text-text-muted">
                <span className="text-text font-medium">Jarrod Pretty</span>,
                Area Specialist
              </p>
            </div>
            <div className="lg:col-span-2 hidden lg:block">
              <div className="space-y-6 pt-4">
                <div className="border-l-2 border-gold/30 pl-6">
                  <p className="text-2xl font-semibold text-text leading-snug">&ldquo;I got my weekends back.&rdquo;</p>
                </div>
                <div className="border-l-2 border-white/[0.06] pl-6 space-y-4 text-text-muted text-sm leading-relaxed">
                  <p>Built in Shepparton, Victoria.</p>
                  <p>Used every day by the people who built it.</p>
                  <p>Now available to agents across Australia.</p>
                </div>
                <div className="pt-4 border-t border-white/[0.04]">
                  <p className="text-sm text-text-muted">Jarrod Pretty &amp; Xavier Stevens</p>
                  <p className="text-sm text-text-dim">Area Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: What it replaces ── */}
        <section className="py-32 px-5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-20">
              Everything your PA does.
              <br />
              Nothing your PA forgets.
            </h2>
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
              {/* Left column - slightly higher */}
              <div className="space-y-10">
                {[
                  {
                    title: "Lead follow-up",
                    desc: "Instant reply to every enquiry, 24/7. No lead waits more than 90 seconds.",
                  },
                  {
                    title: "CRM management",
                    desc: "Contacts enriched and tracked automatically. No manual data entry ever again.",
                  },
                  {
                    title: "Morning briefings",
                    desc: "Pipeline report delivered before your first coffee. Every single day.",
                  },
                  {
                    title: "Appraisal proposals",
                    desc: "Data-driven proposals generated in minutes, not hours.",
                  },
                ].map(({ title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-text mb-1.5">
                        {title}
                      </h3>
                      <p className="text-text-muted text-[15px] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right column - offset down */}
              <div className="space-y-10 md:mt-16">
                {[
                  {
                    title: "Vendor nurture",
                    desc: "Automated updates and market insights that keep vendors warm between calls.",
                  },
                  {
                    title: "Social media",
                    desc: "AI-drafted posts published at optimal times across your platforms.",
                  },
                  {
                    title: "Call classification",
                    desc: "Every call summarised and routed to the right workflow automatically.",
                  },
                  {
                    title: "Calendar management",
                    desc: "Scheduling and reminders on autopilot so nothing slips through.",
                  },
                ].map(({ title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-text mb-1.5">
                        {title}
                      </h3>
                      <p className="text-text-muted text-[15px] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: The cost of doing nothing ── */}
        <section className="py-32 px-5 border-t border-b border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-16">
              What losing 3 leads a week actually costs you
            </h2>
            <div className="space-y-6 text-lg text-text-muted">
              <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                <span>3 missed leads per week x 52 weeks</span>
                <span className="text-text font-medium tabular-nums">
                  156 lost conversations
                </span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                <span>At 5% conversion</span>
                <span className="text-text font-medium tabular-nums">
                  7 to 8 lost listings per year
                </span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                <span>Average commission</span>
                <span className="text-text font-medium tabular-nums">
                  $12,000 to $15,000
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-text font-semibold text-xl">
                  Total lost income per year
                </span>
                <span className="text-gold font-bold text-2xl sm:text-3xl tabular-nums">
                  $84,000 to $120,000
                </span>
              </div>
            </div>
            <p className="mt-16 text-xl sm:text-2xl font-semibold text-text leading-snug">
              AgentSetup costs $10,000 + GST to set up.
              <br />
              <span className="text-text-muted font-normal">
                You do the math.
              </span>
            </p>
          </div>
        </section>

        {/* ── Section 5: How it works ── */}
        <section id="how-it-works" className="py-32 px-5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-20">
              Live in two weeks
            </h2>
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
              {/* Connecting line */}
              <div
                className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-white/[0.06]"
                aria-hidden="true"
              />
              {[
                {
                  num: "01",
                  title: "You sign up",
                  desc: "One 90-minute Zoom call. We learn your business, your market, your workflows.",
                },
                {
                  num: "02",
                  title: "We build it",
                  desc: "Over 2 to 3 weeks we configure your entire AI operations stack. Customised to you.",
                },
                {
                  num: "03",
                  title: "It runs",
                  desc: "Your system goes live. Leads get followed up. CRM stays clean. You focus on listings.",
                },
              ].map(({ num, title, desc }) => (
                <div key={num} className="relative">
                  <div className="text-3xl font-bold text-gold/30 mb-4 tabular-nums">
                    {num}
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">
                    {title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Pricing ── */}
        <section id="pricing" className="py-32 px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-16">
              Simple pricing. No lock-in.
            </h2>

            <div>
              <div className="mb-10">
                <span className="text-sm text-gold font-medium uppercase tracking-wider">
                  One-time setup
                </span>
                <div className="text-5xl sm:text-6xl font-bold mt-3 mb-2">
                  $10,000{" "}
                  <span className="text-lg text-text-muted font-normal">
                    + GST
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                {inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                    <span className="text-text-muted">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-8 mb-12">
                <div className="text-sm text-text-muted mb-1">
                  Ongoing support
                </div>
                <div className="text-2xl font-bold">
                  $750{" "}
                  <span className="text-sm text-text-muted font-normal">
                    + GST/month
                  </span>
                </div>
                <p className="text-text-dim text-sm mt-2">
                  Monthly check-ins, system updates, priority support. Cancel
                  anytime.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gold text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {checkoutLoading ? "Loading..." : "Get Started Now"}
                </button>
                <a
                  href="#book"
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-white/[0.15] px-8 py-4 rounded-xl text-lg text-text-muted font-medium hover:text-text hover:border-white/[0.3] transition-all duration-300"
                >
                  Book a Discovery Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 7: From Xavier and Jarrod ── */}
        <section className="py-32 px-5">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <blockquote className="border-l-2 border-gold pl-8">
              <p className="text-lg italic leading-relaxed text-text-muted mb-8">
                We built AgentSetup because we saw agents drowning in admin while
                leads went cold. This system does the work that does not make you
                money, so you can focus on the work that does.
              </p>
              <footer>
                <div className="text-text font-medium">Xavier Stevens</div>
                <div className="text-sm text-text-muted">
                  Co-founder, AgentSetup
                </div>
              </footer>
            </blockquote>
            <blockquote className="border-l-2 border-gold pl-8">
              <p className="text-lg italic leading-relaxed text-text-muted mb-8">
                I built this because I was tired of losing Friday night leads to
                whoever replied first. Now I wake up to appraisals booked while I
                was asleep.
              </p>
              <footer>
                <div className="text-text font-medium">Jarrod Pretty</div>
                <div className="text-sm text-text-muted">
                  Co-founder, AgentSetup
                </div>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── Section 8: FAQ ── */}
        <section className="py-32 px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-14">
              Questions
            </h2>
            <div>
              {faqs.map(({ q, a }, i) => (
                <FAQ key={i} question={q} answer={a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 9: Book a Call OR Get Started ── */}
        <section id="book" className="py-32 px-5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-3">
              Ready?
            </h2>
            <p className="text-text-muted text-lg mb-16">
              Two ways to get started.
            </p>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Book a call */}
              <div>
                <h3 className="text-xl font-semibold mb-8">
                  Book a Discovery Call
                </h3>
                <BookingCalendar />
              </div>

              {/* Right: Pay now */}
              <div>
                <h3 className="text-xl font-semibold mb-8">
                  Sign Up and Pay Now
                </h3>
                <div className="space-y-4 mb-10">
                  {[
                    "Full AI system configured for your business",
                    "8 core automations activated and tested",
                    "Custom training on your local market",
                    "CRM integration and contact import",
                    "1-on-1 video training session",
                    "30 days post-launch support",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                      <span className="text-text-muted">{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full inline-flex items-center justify-center bg-gold text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {checkoutLoading
                    ? "Loading..."
                    : "Pay $11,000 inc GST"}
                </button>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex items-center gap-4 my-16">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-text-muted text-sm">
                Or reach out directly
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm text-text-muted">
              <div>
                <div className="text-text font-medium mb-2">
                  Xavier Stevens
                </div>
                <a
                  href="tel:0403152642"
                  className="block hover:text-gold transition-colors duration-300 mb-1"
                >
                  0403 152 642
                </a>
                <a
                  href="mailto:xaviers@areaspecialist.com.au"
                  className="block hover:text-gold transition-colors duration-300"
                >
                  xaviers@areaspecialist.com.au
                </a>
              </div>
              <div>
                <div className="text-text font-medium mb-2">Jarrod Pretty</div>
                <a
                  href="tel:0403544605"
                  className="block hover:text-gold transition-colors duration-300 mb-1"
                >
                  0403 544 605
                </a>
                <a
                  href="mailto:jarrodjamespretty@hotmail.com"
                  className="block hover:text-gold transition-colors duration-300"
                >
                  jarrodjamespretty@hotmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-10 px-5 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-dim">
          <div>
            <span className="font-semibold text-text-muted">
              Agent<span className="text-gold">Setup</span>
            </span>{" "}
            <span className="text-text-dim">by Avara Collective</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-text-muted transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-text-muted transition-colors duration-300"
            >
              Terms
            </a>
          </div>
          <div className="text-text-dim text-xs text-center sm:text-right">
            Built in Australia for Australian agents
          </div>
        </div>
      </footer>
    </>
  );
}
