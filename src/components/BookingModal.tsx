"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ─── Villa data ───────────────────────────────────────────────────────────────
export const VILLAS = [
  {
    id: "garden-suite",
    name: "Aura Garden Suite",
    price: 1500000,
    badge: "Breakfast Incl.",
    description: "Garden view · serene & intimate",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pool-villa",
    name: "Aura Pool Villa",
    price: 3500000,
    badge: "Most Popular",
    description: "Private pool · tropical paradise",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cliff-suite",
    name: "Aura Cliff Suite",
    price: 5000000,
    badge: "Honeymoon Pkg",
    description: "Rice field views · ultimate romance",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
  },
];

const OCCASIONS = [
  "Romantic Getaway",
  "Honeymoon",
  "Anniversary",
  "Birthday Celebration",
  "Wedding Package",
  "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(amount: number): string {
  return "IDR " + amount.toLocaleString("id-ID");
}

function getNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getTomorrowString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVilla?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingModal({ isOpen, onClose, preselectedVilla }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedVilla, setSelectedVilla] = useState(preselectedVilla || "pool-villa");
  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(getTomorrowString());
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Romantic Getaway");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (preselectedVilla) setSelectedVilla(preselectedVilla);
  }, [preselectedVilla]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const villa = VILLAS.find((v) => v.id === selectedVilla) || VILLAS[1];
  const nights = getNights(checkIn, checkOut);
  const subtotal = villa.price * nights;
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  const isStep1Valid = !!selectedVilla && !!checkIn && !!checkOut && nights > 0;
  const isStep2Valid = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  const waMessage = encodeURIComponent(
    `Hello Aura Villa Bali! I'd like to make a reservation:\n\n` +
    `🏡 Villa: ${villa.name}\n` +
    `📅 Check-in: ${formatDate(checkIn)}\n` +
    `📅 Check-out: ${formatDate(checkOut)}\n` +
    `🌙 Duration: ${nights} night${nights > 1 ? "s" : ""}\n` +
    `👥 Guests: ${guests} person${guests > 1 ? "s" : ""}\n` +
    `🎉 Occasion: ${occasion}\n` +
    `💰 Estimated Total: ${formatPrice(total)} (incl. 11% tax)\n\n` +
    `Guest Details:\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}` +
    (specialRequests ? `\n\nSpecial Requests:\n${specialRequests}` : "")
  );

  const mailBody = encodeURIComponent(
    `Villa Booking Inquiry — Aura Villa Bali\n\n` +
    `Villa: ${villa.name}\nCheck-in: ${formatDate(checkIn)}\nCheck-out: ${formatDate(checkOut)}\n` +
    `Duration: ${nights} night(s)\nGuests: ${guests}\nOccasion: ${occasion}\n` +
    `Estimated Total: ${formatPrice(total)}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}` +
    (specialRequests ? `\n\nSpecial Requests:\n${specialRequests}` : "")
  );

  const stepLabels = ["Choose Stay", "Your Details", "Confirm"];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal shell */}
      <div className="relative w-full h-full md:h-auto md:max-h-[90vh] md:w-[960px] lg:w-[1080px] flex flex-col md:flex-row shadow-2xl animate-fadeIn overflow-hidden md:rounded-sm">

        {/* ── Left panel (desktop only) ── */}
        <div className="hidden md:flex md:w-[360px] shrink-0 bg-primary-container flex-col justify-between p-10 relative overflow-hidden">
          {/* background photo tint */}
          <div className="absolute inset-0">
            <img src={villa.image} alt={villa.name} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-primary-container/75" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <Image src="/Aura-Villas.png" alt="Aura Villas" width={30} height={30} className="object-contain" />
              <span className="font-headline-sm text-surface-container-low">Aura Villa Bali</span>
            </div>

            {/* Step progress */}
            <div>
              <p className="font-label-sm text-on-primary-container/50 uppercase tracking-widest mb-4">Progress</p>
              <div className="space-y-3">
                {stepLabels.map((label, i) => {
                  const s = i + 1;
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-nav-caps text-xs shrink-0 transition-all duration-300 ${
                        step === s ? "bg-secondary-fixed-dim text-primary" :
                        step > s ? "bg-on-primary-container/40 text-surface" :
                        "bg-on-primary-container/10 text-on-primary-container/30"
                      }`}>
                        {step > s
                          ? <span className="material-symbols-outlined text-sm">check</span>
                          : s}
                      </div>
                      <span className={`font-nav-caps uppercase tracking-widest text-xs transition-colors ${
                        step === s ? "text-surface-container-low" : "text-on-primary-container/40"
                      }`}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected villa preview */}
            <div>
              <p className="font-label-sm text-on-primary-container/50 uppercase tracking-widest mb-3">Selected Villa</p>
              <div className="aspect-video overflow-hidden mb-3 shadow-lg">
                <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-headline-sm text-surface-container-low mb-1">{villa.name}</h3>
              <p className="font-label-sm text-secondary-fixed-dim">{villa.description}</p>
            </div>
          </div>

          {/* Price breakdown */}
          {nights > 0 && (
            <div className="relative z-10 border-t border-on-primary-container/20 pt-6 space-y-3">
              <p className="font-label-sm text-on-primary-container/50 uppercase tracking-widest mb-3">Price Summary</p>
              <div className="flex justify-between font-body-md text-on-primary-container/75 text-sm">
                <span>{formatPrice(villa.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-md text-on-primary-container/50 text-sm">
                <span>Tax & service (11%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-headline-sm text-surface-container-low border-t border-on-primary-container/20 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Right panel — form ── */}
        <div className="flex-1 bg-surface flex flex-col overflow-hidden">
          {/* Form header */}
          <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-outline-variant/20 shrink-0">
            <div>
              <p className="font-nav-caps text-secondary uppercase tracking-widest mb-0.5">Step {step} of 3</p>
              <h2 className="font-headline-sm text-primary">
                {step === 1 ? "Choose Your Stay" : step === 2 ? "Your Details" : "Review & Confirm"}
              </h2>
            </div>
            <button id="booking-close" onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8">

            {/* ════ STEP 1 ════ */}
            {step === 1 && (
              <>
                {/* Villa selector */}
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-4">Select Villa</label>
                  <div className="space-y-3">
                    {VILLAS.map((v) => (
                      <button
                        key={v.id}
                        id={`villa-select-${v.id}`}
                        onClick={() => setSelectedVilla(v.id)}
                        className={`w-full flex items-center gap-4 p-4 border transition-all duration-200 text-left cursor-pointer group ${
                          selectedVilla === v.id
                            ? "border-primary bg-surface-container"
                            : "border-outline-variant hover:border-primary/50 hover:bg-surface-container/50"
                        }`}
                      >
                        <div className="w-20 h-14 overflow-hidden shrink-0">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="font-headline-sm text-primary">{v.name}</span>
                            {selectedVilla === v.id && (
                              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            )}
                          </div>
                          <span className="font-label-sm text-on-surface-variant">{v.description}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-headline-sm text-primary text-sm">{formatPrice(v.price)}</p>
                          <p className="font-label-sm text-on-surface-variant">/night</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-4">Select Dates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Check-In</p>
                      <input
                        id="booking-checkin"
                        type="date"
                        value={checkIn}
                        min={getTodayString()}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (checkOut <= e.target.value) {
                            const d = new Date(e.target.value);
                            d.setDate(d.getDate() + 1);
                            setCheckOut(d.toISOString().split("T")[0]);
                          }
                        }}
                        className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <p className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Check-Out</p>
                      <input
                        id="booking-checkout"
                        type="date"
                        value={checkOut}
                        min={checkIn || getTodayString()}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="mt-4 bg-surface-container px-5 py-3 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">nights_stay</span>
                      <span className="font-body-md text-primary">
                        <strong>{nights} night{nights > 1 ? "s" : ""}</strong> · {formatDate(checkIn)} → {formatDate(checkOut)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-4">Number of Guests</label>
                  <div className="flex items-center gap-6 border border-outline-variant px-6 py-4 w-fit">
                    <button
                      id="guests-dec"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="text-primary hover:text-secondary transition-colors cursor-pointer w-8 h-8 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="text-center min-w-[3rem]">
                      <span className="font-headline-sm text-primary text-2xl">{guests}</span>
                      <p className="font-label-sm text-on-surface-variant">{guests === 1 ? "Guest" : "Guests"}</p>
                    </div>
                    <button
                      id="guests-inc"
                      onClick={() => setGuests((g) => Math.min(6, g + 1))}
                      className="text-primary hover:text-secondary transition-colors cursor-pointer w-8 h-8 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Mobile price preview */}
                {nights > 0 && (
                  <div className="md:hidden bg-primary-container text-on-primary-container p-6">
                    <p className="font-label-sm uppercase tracking-widest opacity-60 mb-1">Estimated Total</p>
                    <p className="font-headline-sm text-surface-container-low text-2xl mb-1">{formatPrice(total)}</p>
                    <p className="font-label-sm opacity-50">incl. 11% tax · {nights} night{nights > 1 ? "s" : ""}</p>
                  </div>
                )}
              </>
            )}

            {/* ════ STEP 2 ════ */}
            {step === 2 && (
              <>
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-3">Full Name *</label>
                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-3">Email Address *</label>
                  <input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-3">WhatsApp Number *</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812 xxxx xxxx"
                    className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-3">Occasion</label>
                  <div className="relative">
                    <select
                      id="booking-occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="font-nav-caps text-primary uppercase tracking-widest block mb-3">
                    Special Requests <span className="normal-case font-body-md text-on-surface-variant tracking-normal text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="booking-requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. flower decoration, candles, early check-in, dietary needs..."
                    rows={4}
                    className="w-full border border-outline-variant focus:border-primary bg-transparent px-4 py-3 font-body-md text-primary placeholder:text-primary/30 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </>
            )}

            {/* ════ STEP 3 ════ */}
            {step === 3 && (
              <>
                <p className="font-body-md text-on-surface-variant">Please review your booking details before confirming.</p>

                {/* Summary card */}
                <div className="border border-outline-variant divide-y divide-outline-variant/40">
                  <div className="p-5 flex gap-4 items-center">
                    <div className="w-24 h-16 overflow-hidden shrink-0">
                      <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-primary mb-1.5">{villa.name}</h3>
                      <span className="font-label-sm text-secondary-fixed-dim border border-secondary-fixed-dim px-3 py-0.5 rounded-full uppercase">{villa.badge}</span>
                    </div>
                  </div>

                  {[
                    { icon: "calendar_today", label: "Check-In", value: formatDate(checkIn) },
                    { icon: "event_available", label: "Check-Out", value: formatDate(checkOut) },
                    { icon: "nights_stay", label: "Duration", value: `${nights} night${nights > 1 ? "s" : ""}` },
                    { icon: "group", label: "Guests", value: `${guests} person${guests > 1 ? "s" : ""}` },
                    { icon: "celebration", label: "Occasion", value: occasion },
                    { icon: "person", label: "Name", value: name },
                    { icon: "mail", label: "Email", value: email },
                    { icon: "phone", label: "WhatsApp", value: phone },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 px-5 py-3">
                      <span className="material-symbols-outlined text-secondary shrink-0 text-[18px]">{icon}</span>
                      <span className="font-label-sm text-on-surface-variant w-20 shrink-0 uppercase tracking-widest">{label}</span>
                      <span className="font-body-md text-primary">{value}</span>
                    </div>
                  ))}

                  {specialRequests && (
                    <div className="flex items-start gap-4 px-5 py-3">
                      <span className="material-symbols-outlined text-secondary shrink-0 text-[18px] mt-0.5">comment</span>
                      <span className="font-label-sm text-on-surface-variant w-20 shrink-0 uppercase tracking-widest pt-0.5">Requests</span>
                      <span className="font-body-md text-primary">{specialRequests}</span>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="p-5 bg-surface-container space-y-2">
                    <div className="flex justify-between font-body-md text-on-surface-variant text-sm">
                      <span>{formatPrice(villa.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-body-md text-on-surface-variant text-sm">
                      <span>Tax & service (11%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-headline-sm text-primary border-t border-outline-variant pt-3 mt-3">
                      <span>Estimated Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <p className="font-label-sm text-on-surface-variant">
                  * Final price confirmed upon booking. Reservation secured after deposit payment.
                </p>

                {/* Confirm CTAs */}
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    id="booking-confirm-wa"
                    href={`https://wa.me/6281234567890?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 font-nav-caps uppercase tracking-widest hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    Confirm via WhatsApp
                  </a>
                  <a
                    id="booking-confirm-email"
                    href={`mailto:hello@auravilla.com?subject=Villa Booking — ${villa.name}&body=${mailBody}`}
                    className="flex items-center justify-center gap-3 border border-primary text-primary px-8 py-4 font-nav-caps uppercase tracking-widest hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    Send Email Inquiry
                  </a>
                </div>
              </>
            )}
          </div>

          {/* ── Bottom navigation ── */}
          <div className="px-6 md:px-10 py-5 border-t border-outline-variant/20 flex justify-between items-center shrink-0">
            {step > 1 ? (
              <button
                id="booking-back"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="flex items-center gap-2 font-nav-caps text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="font-nav-caps text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors cursor-pointer text-xs"
              >
                Cancel
              </button>
            )}

            {step < 3 && (
              <button
                id="booking-next"
                onClick={() => {
                  if (step === 1 && isStep1Valid) setStep(2);
                  if (step === 2 && isStep2Valid) setStep(3);
                }}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                className={`flex items-center gap-2 px-8 py-3 font-nav-caps uppercase tracking-widest transition-all ${
                  (step === 1 && isStep1Valid) || (step === 2 && isStep2Valid)
                    ? "bg-primary text-on-primary hover:bg-primary/90 cursor-pointer"
                    : "bg-outline-variant/30 text-on-surface-variant cursor-not-allowed"
                }`}
              >
                {step === 2 ? "Review Booking" : "Continue"}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
