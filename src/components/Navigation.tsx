"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Sidebar Navigation Shell (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-[80px] bg-surface z-[100] hidden md:flex flex-col items-center justify-between py-12 border-r border-surface-container-high">
        {/* Logo */}
        <a href="/" className="block">
          <Image
            src="/Aura-Villas.png"
            alt="Aura Villas Logo"
            width={48}
            height={48}
            className="object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </a>
        <nav className="flex flex-col gap-12 items-center">
          <a className="text-vertical font-nav-caps text-primary hover:text-secondary transition-colors tracking-[0.2em] uppercase" href="#villas">Villas</a>
          <a className="text-vertical font-nav-caps text-primary border-r-2 border-secondary pr-1 font-bold uppercase" href="#facilities">Facilities</a>
          <a className="text-vertical font-nav-caps text-primary/60 hover:text-primary transition-colors uppercase" href="#gallery">Gallery</a>
          <a className="text-vertical font-nav-caps text-primary/60 hover:text-primary transition-colors uppercase" href="#contact">Contact</a>
        </nav>
        <div className="flex flex-col items-center gap-6">
          <span
            onClick={() => setIsSearchOpen(true)}
            className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors"
          >
            search
          </span>
          <span
            onClick={() => setIsMenuOpen(true)}
            className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors"
          >
            menu
          </span>
        </div>
      </aside>

      {/* Top Navigation (Mobile) */}
      <header className="md:hidden fixed top-0 w-full bg-surface/90 backdrop-blur-md z-[100] px-margin-mobile py-6 flex justify-between items-center border-b border-outline-variant/10">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/Aura-Villas.png"
            alt="Aura Villas Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-headline-sm text-primary">Aura Villas</span>
        </a>
        <div className="flex items-center gap-4">
          <span
            onClick={() => setIsSearchOpen(true)}
            className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors"
          >
            search
          </span>
          <span
            onClick={() => setIsMenuOpen(true)}
            className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors"
          >
            menu
          </span>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-surface/95 backdrop-blur-xl z-[999] flex flex-col items-center justify-center p-6 animate-fadeIn">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 text-primary hover:text-secondary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <div className="w-full max-w-2xl text-center">
            <h3 className="font-nav-caps text-secondary uppercase tracking-[0.3em] mb-8">Find Your Escape</h3>
            <div className="relative border-b border-primary/30 focus-within:border-primary pb-4 transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search villas, facilities, experiences..."
                className="w-full bg-transparent border-none focus:ring-0 text-3xl font-headline-sm text-primary placeholder:text-primary/20 text-center"
                autoFocus
              />
            </div>
            <div className="mt-12 text-left">
              <h4 className="font-label-sm text-primary/45 uppercase mb-4 text-center">Popular Searches</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {["Pool Villa", "Honeymoon Suite", "Breakfast Package", "Garden View", "Ubud Retreat", "Spa"].map((term) => (
                  <button
                    key={term}
                    onClick={() => { setSearchQuery(term); }}
                    className="px-6 py-2 rounded-full border border-outline-variant hover:border-primary text-body-md text-primary/75 hover:text-primary hover:bg-surface-container transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-primary-container text-on-primary-container z-[998] flex flex-col md:flex-row animate-fadeIn">
          {/* Left Column - Aesthetic Splash */}
          <div className="hidden md:flex md:w-1/2 bg-surface-container p-20 flex-col justify-between border-r border-outline-variant/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <span className="font-display-lg text-[180px] leading-none select-none text-primary">AURA</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/Aura-Villas.png"
                alt="Aura Villas Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-headline-sm text-primary">Aura Villa Bali</span>
            </div>
            <div className="max-w-md z-10">
              <h3 className="font-display-lg text-4xl text-primary leading-tight mb-6">Where Love Finds Its Home.</h3>
              <p className="font-body-md text-on-surface-variant">
                Nestled in the lush highlands of Bali, Aura Villa offers an intimate collection of private villas designed for couples seeking serenity, beauty, and romance.
              </p>
            </div>
            <div className="font-label-sm text-on-surface-variant">
              © 2024 Aura Villa Bali. All rights reserved.
            </div>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-between items-start relative bg-primary-container text-on-primary-container">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-on-primary-container/60 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            <div></div> {/* Spacer */}

            <nav className="flex flex-col gap-8 items-start my-auto w-full">
              <span className="font-label-sm text-secondary-fixed-dim uppercase tracking-widest mb-2">Navigate</span>
              {[
                { label: "Our Villas", href: "#villas" },
                { label: "Facilities & Experience", href: "#facilities" },
                { label: "Photo Gallery", href: "#gallery" },
                { label: "Reserve & Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display-lg text-4xl md:text-5xl text-surface hover:text-secondary-fixed-dim transition-colors group flex items-center gap-4 w-full"
                >
                  {item.label}
                  <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">arrow_right_alt</span>
                </a>
              ))}
            </nav>

            <div className="w-full flex justify-between items-center text-on-primary-container/60 font-label-sm">
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
                <a href="#" className="hover:text-white transition-colors">TripAdvisor</a>
              </div>
              <span className="material-symbols-outlined">home</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
