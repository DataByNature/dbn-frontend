"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Smartphone, LineChart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP dynamically
    let ctx: any;
    const initAnimations = async () => {
      if (typeof window === "undefined") return;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        // Hero & section animations
        ctx = gsap.context(() => {
          // Title animation
          gsap.from(titleRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
          });

          // Subtitle animation
          gsap.from(subtitleRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
          });

          // CTA buttons animation
          gsap.from(ctaRef.current?.children || [], {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.1,
            ease: "power3.out",
          });

          // Features animation on scroll
          if (featuresRef.current) {
            gsap.from(featuresRef.current.children, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.15,
              scrollTrigger: {
                trigger: featuresRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // How it works steps + connecting line
          if (howRef.current) {
            const steps = Array.from(howRef.current.querySelectorAll(".how-step"));
            const connector = howRef.current.querySelector(".how-line");

            if (connector) {
              gsap.from(connector, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: howRef.current,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
              });
            }

            if (steps.length) {
              gsap.from(steps, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: howRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              });
            }
          }

          // Product preview
          if (productRef.current) {
            gsap.from(productRef.current, {
              opacity: 0,
              y: 40,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: productRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // Trust & credibility
          if (trustRef.current) {
            gsap.from(trustRef.current.children, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: trustRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }

          // Floating animation for hero elements
          gsap.to(".floating", {
            y: -20,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        }, heroRef);
      } catch (error) {
        console.warn("GSAP not available, animations disabled");
      }
    };

    void initAnimations();

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant data and airtime top-ups with real-time processing",
      color: "text-accent-gold",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security with encrypted transactions",
      color: "text-primary-bright",
    },
    {
      icon: TrendingUp,
      title: "Best Rates",
      description: "Competitive pricing with transparent fees",
      color: "text-secondary-teal",
    },
    {
      icon: Smartphone,
      title: "Easy to Use",
      description: "Simple interface for seamless transactions",
      color: "text-secondary-muted",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-24 -left-10 w-72 h-72 bg-primary-bright/12 rounded-full blur-3xl floating" />
          <div className="absolute bottom-24 -right-10 w-96 h-96 bg-secondary-teal/12 rounded-full blur-3xl floating" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary-teal/20 bg-white/60 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#E5C564]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-secondary-muted">
                DatabyNature
              </span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-text-navy mb-6"
          >
            <span className="text-primary-deep">Data,</span>{" "}
            <span className="text-text-navy">by nature.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Make life easier. DatabyNature powers seamless data and airtime
            experiences for modern products, agents, and platforms.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button variant="primary" size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-navy mb-4">
              Why Choose DatabyNature?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of data and airtime vending with our
              cutting-edge platform
            </p>
          </div>

          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="space-y-3 text-left">
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                  <h3 className="text-lg font-semibold text-text-navy">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-navy mb-4">
              How DatabyNature works
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, reliable flow from integration to live transactions.
            </p>
          </div>

          <div ref={howRef} className="relative">
            <div className="how-line absolute top-9 left-[10%] right-[10%] h-px bg-secondary-muted/20" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {[
                {
                  step: "01",
                  title: "Connect",
                  body: "Integrate our secure APIs or dashboard into your existing workflows.",
                },
                {
                  step: "02",
                  title: "Configure",
                  body: "Set up wallets, agents, limits, and products to match your business rules.",
                },
                {
                  step: "03",
                  title: "Go live",
                  body: "Start vending airtime and data with real-time monitoring and controls.",
                },
              ].map((item) => (
                <div key={item.step} className="how-step flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-secondary-muted mb-3">
                    <span className="text-gray-500">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product / Platform Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-navy">
              A clear view of every transaction.
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              DatabyNature gives operators and resellers a unified, real-time view of
              volumes, wallets, and performance—without overwhelming screens or noise.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-bright mt-[2px]" />
                <span>High-level KPIs for today&apos;s volume and success rate.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-bright mt-[2px]" />
                <span>Network breakdown so you know where demand is coming from.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-bright mt-[2px]" />
                <span>Wallet visibility that keeps teams aligned and funded.</span>
              </li>
            </ul>
          </div>

          <div
            ref={productRef}
            className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-6 md:p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-deep/10 flex items-center justify-center text-primary-deep text-sm font-semibold">
                  DBN
                </div>
                <span className="text-sm font-medium text-text-navy">
                  DatabyNature Overview
                </span>
              </div>
              <LineChart className="h-5 w-5 text-secondary-muted" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-white p-4">
                <p className="text-xs text-gray-500 mb-1">Today&apos;s Volume</p>
                <p className="text-xl font-bold text-text-navy">₦4,250,000</p>
                <p className="text-xs text-primary-bright mt-1">+12.4% vs yesterday</p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                <p className="text-xl font-bold text-text-navy">98.3%</p>
                <p className="text-xs text-gray-500 mt-1">Across all networks</p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.16em]">
                  Network performance
                </p>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: "MTN", value: 54, color: "bg-primary-deep" },
                  { label: "Airtel", value: 26, color: "bg-secondary-teal" },
                  { label: "Glo", value: 14, color: "bg-secondary-muted" },
                  { label: "9mobile", value: 6, color: "bg-accent-gold" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-14 text-gray-600">{row.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`${row.color} h-full rounded-full`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-500">
                      {row.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-2">
              Trusted infrastructure
            </p>
            <p className="text-base text-gray-600">
              Built for operators, aggregators, and fintech teams who care about reliability.
            </p>
          </div>

          <div
            ref={trustRef}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-bright" />
              <span>Bank-grade security practices</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary-teal" />
              <span>Designed for Nigerian and African markets</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E5C564]" />
              <span>Operational visibility for founders and teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary-deep">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers and start vending today
          </p>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="bg-white text-primary-deep hover:bg-gray-100">
              Start Vending Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-text-navy text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">DatabyNature</h3>
          <p className="text-gray-400 mb-6">
            Your trusted partner for data and airtime vending
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            © {new Date().getFullYear()} DatabyNature. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
