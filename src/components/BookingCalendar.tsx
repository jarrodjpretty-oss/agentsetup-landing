"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";

/* ---- helpers ---- */

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function generateSlots(date: Date): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${h}:00`);
    slots.push(`${h}:30`);
  }

  const now = new Date();
  if (isSameDay(date, now)) {
    return slots.filter((s) => {
      const [hour, min] = s.split(":").map(Number);
      const slotTime = new Date(date);
      slotTime.setHours(hour, min, 0, 0);
      return slotTime > now;
    });
  }
  return slots;
}

function formatSlot(s: string): string {
  const [h, m] = s.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const display = h > 12 ? h - 12 : h;
  return `${display}:${m.toString().padStart(2, "0")}${suffix}`;
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/* ---- component ---- */

type ContactMethod = "call" | "sms" | "email";

export default function BookingCalendar() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "form" | "done">("date");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("call");
  const [submitting, setSubmitting] = useState(false);

  const weekStart = useMemo(
    () => addDays(startOfWeek(today), weekOffset * 7),
    [today, weekOffset]
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const maxWeekOffset = 2;

  const canGoPrev = weekOffset > 0;
  const canGoNext = weekOffset < maxWeekOffset;

  const handleDateSelect = (d: Date) => {
    if (d < today) return;
    setSelectedDate(d);
    setSelectedSlot(null);
    setStep("time");
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formatDateISO(selectedDate),
          time: selectedSlot,
          name,
          phone,
          email,
          preferredContact: contactMethod,
        }),
      });
      if (res.ok) {
        setStep("done");
      }
    } catch {
      // silently handle for now
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- confirmation ---- */
  if (step === "done") {
    return (
      <div className="glass-card rounded-2xl p-10 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Booking confirmed</h3>
        <p className="text-text-muted leading-relaxed">
          Xavier or Jarrod will be in touch within 2 hours.
        </p>
        {selectedDate && selectedSlot && (
          <p className="text-text-muted text-sm mt-5">
            {formatDate(selectedDate)} at {formatSlot(selectedSlot)} AEST
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-8 mb-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wider">
            {step === "date"
              ? "Select a date"
              : step === "time"
              ? "Select a time"
              : "Your details"}
          </h3>
          {(step === "time" || step === "form") && (
            <button
              onClick={() => {
                if (step === "form") {
                  setStep("time");
                  setSelectedSlot(null);
                } else if (step === "time") {
                  setStep("date");
                  setSelectedDate(null);
                }
              }}
              className="text-sm text-gold hover:underline cursor-pointer"
            >
              Back
            </button>
          )}
        </div>

        {/* ---- calendar week view ---- */}
        {step === "date" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => canGoPrev && setWeekOffset((w) => w - 1)}
                disabled={!canGoPrev}
                className="p-2.5 rounded-xl border border-border hover:border-border-hover disabled:opacity-30 transition-all duration-300 cursor-pointer disabled:cursor-default"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-text-muted font-medium">
                {weekDays[0].toLocaleDateString("en-AU", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => canGoNext && setWeekOffset((w) => w + 1)}
                disabled={!canGoNext}
                className="p-2.5 rounded-xl border border-border hover:border-border-hover disabled:opacity-30 transition-all duration-300 cursor-pointer disabled:cursor-default"
                aria-label="Next week"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {weekDays.map((d, i) => {
                const isPast = d < today;
                const isSelected = selectedDate && isSameDay(d, selectedDate);
                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(d)}
                    disabled={isPast}
                    className={`flex flex-col items-center min-w-[64px] min-h-[64px] justify-center py-4 px-3 rounded-xl text-sm transition-all duration-300 cursor-pointer disabled:cursor-default ${
                      isPast
                        ? "opacity-30"
                        : isSelected
                        ? "bg-gradient-to-b from-gold to-gold-light text-bg font-semibold shadow-[0_0_20px_rgba(200,168,75,0.2)]"
                        : "border border-border hover:border-border-hover"
                    }`}
                  >
                    <span className="text-xs mb-1.5 opacity-70">{DAY_NAMES[i]}</span>
                    <span className="text-xl font-bold">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ---- time slots ---- */}
        {step === "time" && selectedDate && (
          <>
            <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              {formatDate(selectedDate)} (AEST)
            </p>
            {(() => {
              const slots = generateSlots(selectedDate);
              if (slots.length === 0) {
                return (
                  <p className="text-text-muted text-sm py-8 text-center">
                    No available slots for this date.
                  </p>
                );
              }
              return (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`min-h-[52px] py-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                        selectedSlot === slot
                          ? "bg-gradient-to-b from-gold to-gold-light text-bg shadow-[0_0_20px_rgba(200,168,75,0.2)]"
                          : "border border-border hover:border-gold/40 hover:text-gold"
                      }`}
                    >
                      {formatSlot(slot)}
                    </button>
                  ))}
                </div>
              );
            })()}
          </>
        )}

        {/* ---- booking form ---- */}
        {step === "form" && selectedDate && selectedSlot && (
          <>
            <p className="text-sm text-text-muted mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              {formatDate(selectedDate)} at {formatSlot(selectedSlot)} AEST
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="book-name"
                  className="block text-sm text-text-muted mb-2"
                >
                  Name
                </label>
                <input
                  id="book-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl py-4 px-5 text-base text-text placeholder:text-text-dim focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="book-phone"
                  className="block text-sm text-text-muted mb-2"
                >
                  Phone
                </label>
                <input
                  id="book-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl py-4 px-5 text-base text-text placeholder:text-text-dim focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                  placeholder="04XX XXX XXX"
                />
              </div>
              <div>
                <label
                  htmlFor="book-email"
                  className="block text-sm text-text-muted mb-2"
                >
                  Email
                </label>
                <input
                  id="book-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl py-4 px-5 text-base text-text placeholder:text-text-dim focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>
              <fieldset>
                <legend className="block text-sm text-text-muted mb-3">
                  Preferred contact method
                </legend>
                <div className="flex gap-5">
                  {(
                    [
                      ["call", "Call"],
                      ["sms", "SMS"],
                      ["email", "Email"],
                    ] as const
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={value}
                        checked={contactMethod === value}
                        onChange={() => setContactMethod(value)}
                        className="accent-[#C8A84B]"
                      />
                      <span className="text-sm text-text-muted">{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-bg font-bold py-4 rounded-xl text-lg btn-glow transition-all duration-300 disabled:opacity-60 cursor-pointer mt-3"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
