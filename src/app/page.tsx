"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "The most magical place we've ever stayed. Waking up to rice field views with our morning coffee — pure heaven. We'll be back for our anniversary.",
    name: "Sophie & James",
    origin: "London, UK",
    villa: "Aura Pool Villa",
  },
  {
    quote: "Our honeymoon was everything we dreamed of and more. The staff anticipated every need before we even asked. Truly world-class service.",
    name: "Priya & Arjun",
    origin: "Mumbai, India",
    villa: "Aura Cliff Suite",
  },
  {
    quote: "Secluded, breathtaking, and impossibly romantic. The private pool at sunset made us feel like we had all of Bali to ourselves.",
    name: "Camille & Lucas",
    origin: "Paris, France",
    villa: "Aura Garden Suite",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth * 0.45;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Parallax Effect for the hero images
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

      document.querySelectorAll(".parallax-target").forEach((el) => {
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
          (entry.target as HTMLElement).style.opacity = "1";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────
          SECTION 1: HERO — Editorial Layout
      ───────────────────────────────────────────── */}
      <section className="min-h-screen relative flex flex-col md:flex-row items-center justify-center pt-24 md:pt-0 overflow-hidden">
        <div className="w-full md:w-1/2 h-full px-margin-mobile md:px-margin-desktop z-10 flex flex-col justify-center items-start">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-[0.9] max-w-xl relative">
            <span className="block translate-x-[-5%] mb-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">Where Every</span>
            <span className="block md:ml-24 italic opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">Moment</span>
            <span className="block translate-x-[-5%] opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">Becomes a</span>
            <span className="block md:ml-16 italic opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]">Memory.</span>
          </h1>
          <p className="mt-12 font-body-lg text-on-surface-variant max-w-sm opacity-0 animate-[fadeIn_1s_ease-out_0.9s_forwards]">
            Nestled in the lush highlands of Bali, Aura Villa is an intimate resort crafted for couples — where privacy, romance, and the island's natural beauty intertwine.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 opacity-0 animate-[fadeIn_1s_ease-out_1.1s_forwards]">
            <a
              href="#villas"
              className="group cursor-pointer flex items-center gap-4"
            >
              <span className="font-nav-caps text-secondary-fixed-dim uppercase tracking-widest border-b border-transparent group-hover:border-secondary-fixed-dim transition-all">Explore Our Villas</span>
              <span className="material-symbols-outlined text-secondary-fixed-dim group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
            </a>
            <a
              href="#contact"
              className="font-nav-caps text-primary/50 uppercase tracking-widest text-xs hover:text-primary transition-colors"
            >
              Book Direct via WhatsApp
            </a>
          </div>
        </div>

        {/* Asymmetrical Image Grid */}
        <div className="w-full md:w-1/2 h-[600px] md:h-screen relative mt-12 md:mt-0 p-8 md:p-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-surface-container-low/50 -z-10 rotate-[-2deg] scale-95"></div>
          <div className="relative w-full h-full max-w-md">
            {/* Main Vertical Image */}
            <div className="w-full h-full shadow-2xl relative overflow-hidden parallax-target" style={{ clipPath: "polygon(0 0, 100% 5%, 95% 100%, 5% 95%)" }}>
              <img
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                alt="Aura Villa Bali — a romantic infinity pool villa at dusk with lush tropical gardens and warm ambient lighting."
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
              />
            </div>
            {/* Overlapping Detail */}
            <div className="absolute -bottom-10 -right-10 w-48 h-64 bg-surface shadow-xl p-2 hidden md:block parallax-target">
              <img
                className="w-full h-full object-cover"
                alt="Close-up of hand-crafted Balinese stone carvings and tropical flower arrangement at Aura Villa."
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2: ABOUT — The Story
      ───────────────────────────────────────────── */}
      <section id="about" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-primary-container text-on-primary-container relative reveal opacity-0">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-gutter items-center">
          <div className="md:w-1/3">
            <h2 className="font-headline-md text-headline-md text-surface-container-low mb-8 leading-tight">
              A Story of <br /><span className="italic font-light">Intimate Escapes</span>
            </h2>
            <p className="font-body-md text-on-primary-container/80 mb-12">
              Aura Villa was born from a simple belief — that the most beautiful moments in life deserve a setting just as beautiful. Each of our villas is a private sanctuary designed with Balinese craftsmanship, surrounded by emerald rice fields and whispering palms.
            </p>
            <a className="inline-flex items-center gap-4 text-on-tertiary-container hover:text-white transition-colors uppercase font-nav-caps tracking-[0.2em] group" href="#villas">
              Discover Our Villas
              <span className="w-12 h-px bg-on-tertiary-container group-hover:w-24 transition-all"></span>
            </a>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 gap-8 mt-12 md:mt-0">
            <div className="pt-24">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  alt="Serene infinity pool overlooking the Bali jungle at Aura Villa during golden hour."
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
            <div>
              <div className="aspect-[3/4] bg-surface-container overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  alt="Romantic open-air bedroom with canopy bed and tropical garden view at Aura Villa Bali."
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Large Text */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none translate-y-1/2">
          <span className="font-display-lg text-[200px] leading-none select-none">AURA</span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3: VILLA COLLECTION — Horizontal Slider
      ───────────────────────────────────────────── */}
      <section id="villas" className="py-section-gap overflow-hidden bg-surface-container-low reveal opacity-0">
        <div className="px-margin-mobile md:px-margin-desktop mb-16 flex justify-between items-end">
          <div>
            <h3 className="font-nav-caps text-secondary-fixed-dim uppercase tracking-[0.3em] mb-4">Our Collection</h3>
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-primary">Choose Your Sanctuary</h2>
          </div>
          <div className="flex gap-4">
            <button
              id="slider-prev"
              onClick={() => scroll("left")}
              className="w-12 h-12 border border-outline/30 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined">west</span>
            </button>
            <button
              id="slider-next"
              onClick={() => scroll("right")}
              className="w-12 h-12 border border-outline/30 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>
        <div
          ref={sliderRef}
          className="flex gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory px-margin-mobile md:px-margin-desktop"
        >
          {/* Villa 1: Aura Garden Suite */}
          <div className="min-w-[80vw] md:min-w-[45vw] snap-center group cursor-pointer">
            <div className="aspect-video overflow-hidden relative shadow-lg">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Aura Garden Suite — a romantic villa suite with lush tropical garden and private terrace in Bali."
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <span className="font-nav-caps text-white/70 uppercase">Garden View</span>
                <h4 className="font-headline-md text-white">The Perfect Retreat</h4>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h4 className="font-headline-sm text-primary mb-1">Aura Garden Suite</h4>
                <p className="font-label-sm text-on-surface-variant">From IDR 1.500.000 / night</p>
              </div>
              <span className="font-label-sm text-secondary-fixed-dim border border-secondary-fixed-dim px-4 py-1 rounded-full uppercase">Breakfast Incl.</span>
            </div>
          </div>

          {/* Villa 2: Aura Pool Villa */}
          <div className="min-w-[80vw] md:min-w-[45vw] snap-center group cursor-pointer">
            <div className="aspect-video overflow-hidden relative shadow-lg">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Aura Pool Villa — a luxury private pool villa surrounded by palms and tropical landscaping in Bali."
                src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <span className="font-nav-caps text-white/70 uppercase">Most Popular</span>
                <h4 className="font-headline-md text-white">Private Pool Bliss</h4>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h4 className="font-headline-sm text-primary mb-1">Aura Pool Villa</h4>
                <p className="font-label-sm text-on-surface-variant">From IDR 3.500.000 / night</p>
              </div>
              <span className="font-label-sm text-secondary-fixed-dim border border-secondary-fixed-dim px-4 py-1 rounded-full uppercase">Private Pool</span>
            </div>
          </div>

          {/* Villa 3: Aura Cliff Suite */}
          <div className="min-w-[80vw] md:min-w-[45vw] snap-center group cursor-pointer">
            <div className="aspect-video overflow-hidden relative shadow-lg">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Aura Cliff Suite — a premium honeymoon villa perched over terraced rice fields with panoramic Bali views."
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <span className="font-nav-caps text-white/70 uppercase">Rice Field View</span>
                <h4 className="font-headline-md text-white">Ultimate Honeymoon</h4>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h4 className="font-headline-sm text-primary mb-1">Aura Cliff Suite</h4>
                <p className="font-label-sm text-on-surface-variant">From IDR 5.000.000 / night</p>
              </div>
              <span className="font-label-sm text-secondary-fixed-dim border border-secondary-fixed-dim px-4 py-1 rounded-full uppercase">Honeymoon Pkg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4: FACILITIES
      ───────────────────────────────────────────── */}
      <section id="facilities" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface overflow-hidden reveal opacity-0">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16">
            <h3 className="font-nav-caps text-secondary uppercase tracking-[0.3em] mb-4">What We Offer</h3>
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-primary">Every Detail,<br /><span className="italic font-light">Curated for You.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
            {[
              { icon: "pool", title: "Private Pool", desc: "Each villa features its own temperature-controlled infinity pool overlooking lush tropical gardens." },
              { icon: "restaurant", title: "Daily Breakfast", desc: "Wake up to a lovingly prepared Balinese breakfast delivered fresh to your villa every morning." },
              { icon: "spa", title: "In-Villa Spa", desc: "Experience traditional Balinese massage and wellness treatments in the privacy of your own villa." },
              { icon: "concierge", title: "Personal Butler", desc: "Your dedicated butler is available around the clock to fulfill every wish and arrange any experience." },
              { icon: "local_airport", title: "Airport Transfer", desc: "Complimentary private car transfer from Ngurah Rai International Airport upon arrival and departure." },
              { icon: "landscape", title: "Rice Field Views", desc: "Wake to panoramic views of Bali's emerald terraced rice fields and the jungle-draped valleys below." },
            ].map((facility) => (
              <div key={facility.title} className="group bg-surface p-12 hover:bg-surface-container transition-colors duration-300 cursor-default">
                <span className="material-symbols-outlined text-secondary mb-6 block text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                  {facility.icon}
                </span>
                <h3 className="font-headline-sm text-primary mb-4">{facility.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5: GALLERY
      ───────────────────────────────────────────── */}
      <section id="gallery" className="py-section-gap bg-surface-container-low reveal opacity-0">
        <div className="px-margin-mobile md:px-margin-desktop mb-16 max-w-container-max mx-auto">
          <h3 className="font-nav-caps text-secondary-fixed-dim uppercase tracking-[0.3em] mb-4">Visual Journey</h3>
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-primary">A Glimpse of <span className="italic font-light">Aura.</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="col-span-2 row-span-2 aspect-square overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Aerial view of Aura Villa's tropical garden and private pool at sunset."
              src="https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80"
            />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Luxurious outdoor bathtub with rose petals and candles at Aura Villa Bali."
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Traditional Balinese breakfast spread served on a wooden tray at Aura Villa."
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Romantic candlelit dinner setup on a private terrace overlooking Bali's rice fields."
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Interior of a luxury villa bedroom with handcrafted Balinese furniture and natural textures."
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 6: TESTIMONIALS
      ───────────────────────────────────────────── */}
      <section className="bg-surface-container-highest py-section-gap px-margin-mobile md:px-margin-desktop reveal opacity-0">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16 text-center">
            <h3 className="font-nav-caps text-primary uppercase tracking-[0.4em] mb-4">Guest Stories</h3>
            <h2 className="font-headline-md text-headline-md text-primary italic">Words from our beloved guests.</h2>
          </div>

          {/* Testimonial Display */}
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="font-display-lg text-[120px] leading-none text-primary/10 absolute -top-8 left-0 select-none pointer-events-none">&ldquo;</span>
            <div className="relative z-10">
              <p className="font-headline-sm text-primary leading-relaxed italic mb-12 min-h-[120px] transition-all duration-500">
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="flex flex-col items-center gap-2">
                <span className="font-nav-caps text-primary uppercase tracking-widest">{testimonials[activeTestimonial].name}</span>
                <span className="font-label-sm text-on-surface-variant">{testimonials[activeTestimonial].origin}</span>
                <span className="font-label-sm text-secondary-fixed-dim border border-secondary-fixed-dim px-4 py-1 rounded-full uppercase mt-2">{testimonials[activeTestimonial].villa}</span>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                id={`testimonial-dot-${i}`}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeTestimonial ? "w-8 bg-primary" : "bg-outline-variant"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 7: LOCATION & CONTACT
      ───────────────────────────────────────────── */}
      <section id="contact" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface reveal opacity-0">
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 gap-24 items-center">
          {/* Left: Info */}
          <div>
            <h3 className="font-nav-caps text-secondary uppercase tracking-[0.3em] mb-4">Find Us</h3>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-12">
              Heart of<br /><span className="italic">Bali.</span>
            </h2>

            <div className="space-y-8 mb-16">
              {[
                { icon: "location_on", label: "Address", value: "Jl. Raya Ubud No. 88, Ubud, Gianyar, Bali 80571, Indonesia" },
                { icon: "near_me", label: "Nearby Landmarks", value: "Ubud Royal Palace · 15 min\nTegallalang Rice Terrace · 10 min\nMon Key Forest · 20 min" },
                { icon: "phone", label: "WhatsApp", value: "+62 812-3456-7890" },
                { icon: "mail", label: "Email", value: "hello@auravilla.com" },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 border-b border-outline-variant pb-8">
                  <span className="material-symbols-outlined text-secondary mt-1 shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-body-md text-primary whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                id="whatsapp-cta"
                href="https://wa.me/6281234567890?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20booking%20Aura%20Villa%20Bali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 font-nav-caps uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                Book via WhatsApp
              </a>
              <a
                id="maps-cta"
                href="https://maps.google.com/?q=Ubud,Bali,Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-8 py-4 font-nav-caps uppercase tracking-widest hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-lg">map</span>
                Get Directions
              </a>
            </div>
          </div>

          {/* Right: Decorative image */}
          <div className="relative hidden md:block">
            <div className="aspect-[4/5] overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Aerial view of the lush Ubud highlands in Bali surrounding Aura Villa."
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-primary-container text-on-primary-container p-8 shadow-xl">
              <p className="font-nav-caps uppercase tracking-widest text-secondary-fixed-dim mb-1">Open Year Round</p>
              <p className="font-headline-sm text-surface-container-low">Check-in from 2PM · Check-out 12PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-section-gap px-margin-mobile md:px-margin-desktop reveal opacity-0">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>villa</span>
                <h4 className="font-headline-sm text-surface">Aura Villa Bali</h4>
              </div>
              <p className="font-body-md text-surface-variant leading-relaxed">
                An intimate collection of private villas in Ubud, Bali — where romance, nature, and Balinese spirit converge.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <span className="font-label-sm text-tertiary-fixed uppercase">Explore</span>
                <a className="font-body-md text-surface-variant hover:text-white" href="#villas">Our Villas</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#facilities">Facilities</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#gallery">Gallery</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-label-sm text-tertiary-fixed uppercase">Connect</span>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">Instagram</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">WhatsApp</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">TripAdvisor</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-label-sm text-tertiary-fixed uppercase">Legal</span>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">Privacy Policy</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">Terms & Conditions</a>
                <a className="font-body-md text-surface-variant hover:text-white" href="#">Cancellation Policy</a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-surface-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-label-sm text-surface-variant">© 2024 Aura Villa Bali. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="material-symbols-outlined text-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>villa</span>
              <span className="material-symbols-outlined text-surface-variant">public</span>
              <span className="material-symbols-outlined text-surface-variant">favorite</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
