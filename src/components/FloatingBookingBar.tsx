"use client";

import { useEffect, useState } from "react";

interface FloatingBookingBarProps {
  onBook: () => void;
}

export default function FloatingBookingBar({ onBook }: FloatingBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* ── Desktop bar ── */}
      <div className="hidden md:flex bg-inverse-surface text-inverse-on-surface md:ml-[80px] items-center justify-between px-12 py-4 shadow-2xl border-t border-surface-variant/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-surface-variant text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>villa</span>
          <span className="font-nav-caps text-surface/80 uppercase tracking-widest">Aura Villa Bali · Ubud</span>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-8 items-center text-surface-variant">
            <span className="font-label-sm uppercase tracking-wider">From IDR 1.500.000 / night</span>
            <span className="text-surface-variant/30">|</span>
            <span className="font-label-sm uppercase tracking-wider">3 Villas Available</span>
            <span className="text-surface-variant/30">|</span>
            <span className="font-label-sm uppercase tracking-wider">Breakfast Included</span>
          </div>
          <button
            id="floating-book-btn"
            onClick={onBook}
            className="bg-secondary-fixed-dim text-primary px-8 py-3 font-nav-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors cursor-pointer whitespace-nowrap"
          >
            Book Your Stay
          </button>
        </div>
      </div>

      {/* ── Mobile bar ── */}
      <div className="md:hidden bg-inverse-surface text-inverse-on-surface flex items-center justify-between px-6 py-4 shadow-2xl border-t border-surface-variant/10">
        <div>
          <p className="font-nav-caps text-surface uppercase tracking-widest text-xs">Aura Villa Bali</p>
          <p className="font-label-sm text-surface-variant mt-0.5">From IDR 1.500.000 / night</p>
        </div>
        <button
          id="floating-book-btn-mobile"
          onClick={onBook}
          className="bg-secondary-fixed-dim text-primary px-6 py-3 font-nav-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors cursor-pointer text-xs"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
