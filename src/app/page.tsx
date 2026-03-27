"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import BookingCalendar from "@/components/BookingCalendar";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CountUp } from "@/components/animations/CountUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { Marquee } from "@/components/animations/Marquee";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

/* ── FAQ item with Framer Motion accordion ── */
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
          className={`font-medium text-base pr-4 transition-colors duration-300 ${
            open ? "text-gold" : "text-text"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-gold" : "text-text-dim"
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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

const marqueeItems = [
  "Lead Follow-Up",
  "CRM Management",
  "Morning Briefings",
  "Appraisal Proposals",
  "Vendor Nurture",
  "Social Media",
  "Call Classification",
  "Calendar Management",
];

/* ── Typewriter cycling subtext ── */
function TypewriterCycle({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="text-gold text-lg sm:text-xl font-medium"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

/* ── Parallax glow that follows mouse ── */
function ParallaxGlow() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(800px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(201,168,76,0.07), transparent 60%)`,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Main Page ── */
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
        alert(
          "Payment setup is almost ready. Please book a discovery call or contact Xavier on 0403 152 642."
        );
      }
    } catch {
      alert(
        "Payment setup is almost ready. Please book a discovery call or contact Xavier on 0403 152 642."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]"
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
              className="hidden sm:inline-flex items-center text-sm text-text-muted hover:text-text transition-colors duration-300 border border-white/[0.08] px-4 py-2 rounded-lg hover:border-white/[0.15]"
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
        {/* ══════════════════════════════════════════════
            SECTION 1: HERO
        ══════════════════════════════════════════════ */}
        <section className="relative min-h-svh flex flex-col items-center justify-center px-5 overflow-hidden">
          <ParallaxGlow />

          {/* Particles */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <FadeIn delay={0}>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-8">
                AI Operations for Real Estate Agents
              </p>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">
                We were losing leads
                <br className="hidden sm:block" />
                {" "}at 9pm. So we{" "}
                <span className="gold-shimmer">built&nbsp;something</span>
                <br className="hidden sm:block" />
                {" "}about it.
              </h1>
            </FadeIn>

            {/* Cycling subtext */}
            <FadeIn delay={0.4}>
              <div className="h-8 flex items-center justify-center mb-10">
                <TypewriterCycle
                  words={[
                    "90-second lead response, 24/7",
                    "CRM that updates itself",
                    "Morning briefings on autopilot",
                    "Proposals drafted in minutes",
                    "15+ hours saved every week",
                  ]}
                />
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gold text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {checkoutLoading
                    ? "Loading..."
                    : "Get Started - $11,000 inc GST"}
                </MagneticButton>
                <a
                  href="#book"
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-white/[0.1] px-8 py-4 rounded-xl text-lg text-text-muted font-medium hover:text-text hover:border-white/[0.2] btn-ghost transition-all duration-300"
                >
                  Book a Discovery Call
                </a>
              </div>
              <p className="text-text-dim text-sm mt-6">
                Setup takes 2 weeks. Cancel support anytime.
              </p>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
            <ChevronDown className="w-5 h-5 text-text-dim" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FEATURE MARQUEE
        ══════════════════════════════════════════════ */}
        <Marquee items={marqueeItems} speed={30} />

        {/* ══════════════════════════════════════════════
            SECTION 2: THE STORY
        ══════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 px-5 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 lg:gap-24 items-start">
            {/* Left: Pull quote */}
            <div className="lg:col-span-2">
              <TextReveal
                text="I got my weekends back."
                className="text-5xl sm:text-6xl lg:text-[64px] font-serif italic text-gold leading-[1.05] tracking-[-0.02em]"
              />
            </div>

            {/* Right: Story */}
            <div className="lg:col-span-3">
              <FadeIn direction="right">
                <div className="text-[17px] leading-[1.8] text-text-muted space-y-6">
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
              </FadeIn>
            </div>
          </div>

          {/* Contact cards */}
          <StaggerChildren className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 mt-20" staggerDelay={0.15}>
            <StaggerItem>
              <SpotlightCard>
                <div className="text-text font-semibold mb-3">Xavier Stevens</div>
                <a
                  href="tel:0403152642"
                  className="block text-text-muted text-sm hover:text-gold transition-colors duration-300 mb-1 link-underline w-fit"
                >
                  0403 152 642
                </a>
                <a
                  href="mailto:xaviers@areaspecialist.com.au"
                  className="block text-text-muted text-sm hover:text-gold transition-colors duration-300 link-underline w-fit"
                >
                  xaviers@areaspecialist.com.au
                </a>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard>
                <div className="text-text font-semibold mb-3">Jarrod Pretty</div>
                <a
                  href="tel:0403544605"
                  className="block text-text-muted text-sm hover:text-gold transition-colors duration-300 mb-1 link-underline w-fit"
                >
                  0403 544 605
                </a>
                <a
                  href="mailto:jarrodjamespretty@hotmail.com"
                  className="block text-text-muted text-sm hover:text-gold transition-colors duration-300 link-underline w-fit"
                >
                  jarrodjamespretty@hotmail.com
                </a>
              </SpotlightCard>
            </StaggerItem>
          </StaggerChildren>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3: HOW IT WORKS
        ══════════════════════════════════════════════ */}
        <section id="how-it-works" className="py-32 sm:py-40 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.0] mb-20">
                Live in two&nbsp;weeks
              </h2>
            </FadeIn>
            <StaggerChildren className="grid md:grid-cols-3 gap-8">
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
                <StaggerItem key={num}>
                  <SpotlightCard className="h-full">
                    <div className="text-4xl font-bold text-gold/25 mb-4 tabular-nums tracking-tight">
                      {num}
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-3">
                      {title}
                    </h3>
                    <p className="text-text-muted text-[15px] leading-relaxed">{desc}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4: ROI / STATS
        ══════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-5">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-4xl sm:text-[56px] font-bold text-gold leading-none tracking-tight mb-3">
                    <CountUp target={90} suffix="s" />
                  </div>
                  <p className="text-[13px] text-text-dim uppercase tracking-wider">Response time</p>
                </div>
                <div className="text-center border-x border-white/[0.06]">
                  <div className="text-4xl sm:text-[56px] font-bold text-gold leading-none tracking-tight mb-3">
                    <CountUp target={15} suffix="+" />
                  </div>
                  <p className="text-[13px] text-text-dim uppercase tracking-wider">Hours saved / week</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-[56px] font-bold text-gold leading-none tracking-tight mb-3">
                    <CountUp target={52} />
                  </div>
                  <p className="text-[13px] text-text-dim uppercase tracking-wider">Weeks of coverage</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5: WHAT IT REPLACES
        ══════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 px-5 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.0] mb-20">
                Everything your PA&nbsp;does.
                <br />
                Without the&nbsp;sick&nbsp;days.
              </h2>
            </FadeIn>
            <StaggerChildren className="grid md:grid-cols-2 gap-x-20 gap-y-0">
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
                  <StaggerItem key={i}>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-text mb-1.5">{title}</h3>
                        <p className="text-text-muted text-[15px] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
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
                  <StaggerItem key={i}>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-text mb-1.5">{title}</h3>
                        <p className="text-text-muted text-[15px] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6: THE COST OF DOING NOTHING
        ══════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 px-5">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.0] mb-16">
                What losing 3 leads a week
                <br className="hidden sm:block" />
                {" "}actually costs&nbsp;you
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 7: SOCIAL PROOF
        ══════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 px-5 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto space-y-24">
            <FadeIn>
              <blockquote className="text-center">
                <span className="text-gold text-6xl font-serif leading-none block mb-4" aria-hidden="true">&ldquo;</span>
                <p className="text-2xl sm:text-[28px] lg:text-[32px] italic leading-[1.4] text-text-muted max-w-3xl mx-auto mb-8">
                  Drowning in admin. Calls blowing up. Missed emails turning
                  into missed listings. I was losing money every week and
                  couldn't work any harder than I already was.
                </p>
                <footer>
                  <div className="text-text font-medium text-sm">Xavier Stevens</div>
                  <div className="text-xs text-text-dim mt-1">
                    Area Specialist
                  </div>
                </footer>
              </blockquote>
            </FadeIn>
            <FadeIn>
              <blockquote className="text-center">
                <span className="text-gold text-6xl font-serif leading-none block mb-4" aria-hidden="true">&ldquo;</span>
                <p className="text-2xl sm:text-[28px] lg:text-[32px] italic leading-[1.4] text-text-muted max-w-3xl mx-auto mb-8">
                  Friday night, 9pm, a lead comes in. By Saturday morning someone
                  else has the appraisal. That was happening every week until we
                  fixed it.
                </p>
                <footer>
                  <div className="text-text font-medium text-sm">Jarrod Pretty</div>
                  <div className="text-xs text-text-dim mt-1">
                    Area Specialist
                  </div>
                </footer>
              </blockquote>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 8: PRICING
        ══════════════════════════════════════════════ */}
        <section id="pricing" className="py-32 sm:py-40 px-5">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <div className="mb-4">
                <div className="text-[64px] sm:text-[72px] font-bold leading-none tracking-tight">
                  $10,000{" "}
                  <span className="text-xl text-text-muted font-normal align-middle">
                    + GST
                  </span>
                </div>
                <p className="text-sm text-text-dim mt-2 uppercase tracking-wider">
                  One-time setup
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="text-[28px] font-bold text-text-muted mb-10">
                $750{" "}
                <span className="text-sm font-normal">+ GST / month</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {inclusions.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs border border-white/[0.08] rounded-full px-4 py-1.5 text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center gap-4">
                <MagneticButton
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gold text-bg font-semibold px-10 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {checkoutLoading ? "Loading..." : "Get Started"}
                </MagneticButton>
                <a
                  href="#book"
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-white/[0.1] px-10 py-4 rounded-xl text-lg text-text-muted font-medium hover:text-text hover:border-white/[0.2] btn-ghost transition-all duration-300"
                >
                  Book a Discovery Call
                </a>
              </div>
              <p className="text-text-dim text-[13px] mt-8">
                We onboard 5 agents per month.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 9: FAQ
        ══════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 px-5 bg-[#0a0a0a]">
          <div className="max-w-[720px] mx-auto">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.0] mb-14">
                Questions
              </h2>
            </FadeIn>
            <div>
              {faqs.map(({ q, a }, i) => (
                <FAQ key={i} question={q} answer={a} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 10: BOOK A CALL / GET STARTED
        ══════════════════════════════════════════════ */}
        <section id="book" className="py-32 sm:py-40 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.0] mb-3">
                Ready?
              </h2>
              <p className="text-text-muted text-lg mb-16">
                Two ways to get started.
              </p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Book a call */}
              <FadeIn direction="left">
                <div>
                  <h3 className="text-xl font-semibold mb-8">
                    Book a Discovery Call
                  </h3>
                  <BookingCalendar />
                </div>
              </FadeIn>

              {/* Right: Pay now */}
              <FadeIn direction="right">
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
                  <MagneticButton
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full inline-flex items-center justify-center bg-gold text-bg font-semibold px-8 py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                  >
                    {checkoutLoading ? "Loading..." : "Pay $11,000 inc GST"}
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>

            {/* Contact details */}
            <FadeIn delay={0.2}>
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
                    className="block hover:text-gold transition-colors duration-300 mb-1 link-underline w-fit"
                  >
                    0403 152 642
                  </a>
                  <a
                    href="mailto:xaviers@areaspecialist.com.au"
                    className="block hover:text-gold transition-colors duration-300 link-underline w-fit"
                  >
                    xaviers@areaspecialist.com.au
                  </a>
                </div>
                <div>
                  <div className="text-text font-medium mb-2">Jarrod Pretty</div>
                  <a
                    href="tel:0403544605"
                    className="block hover:text-gold transition-colors duration-300 mb-1 link-underline w-fit"
                  >
                    0403 544 605
                  </a>
                  <a
                    href="mailto:jarrodjamespretty@hotmail.com"
                    className="block hover:text-gold transition-colors duration-300 link-underline w-fit"
                  >
                    jarrodjamespretty@hotmail.com
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-12 px-5 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <span className="font-semibold text-text-muted">
              Agent<span className="text-gold">Setup</span>
            </span>
            <div className="text-xs uppercase tracking-[0.2em] text-text-dim">
              avaracollective.com
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm text-text-muted mb-8">
            <div>
              <div className="text-text font-medium mb-1">Xavier Stevens</div>
              <a href="tel:0403152642" className="hover:text-gold transition-colors duration-300 link-underline">
                0403 152 642
              </a>
              {" "}&middot;{" "}
              <a href="mailto:xaviers@areaspecialist.com.au" className="hover:text-gold transition-colors duration-300 link-underline">
                xaviers@areaspecialist.com.au
              </a>
            </div>
            <div>
              <div className="text-text font-medium mb-1">Jarrod Pretty</div>
              <a href="tel:0403544605" className="hover:text-gold transition-colors duration-300 link-underline">
                0403 544 605
              </a>
              {" "}&middot;{" "}
              <a href="mailto:jarrodjamespretty@hotmail.com" className="hover:text-gold transition-colors duration-300 link-underline">
                jarrodjamespretty@hotmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.04] text-xs text-text-dim">
            <span>Built in Australia</span>
            <span>&copy; {new Date().getFullYear()} Avara Collective</span>
          </div>
        </div>
      </footer>
    </>
  );
}
