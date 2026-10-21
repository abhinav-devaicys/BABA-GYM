import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { DumbbellCanvas } from './components/DumbbellCanvas';
import { initialSiteData, SiteData } from './data/siteData';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Shield,
  CreditCard,
  Award,
  Flame,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export const App: React.FC = () => {
  const [site] = useState<SiteData>(initialSiteData);
  const [navOpen, setNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const mainRef = useRef<HTMLElement | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: 'Strength Training',
    preferredTime: 'Morning (5:00 AM - 10:30 AM)'
  });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js');

    const ctx = gsap.context(() => {
      // Staggered reveal for .rv elements
      ScrollTrigger.batch('.rv', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => gsap.set(batch, { clearProps: 'transform' }),
          }),
      });

      gsap.set('.rv', { y: 36, opacity: 0 });

      // Parallax scroll effects
      const parallaxEls = document.querySelectorAll('[data-sp]');
      parallaxEls.forEach((el) => {
        const targetSec = el.closest('section');
        if (!targetSec) return;
        const spVal = (el as HTMLElement).dataset.sp;
        gsap.to(el, {
          yPercent: Number(spVal),
          ease: 'none',
          scrollTrigger: {
            trigger: targetSec,
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
          },
        });
      });

      // Hero scale out
      gsap.to('.hero-in', {
        scale: 0.9,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          scrub: true,
          start: 'center top',
          end: 'bottom top',
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = () => {
    setNavOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    setTimeout(() => {
      setFormLoading(false);
      setFormStatus(
        '🎉 Success! Your free trial request at Baba Gym has been received. Our team will call you shortly on ' + formData.phone + ' to confirm your slot.'
      );
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff1f1f', '#ffffff', '#e60000', '#222222']
        });
      } catch {
        // ignore if confetti fails
      }
      setFormData({ name: '', phone: '', goal: 'Strength Training', preferredTime: 'Morning (5:00 AM - 10:30 AM)' });
    }, 800);
  };

  const getImageStyle = (url?: string) =>
    url ? ({ '--img': `url(${url})` } as React.CSSProperties) : undefined;

  return (
    <div className="bg-[#090d14] text-[#eef2f7] min-h-screen selection:bg-red-600 selection:text-white relative">
      {/* 3D Dumbbell WebGL Canvas */}
      <DumbbellCanvas />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#090d14]/90 backdrop-blur-md border-b border-white/10">
        <a href="#hero" className="flex items-center gap-3 text-decoration-none group">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            BG
          </div>
          <div>
            <span className="font-black text-xl md:text-2xl tracking-wider font-['Big_Shoulders_Display'] text-white block leading-none">
              {site.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold block mt-0.5">
              {site.subName}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0 text-sm font-medium">
          <li><a href="#about" className="text-gray-300 hover:text-red-500 transition-colors">About Us</a></li>
          <li><a href="#equipment" className="text-gray-300 hover:text-red-500 transition-colors">Facilities</a></li>
          <li><a href="#trainers" className="text-gray-300 hover:text-red-500 transition-colors">Trainers</a></li>
          <li><a href="#plans" className="text-gray-300 hover:text-red-500 transition-colors">Memberships</a></li>
          <li><a href="#reviews" className="text-gray-300 hover:text-red-500 transition-colors">Reviews</a></li>
          <li><a href="#location" className="text-gray-300 hover:text-red-500 transition-colors">Location</a></li>
          <li><a href="#faq" className="text-gray-300 hover:text-red-500 transition-colors">FAQ</a></li>
          <li>
            <a
              href="#contact"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-md font-bold tracking-wide uppercase text-xs transition-all shadow-md shadow-red-600/30 hover:shadow-red-600/50"
            >
              Free Trial
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="lg:hidden text-white bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown */}
        {navOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0d1726]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl lg:hidden flex flex-col gap-4">
            <a href="#about" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">About Us</a>
            <a href="#equipment" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">Facilities</a>
            <a href="#trainers" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">Trainers</a>
            <a href="#plans" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">Memberships</a>
            <a href="#reviews" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">Reviews</a>
            <a href="#location" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">Location</a>
            <a href="#faq" onClick={handleNavClick} className="text-lg font-medium text-gray-200 hover:text-red-500">FAQ</a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="bg-red-600 text-white text-center py-3 rounded-md font-bold uppercase text-sm mt-2"
            >
              Book Free Trial
            </a>
          </div>
        )}
      </nav>

      {/* Main Content Sections */}
      <main ref={mainRef}>
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-75 pointer-events-none"
            style={{ backgroundImage: `url(${site.heroImg})` }}
            data-sp="15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/60 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10 hero-in">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-4 py-1.5 rounded-full mb-6 rv">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400 tracking-wider uppercase">
                Gwalior's Elite Gym Since 2006 • 4.5★ Justdial Rating
              </span>
            </div>

            <h1
              className="font-['Big_Shoulders_Display'] text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-white mb-6 rv leading-[0.9]"
              dangerouslySetInnerHTML={{ __html: site.headline }}
            />

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 rv font-normal leading-relaxed">
              {site.tagline}
            </p>

            <div className="flex flex-wrap gap-4 rv">
              <a
                href="#contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold text-base tracking-wider uppercase transition-all shadow-xl shadow-red-600/30 flex items-center gap-2 group"
              >
                <span>Book a Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#plans"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-md font-bold text-base tracking-wider uppercase backdrop-blur-md transition-all"
              >
                View Memberships
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20Baba%20Gym%20memberships.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-6 py-4 rounded-md font-bold text-base tracking-wider uppercase flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 rv">
              {site.stats.map(([val, label], idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl md:text-3xl font-black text-red-500 font-['Big_Shoulders_Display']">
                    {val}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE TICKER */}
        <div className="bg-red-600 text-white py-3 overflow-hidden whitespace-nowrap shadow-inner relative z-20">
          <div className="inline-block animate-[marquee_25s_linear_infinite] text-sm md:text-base font-black tracking-widest uppercase">
            {site.ticker.concat(site.ticker).map((t, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <section id="about" className="py-24 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rv">
              <div className="absolute -inset-4 bg-red-600/20 rounded-2xl blur-xl -z-10" />
              <img
                src={site.aboutImg}
                alt="Baba Gym interior and weight floor"
                className="rounded-xl w-full h-[450px] object-cover border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#0d1726] border border-red-500/30 p-6 rounded-xl shadow-2xl hidden sm:block">
                <div className="text-3xl font-black text-white font-['Big_Shoulders_Display']">18+ YEARS</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Of Forging Champions in Gwalior</div>
              </div>
            </div>

            <div className="rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Since 2006</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] mb-6 text-white leading-tight">
                About Baba Gym <br />
                <span className="text-red-500">The Muscle Dope</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                {site.about}
              </p>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                {site.historyText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {site.contact.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-sm font-semibold text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold text-sm uppercase transition-all shadow-md shadow-red-600/30"
                >
                  Visit Gym Today
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-md font-bold text-sm uppercase transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Call {site.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FACILITIES & EQUIPMENT SECTION */}
        <section id="equipment" className="py-24 px-6 md:px-12 bg-[#0d1726]/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">World-Class Setup</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                Equipment & Facilities
              </h2>
              <p className="text-gray-400 mt-4 text-base">
                Engineered for serious hypertrophy, raw power development, cardiovascular endurance, and safe functional training.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {site.equipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-[#090d14] border border-white/10 rounded-xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-xl rv flex flex-col"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={eq.img}
                      alt={eq.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] text-white mb-2 uppercase tracking-wide group-hover:text-red-500 transition-colors">
                        {eq.t}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {eq.d}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-red-400 uppercase tracking-wider">
                      <span>Baba Gym Standard</span>
                      <Shield className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINERS SECTION */}
        <section id="trainers" className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Expert Coaching</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                Meet Our Professional Trainers
              </h2>
              <p className="text-gray-400 mt-4 text-base">
                Years of competitive bodybuilding, strength coaching, and personal transformation expertise to guide your fitness journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {site.trainers.map((tr) => (
                <div
                  key={tr.id}
                  className="bg-[#0d1726]/80 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-xl rv flex flex-col"
                >
                  <div className="h-80 overflow-hidden relative">
                    <img
                      src={tr.img}
                      alt={tr.alt}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1726] via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                        Certified Expert
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black font-['Big_Shoulders_Display'] text-white uppercase tracking-wide">
                        {tr.t}
                      </h3>
                      <p className="text-red-500 text-sm font-semibold mb-3">
                        {tr.d}
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {tr.c}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <a
                        href="#contact"
                        className="text-xs font-bold text-white uppercase tracking-wider hover:text-red-500 flex items-center gap-1 transition-colors"
                      >
                        <span>Book Training Session</span>
                        <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                      </a>
                      <Award className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP PLANS SECTION */}
        <section id="plans" className="py-24 px-6 md:px-12 bg-[#0d1726]/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Join Baba Gym</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                Membership Plans & Pricing
              </h2>
              <p className="text-gray-400 mt-4 text-base">
                Transparent and flexible membership options for every fitness goal. Contact us or visit the gym for current offers and student discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {site.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#090d14] rounded-xl p-6 border flex flex-col justify-between relative transition-all duration-300 rv ${
                    plan.hot
                      ? 'border-red-500 shadow-xl shadow-red-600/10 bg-gradient-to-b from-[#131b2c] to-[#090d14]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {plan.hot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                      {plan.duration}
                    </div>
                    <h3 className="text-xl font-black font-['Big_Shoulders_Display'] text-white uppercase mb-3">
                      {plan.t}
                    </h3>
                    <div className="text-2xl font-black text-white font-['Big_Shoulders_Display'] mb-4 bg-white/5 py-3 px-4 rounded-lg border border-white/5 text-center">
                      {plan.p}
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 text-xs text-gray-300">
                      {site.planFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className={`w-full py-3 rounded-md font-bold text-xs tracking-wider uppercase text-center transition-all block ${
                      plan.hot
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Inquire / Join
                  </a>
                </div>
              ))}
            </div>

            {/* Payment Modes & Convenience */}
            <div className="mt-12 bg-[#090d14] border border-white/10 rounded-xl p-6 md:p-8 rv flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg font-['Big_Shoulders_Display'] uppercase">Convenient Payment Options</h4>
                  <p className="text-gray-400 text-xs mt-1">We accept UPI (PhonePe, Google Pay, Paytm), cash, and direct bank transfers.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {site.contact.payments.map((pay, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold text-gray-200">
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS & REVIEWS SECTION */}
        <section id="reviews" className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Verified Testimonials</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                What Our Members Say
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-white font-bold text-base">4.5 / 5.0</span>
                <span className="text-gray-400 text-sm">({site.contact.justdialRating})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {site.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#0d1726]/80 border border-white/10 rounded-xl p-8 flex flex-col justify-between shadow-xl rv relative group hover:border-red-500/40 transition-colors"
                >
                  <div className="absolute top-6 right-6 flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{rev.q}"
                  </p>
                  <div>
                    <div className="font-bold text-white text-sm uppercase tracking-wider font-['Big_Shoulders_Display']">
                      {rev.n}
                    </div>
                    <div className="text-xs text-red-500 font-medium mt-0.5">
                      Verified Gym Member
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION & MAP SECTION */}
        <section id="location" className="py-24 px-6 md:px-12 bg-[#0d1726]/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Visit Baba Gym</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white mb-6">
                Find Us in Birla Nagar, Gwalior
              </h2>
              <p className="text-gray-300 text-base mb-8 leading-relaxed">
                Conveniently located in front of JC Mills College in Birla Nagar. Easily accessible from all parts of Gwalior with ample vehicle parking and secure environment.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 bg-[#090d14] border border-white/10 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Gym Address</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{site.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#090d14] border border-white/10 p-4 rounded-xl">
                  <Clock className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Operating Timings</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{site.contact.timings}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#090d14] border border-white/10 p-4 rounded-xl">
                  <Phone className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Direct Contact / WhatsApp</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{site.contact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://maps.google.com/?q=Baba+Gym+Birla+Nagar+Gwalior`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            <div className="rv h-[450px] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#090d14]">
              <iframe
                title="Baba Gym Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.892416!2d78.1825!3d26.2295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMlDCsDEzJzQ2LjIiTiA3OMKwMTAnNS03MCJF!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 rv">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Got Questions?</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 rv">
              {site.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#0d1726]/80 border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-base md:text-lg focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-red-500 transition-transform duration-200 ${
                        activeFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / FREE TRIAL SECTION */}
        <section id="contact" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#090d14] to-[#0d1726]/60 relative">
          <div className="max-w-4xl mx-auto bg-[#0d1726] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden rv">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-red-500 font-bold text-sm tracking-widest uppercase block mb-2">Get Started Today</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Big_Shoulders_Display'] text-white">
                Book Your Free Trial Pass
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Experience Baba Gym firsthand. Fill out the form below or contact us directly on WhatsApp.
              </p>
            </div>

            {formStatus ? (
              <div className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 p-6 rounded-xl text-center font-medium text-sm md:text-base leading-relaxed">
                {formStatus}
                <div className="mt-6">
                  <button
                    onClick={() => setFormStatus('')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
                  >
                    Book Another Pass
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#090d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 95890 01117"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#090d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full bg-[#090d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="Strength Training">Strength Training & Powerlifting</option>
                      <option value="Bodybuilding">Bodybuilding & Hypertrophy</option>
                      <option value="Weight Loss & Cardio">Weight Loss & Fat Burning</option>
                      <option value="CrossFit & Functional">CrossFit & Functional Fitness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Preferred Training Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-[#090d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="Morning (5:00 AM - 10:30 AM)">Morning Shift (5:00 AM - 10:30 AM)</option>
                      <option value="Evening (4:00 PM - 10:00 PM)">Evening Shift (4:00 PM - 10:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Submit Free Trial Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=Hi,%20I%20want%20to%20book%20a%20free%20trial%20at%20Baba%20Gym.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick WhatsApp Chat</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#05080d] border-t border-white/10 py-16 px-6 md:px-12 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-black text-white text-lg">
                BG
              </div>
              <span className="font-black text-xl tracking-wider font-['Big_Shoulders_Display'] text-white">
                {site.name}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Gwalior's premier fitness & bodybuilding temple established in 2006. Dedicated to raw strength, disciplined training, and exceptional results.
            </p>
            <div className="text-xs text-red-500 font-bold">
              ★ {site.contact.justdialRating}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4 font-['Big_Shoulders_Display']">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#equipment" className="hover:text-red-500 transition-colors">Facilities & Equipment</a></li>
              <li><a href="#trainers" className="hover:text-red-500 transition-colors">Trainers</a></li>
              <li><a href="#plans" className="hover:text-red-500 transition-colors">Membership Plans</a></li>
              <li><a href="#location" className="hover:text-red-500 transition-colors">Location & Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4 font-['Big_Shoulders_Display']">
              Operating Timings
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-2">
              <strong className="text-white">Monday to Saturday:</strong><br />
              Morning: 5:00 AM – 10:30 AM<br />
              Evening: 4:00 PM – 10:00 PM
            </p>
            <p className="text-xs text-red-400 font-semibold">
              Sunday: Closed
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4 font-['Big_Shoulders_Display']">
              Contact Us
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-2">
              {site.contact.address}
            </p>
            <p className="text-xs text-white font-bold mb-2">
              Phone: <a href={`tel:${site.contact.phone}`} className="text-red-500 hover:underline">{site.contact.phone}</a>
            </p>
            <div className="flex gap-3 mt-4">
              {site.social.map((soc, i) => (
                <a
                  key={i}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-1.5 rounded border border-white/10 transition-colors"
                >
                  {soc.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Baba Gym – The Muscle Dope (Est. 2006). All rights reserved.</p>
          <p>House No. 25, Lane No. 3, Birla Nagar, Gwalior, MP 474004.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
