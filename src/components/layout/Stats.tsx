"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const statItems = [
  {
    value: 1247,
    suffix: "+",
    label: "Wissenschaftliche Artikel",
    desc: "Peer-reviewed & verständlich aufbereitet",
    icon: "file-text",
    color: "banana",
  },
  {
    value: 52,
    suffix: "",
    label: "Bananen-Sorten dokumentiert",
    desc: "Von Cavendish bis Blue Java",
    icon: "leaf",
    color: "cream",
  },
  {
    value: 15,
    suffix: "+",
    label: "Jahre Forschungs-Archiv",
    desc: "Seit 2009 kuratiert & erweitert",
    icon: "calendar",
    color: "banana",
  },
  {
    value: 2800000,
    suffix: "+",
    label: "Monatliche Leser",
    desc: "Weltweit & wachsend",
    icon: "users",
    color: "cream",
  },
  {
    value: 100,
    suffix: "%",
    label: "Kostenlos & Werbefrei",
    desc: "Keine Paywalls, kein Tracking",
    icon: "shield",
    color: "banana",
  },
  {
    value: 47,
    suffix: "",
    label: "Länder mit Experten",
    desc: "Globales Netzwerk aus Forschern",
    icon: "globe",
    color: "cream",
  },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      statItems.forEach((item, i) => {
        const el = sectionRef.current?.querySelector(`[data-stat="${i}"]`)
        if (!el) return

        const target = item.value
        const obj = { val: 0 }

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2.5,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.floor(obj.val).toLocaleString("de-DE") + item.suffix
              },
            })
          },
          once: true,
        })
      })

      gsap.fromTo(
        ".stat-card",
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

      gsap.to(".stats-glow", {
        scale: 1.2,
        opacity: 0.15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative section-premium overflow-hidden"
      aria-labelledby="stats-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="stats-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-banana-500/10 blur-3xl" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-cream-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-banana-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="container-premium relative">
        <ScrollReveal y={40} delay={0.1} className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="stats-title" className="text-display-lg lg:text-display font-bold text-gradient mb-4">
            Zahlen, die
            <span className="text-gradient-cream"> für sich sprechen</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Hinter jedem Wert steht echte Forschung, echte Leidenschaft und die Mission,
            Bananen-Wissen für alle zugänglich zu machen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statItems.map((item, i) => (
            <ScrollReveal key={item.label} y={40} delay={0.2 + i * 0.08} className="stat-card">
              <div
                className="relative group bg-charcoal-900/50 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-500 hover:border-banana-500/30 hover:shadow-premium-lg hover:scale-[1.02]"
                data-stat={i}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
                  item.color === "banana"
                    ? "bg-banana-500/20 border border-banana-500/30 text-banana-400"
                    : "bg-cream-400/20 border border-cream-400/30 text-cream-300"
                )}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {item.icon === "file-text" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {item.icon === "leaf" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    )}
                    {item.icon === "calendar" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                    {item.icon === "users" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                    {item.icon === "shield" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {item.icon === "globe" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    )}
                  </svg>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-display-lg lg:text-display font-bold text-foreground" data-stat={i}>0{item.suffix}</span>
                </div>

                <h3 className="text-heading-sm font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-body-sm text-muted-foreground">{item.desc}</p>

                <div className={cn(
                  "absolute top-6 right-6 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  item.color === "banana" ? "bg-banana-500/20" : "bg-cream-400/20"
                )} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={40} delay={0.8} className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
              <div className="bg-charcoal-900/50 px-6 py-2 text-caption text-muted-foreground uppercase tracking-widest">Vertraut von</div>
              <div className="flex items-center gap-6 lg:gap-10 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-body-sm font-medium text-foreground">Max Planck Institut</span>
                <span className="text-body-sm font-medium text-foreground">FAO</span>
                <span className="text-body-sm font-medium text-foreground">Uni Hohenheim</span>
                <span className="text-body-sm font-medium text-foreground">CIRAD</span>
                <span className="text-body-sm font-medium text-foreground">Bioversity Intl.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
