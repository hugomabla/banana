"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Magnetic } from "@/components/animations/Magnetic"
import { Interactive3DCard, Banana3DScene } from "@/components/three/Banana3D"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ReactElement } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: "book-open",
    title: "Bananen-Wiki",
    desc: "Über 1.000 Artikel zu Botanik, Ernährung, Anbau, Sorten, Geschichte & Kurioses. Alle Inhalte wissenschaftlich geprüft und verständlich geschrieben.",
    href: "/wissen",
    color: "banana",
    highlight: "Neu: 3D-Botanik-Viewer",
  },
  {
    icon: "leaf",
    title: "Sorten-Datenbank",
    desc: "Vergleiche 50+ Bananensorten nach Geschmack, Nährwerten, Anbaugebieten, Resistenzen & Verfügbarkeit. Mit interaktiven Filtern & Favoriten.",
    href: "/sorten",
    color: "cream",
    highlight: "Vergleichstool inklusive",
  },
  {
    icon: "flask-conical",
    title: "Forschung & Wissenschaft",
    desc: "Zugang zu Studien, Papers & Feldversuchen. Filterbar nach Jahr, Thema, Institution & Relevanz. Monatlich neue Paper-Summaries.",
    href: "/wissenschaft",
    color: "banana",
    highlight: "Paper-Summaries monatlich",
  },
  {
    icon: "map",
    title: "Anbau-Weltkarte",
    desc: "Interaktive Karte mit Anbaugebieten, Klimadaten, Erntezeiten & Exportströmen. Live-Daten zu Ernteausfällen & Krankheitsausbrüchen.",
    href: "/anbau/karte",
    color: "cream",
    highlight: "Live-Krankheits-Radar",
  },
  {
    icon: "sparkles",
    title: "Kurioses & Fun Facts",
    desc: "Die unterhaltsamste Bananen-Sammlung: Mythen, Rekorde, Popkultur, Kunst, Weltraum-Bananen & warum Bananen radioaktiv sind.",
    href: "/kurioses",
    color: "banana",
    highlight: "Wöchentlich neue Facts",
  },
  {
    icon: "users",
    title: "Community & Forum",
    desc: "Tausche dich mit Experten, Hobbygärtnern & Bananen-Fans aus. Q&A, Saatgut-Tausch, Anbau-Tagebücher & regionale Treffen.",
    href: "/community",
    color: "cream",
    highlight: "Bald: Mentoren-Programm",
  },
]

const featureIcons: Record<string, ReactElement> = {
  "book-open": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "leaf": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    </svg>
  ),
  "flask-conical": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14.512a.94.94 0 11-1.88 0 .94.94 0 011.88 0zM14.97 8a.48.48 0 01.96 0l2 4a.49.49 0 01-.43.59H7.5a.48.48 0 01-.48-.47.5.5 0 01.11-.3l.4-.81A5 5 0 0112 3a5 5 0 014.9 4.89l.38.81a.5.5 0 01.11.3.48.48 0 01-.47.48H9.43a.49.49 0 01-.43-.59l2-4z" />
    </svg>
  ),
  "map": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "sparkles": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
  "users": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
}

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      gsap.fromTo(
        ".features-3d-scene",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )

      gsap.utils.toArray(".feature-card").forEach((card: any, i: number) => {
        gsap.to(card, {
          y: -10,
          duration: 3 + i * 0.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative section-premium overflow-hidden"
      aria-labelledby="features-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-banana-500/8 blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-cream-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-banana-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="container-premium relative">
        <ScrollReveal y={40} delay={0.1} className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 id="features-title" className="text-display-lg lg:text-display font-bold text-gradient mb-4">
            Alles, was du
            <span className="text-gradient-cream"> über Bananen</span>
            wissen musst
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Sechs spezialisierte Bereiche, eine Mission: Das vollständigste Bananen-Wissen
            der Welt – kostenlos, visuell, interaktiv.
          </p>
        </ScrollReveal>

        {isClient && (
          <div className="hidden lg:block features-3d-scene mb-16 lg:mb-0 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:translate-x-1/4 lg:w-[500px] lg:h-[500px] lg:z-0 pointer-events-none">
            <Banana3DScene />
          </div>
        )}

        <div className="relative lg:z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} y={40} delay={0.2 + i * 0.08} className="feature-card">
              <Magnetic strength={0.3}>
                <Card variant="glass" hover padding="lg" className="relative overflow-visible group h-full">
                  <CardHeader>
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110",
                      feature.color === "banana"
                        ? "bg-banana-500/20 border border-banana-500/30 text-banana-400"
                        : "bg-cream-400/20 border border-cream-400/30 text-cream-300"
                    )}>
                      {featureIcons[feature.icon]}
                    </div>
                    <CardTitle className="text-heading-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-body text-muted-foreground/80">{feature.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-caption font-medium px-3 py-1 rounded-full",
                        feature.color === "banana"
                          ? "bg-banana-500/20 text-banana-400 border border-banana-500/30"
                          : "bg-cream-400/20 text-cream-300 border border-cream-400/30"
                      )}>
                        {feature.highlight}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group-hover:text-banana-400 transition-colors"
                      >
                        <Link href={feature.href}>
                          Entdecken
                          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>

                  <div className={cn(
                    "absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    feature.color === "banana" ? "bg-banana-500/10" : "bg-cream-400/10"
                  )} />
                </Card>
              </Magnetic>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={40} delay={0.8} className="mt-16 lg:mt-20 text-center">
          <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-charcoal-900/50 border border-white/10 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-banana-500 animate-pulse" />
            <span className="text-body text-foreground">
              Mehr als 1.000 Artikel warten auf dich
            </span>
            <Button variant="primary" size="lg" asChild>
              <Link href="/wissen">Jetzt starten →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
