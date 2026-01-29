"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MtnLogo, AirtelLogo, GloLogo, NineMobileLogo, BuyPowerLogo } from "@/components/BrandLogos";
import { NavAuthButtons } from "@/components/NavAuthButtons";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<any>(null);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window === "undefined") return;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        ctxRef.current = gsap.context(() => {
          // Hero entrance animation
          const tl = gsap.timeline();
          tl.from(".hero-badge", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
          })
            .from(".hero-title", {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3")
            .from(".hero-subtitle", {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out"
            }, "-=0.4")
            .from(".hero-cta", {
              y: 20,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out"
            }, "-=0.3");

          // Floating animation for decorative elements
          gsap.to(".float-element", {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: 0.3
          });

          // Trust section logos marquee
          gsap.to(".marquee-track", {
            xPercent: -50,
            repeat: -1,
            duration: 25,
            ease: "none",
          });

          // How it works cards stagger - set initial state first
          gsap.set(".step-card", { opacity: 1 });
          gsap.from(".step-card", {
            scrollTrigger: {
              trigger: ".steps-section",
              start: "top 80%",
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
          });

          // Features grid reveal
          gsap.set(".feature-card", { opacity: 1 });
          gsap.from(".feature-card", {
            scrollTrigger: {
              trigger: ".features-section",
              start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          });

          // Persona panels
          gsap.set(".persona-card", { opacity: 1 });
          gsap.from(".persona-card", {
            scrollTrigger: {
              trigger: ".persona-section",
              start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
          });

        }, containerRef);
      } catch (error) {
        console.warn("GSAP failed to load", error);
      }
    };

    initAnimations();
    return () => ctxRef.current?.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFBFC] text-text-navy font-sans overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-3 border border-gray-100/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative overflow-hidden rounded-xl">
              <Image src="/dbn.jpg" alt="DBN Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-navy hidden sm:block">DatabyNature</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-text-navy transition-colors">How It Works</Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-text-navy transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-text-navy transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <NavAuthButtons />
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4EC] via-[#F0F7F4] to-[#FAFBFC]" />

        {/* Decorative floating elements */}
        <div className="absolute top-32 right-[15%] w-16 h-16 float-element">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-gold to-amber-400 shadow-xl shadow-accent-gold/30 rotate-12" />
        </div>
        <div className="absolute top-48 left-[10%] w-12 h-12 float-element">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-bright to-emerald-500 shadow-lg shadow-primary-bright/30" />
        </div>
        <div className="absolute bottom-32 right-[20%] w-20 h-20 float-element">
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-secondary-teal to-cyan-500 shadow-xl shadow-secondary-teal/20 -rotate-12" />
        </div>
        <div className="absolute bottom-48 left-[18%] w-10 h-10 float-element">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-deep to-emerald-800 shadow-lg shadow-primary-deep/30 rotate-45" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-deep/10 text-primary-deep text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-bright animate-pulse" />
            Fast. Reliable. Affordable.
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-text-navy mb-6 tracking-tight leading-[1.1]">
            Data & Airtime.
            <br />
            <span className="bg-gradient-to-r from-primary-deep via-primary-bright to-secondary-teal bg-clip-text text-transparent">
              Done Right.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Buy data, airtime, and pay bills at discounted rates.
            <span className="font-semibold text-text-navy"> Or resell for profit.</span> Same networks, better prices.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="hero-cta h-14 px-8 text-base font-semibold rounded-xl bg-primary-deep hover:bg-primary-deep/90 text-white shadow-xl shadow-primary-deep/25 transition-all hover:shadow-2xl hover:shadow-primary-deep/30 hover:-translate-y-0.5">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="ghost" className="hero-cta h-14 px-8 text-base font-medium text-gray-700 hover:bg-white/80 rounded-xl border border-gray-200/80 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY SECTION --- */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex w-[200%] marquee-track items-center">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center justify-around w-1/2 px-8">
                  <MtnLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <AirtelLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <GloLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <NineMobileLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <BuyPowerLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <MtnLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  <AirtelLogo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Riseplasma inspired) --- */}
      <section id="how-it-works" className="steps-section py-28 px-6 bg-gradient-to-b from-[#F0F5FF] to-[#FAFBFC]">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-deep mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-text-navy leading-tight">
              It's super simple.
              <br />
              <span className="text-gray-400">Just 3 steps,</span>
              <br />
              endless savings.
            </h2>
            <p className="mt-6 text-lg text-gray-500 max-w-lg mx-auto">
              Get started in under 2 minutes. No hidden fees, no complications.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="step-card group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-deep to-primary-bright flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg shadow-primary-deep/20">
                1
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Create an account</h3>
              <p className="text-gray-500 leading-relaxed">
                Sign up with your email or phone number. It's completely free and takes 30 seconds.
              </p>
            </div>

            <div className="step-card group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-teal to-cyan-500 flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg shadow-secondary-teal/20">
                2
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Fund your wallet</h3>
              <p className="text-gray-500 leading-relaxed">
                Add money via bank transfer or card. No extra charges or hidden fees.
              </p>
            </div>

            <div className="step-card group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold to-amber-500 flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg shadow-accent-gold/20">
                3
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Start buying or selling</h3>
              <p className="text-gray-500 leading-relaxed">
                Purchase data, airtime, or bills instantly. Resell for profit if you want.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 relative z-0">
            <Link href="/register">
              <Button className="h-12 px-8 rounded-xl bg-primary-deep hover:bg-primary-deep/90 text-white font-semibold shadow-lg shadow-primary-deep/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- PERSONA CARDS (Who is it for) --- */}
      <section className="persona-section py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary-teal mb-4">
              Built For You
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-navy">
              Whether you're buying or selling
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Resellers */}
            <div className="persona-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C4D2E] to-[#0F3320] p-10 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-gold/20 to-transparent rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-semibold uppercase mb-6">
                  <Wallet className="w-3.5 h-3.5" />
                  For Resellers
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Sell data & airtime.
                  <br />
                  <span className="text-accent-gold">Keep the profit.</span>
                </h3>
                <p className="text-gray-300 mb-6 max-w-sm leading-relaxed">
                  Get wholesale rates up to 5% cheaper than retail. Sell at market price and pocket the difference.
                </p>
                <ul className="space-y-3 text-sm text-gray-200 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                    </div>
                    Wholesale pricing for all networks
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                    </div>
                    Instant wallet settlement
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                    </div>
                    Automatic transaction receipts
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="bg-white text-primary-deep hover:bg-gray-100 font-semibold h-11 px-6 rounded-xl">
                    Start Selling
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* For Personal Use */}
            <div className="persona-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F6] p-10 border border-gray-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-secondary-teal/10 to-transparent rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-teal/10 text-secondary-teal text-xs font-semibold uppercase mb-6">
                  <Smartphone className="w-3.5 h-3.5" />
                  For Personal Use
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-text-navy mb-4 leading-tight">
                  Pay less for
                  <br />
                  <span className="text-secondary-teal">the same data.</span>
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
                  Why pay ₦1,500 for 3GB when you can get it for ₦1,200? Same network, same speed, lower price.
                </p>

                {/* Price comparison card */}
                <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 max-w-xs">
                  <div className="text-xs text-gray-400 mb-3 font-medium">MTN 3GB Monthly</div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                    <span className="text-gray-400 text-sm">Bank Apps</span>
                    <span className="text-lg font-semibold text-red-400 line-through">₦1,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-text-navy text-sm">DatabyNature</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary-bright">₦1,200</span>
                      <div className="text-xs text-primary-bright bg-primary-bright/10 px-2 py-0.5 rounded-full mt-1 inline-block font-medium">
                        Save ₦300
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/register">
                  <Button className="bg-secondary-teal hover:bg-secondary-teal/90 text-white font-semibold h-11 px-6 rounded-xl">
                    Create Free Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="features-section py-28 px-6 bg-gradient-to-b from-[#FAFBFC] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-deep mb-4">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-navy mb-4">
              Built for reliability
            </h2>
            <p className="text-lg text-gray-500 max-w-lg mx-auto">
              Features that make everyday transactions effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Instant Delivery</h3>
              <p className="text-gray-500 leading-relaxed">
                Transactions complete in seconds, not minutes. No pending orders ever.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Secure Funds</h3>
              <p className="text-gray-500 leading-relaxed">
                Your wallet is protected with bank-grade security and encryption.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-text-navy mb-3">Full History</h3>
              <p className="text-gray-500 leading-relaxed">
                Track every transaction with detailed records you can export anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 relative rounded-xl overflow-hidden">
                  <Image src="/dbn-white.jpg" alt="DBN" fill className="object-cover" />
                </div>
                <span className="text-xl font-bold">DatabyNature</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Start saving on<br />data today.
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Join thousands of smart Nigerians who trust DatabyNature for their daily connectivity needs.
              </p>
              <Link href="/register">
                <Button className="h-12 px-8 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl shadow-xl">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold mb-6 text-gray-500 uppercase tracking-wider text-xs">Services</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="hover:text-white cursor-pointer transition-colors">Buy Airtime</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Buy Data</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pay Electric Bills</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Cable TV</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-gray-500 uppercase tracking-wider text-xs">Company</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="hover:text-white cursor-pointer transition-colors">About</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-gray-500 uppercase tracking-wider text-xs">Support</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                  <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Live Chat</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} DatabyNature. Designed with precision.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
