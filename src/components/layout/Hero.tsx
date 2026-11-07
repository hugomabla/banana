"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Marquee, MarqueeItem } from "@/components/animations/Marquee"
import { Hero3DBanana } from "@/components/three/Banana3D"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { value: "1.000+", label: "Artikel & Guides", icon: "book-open" },
  { value: "50+", label: "Bananen-Sorten", icon: "leaf" },
  { value: "15", label: "Jahre Forschung", icon: "clock" },
  { value: "100%", label: "Kostenlos & Offen", icon: "gift" },
]

const marqueeItems = [
  "🍌 Botanisch eine Beere",
  "🍌 50% DNA-Ähnlichkeit mit Menschen",
  "🍌 Cavendish = Klone",
  "🍌 Kalium-40 radioaktiv",
  "🍌 Schwimmen im Wasser",
  "🍌 Ethylen-Reifegas",
  "🍌 Negativ geotrop",
  "🍌 Tryptophan → Serotonin",
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-line",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      )

      gsap.fromTo(
        ".hero-subtitle",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      )

      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8, stagger: 0.1 }
      )

      gsap.fromTo(
        ".hero-stat",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1, stagger: 0.08 }
      )

      gsap.fromTo(
        ".hero-marquee",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.3 }
      )

      gsap.to(".scroll-indicator", {
        y: 10,
        opacity: 0.3,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      })

      gsap.to(canvasRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(".hero-title", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-banana-500/10 blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cream-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-banana-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-950/80 to-charcoal-950" />
      </div>

      <div ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none lg:pointer-events-auto">
        <Hero3DBanana scrollY={scrollY} />
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-banana-500/30 animate-pulse" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-cream-400/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 rounded-full bg-banana-500/40 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-10 w-2.5 h-2.5 rounded-full bg-cream-400/30 animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-5 w-px h-32 bg-gradient-to-b from-banana-500/30 to-transparent" />
        <div className="absolute top-1/2 right-5 w-px h-32 bg-gradient-to-b from-cream-400/20 to-transparent" />
      </div>

      <div className="container-premium relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <ScrollReveal y={20} delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-banana-500/15 border border-banana-500/30 text-banana-400 text-caption font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-banana-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-banana-500" />
              </span>
              NEU: Banana Knowledge Hub v2.0 – Jetzt mit 3D-Erlebnis
            </div>
          </ScrollReveal>

          <ScrollReveal y={40} delay={0.2}>
            <h1 id="hero-title" className="hero-title mb-6">
              <span className="hero-title-line block text-display-xl lg:text-display-2xl font-bold tracking-tight text-gradient">
                Das komplette
              </span>
              <span className="hero-title-line block text-display-xl lg:text-display-2xl font-bold tracking-tight text-gradient-cream">
                Bananen-Wissen
              </span>
              <span className="hero-title-line block text-display-xl lg:text-display-2xl font-bold tracking-tight">
                an einem Ort.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.4}>
            <p className="hero-subtitle text-body-lg lg:text-heading-sm text-muted-foreground max-w-2xl mx-auto mb-12 text-balance">
              Wissenschaftlich fundiert, visuell atemberaubend, komplett kostenlos.
              Entdecke Botanik, Ernährung, Anbau, Sorten, Geschichte & Kurioses rund um die beliebteste Frucht der Welt.
            </p>
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.6}>
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="xl" variant="primary" asChild>
                <Link href="/wissen">Wissen entdecken →</Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link href="/sorten">Sorten vergleichen</Link>
              </Button>
              <Button size="xl" variant="ghost" asChild>
                <Link href="/kurioses">Kurioses lesen</Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.8}>
            <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, i) => (
                <div key={stat.label} className="hero-stat relative">
                  <div className="bg-charcoal-900/50 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-500 hover:border-banana-500/30 hover:shadow-premium-lg">
                    <div className="text-display-lg lg:text-display font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-body-sm text-muted-foreground">{stat.label}</div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full bg-banana-500/50 blur" />
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal y={20} delay={1}>
            <div className="hero-marquee relative">
              <div className="overflow-hidden">
                <Marquee speed={30} gap={160} className="text-caption text-muted-foreground uppercase tracking-widest">
                  {marqueeItems.map((item, i) => (
                    <MarqueeItem key={i}>{item}</MarqueeItem>
                  ))}
                </Marquee>
              </div>
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-charcoal-950 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-charcoal-950 to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>

          <div className="scroll-indicator flex flex-col items-center gap-2 text-caption text-muted-foreground/50">
            <span className="uppercase tracking-widest">Scrollen zum Entdecken</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
