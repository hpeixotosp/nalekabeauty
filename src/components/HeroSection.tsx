"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Radial glow — top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-[55vh] opacity-[0.18]"
        style={{
          background: "radial-gradient(ellipse 600px 400px at 50% 0%, var(--primary), transparent)",
        }}
      />

      {/* Side lines */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-10 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-10 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full">
        {/* Eyebrow */}
        <p className="anim-1 text-[10px] tracking-[0.55em] uppercase text-muted-foreground mb-10">
          Nail Designer · Gel · Nail Art
        </p>

        {/* Display heading */}
        <h1
          className="anim-2 font-serif-display font-light text-foreground leading-none tracking-tight"
          style={{ fontSize: "clamp(5rem, 17vw, 11rem)" }}
        >
          Naleka
        </h1>

        {/* Gold italic sub-word */}
        <p
          className="anim-2 font-serif-display font-light italic text-primary leading-none"
          style={{ fontSize: "clamp(2.5rem, 9vw, 5.5rem)", marginTop: "-0.1em" }}
        >
          Beauty
        </p>

        {/* Ornament */}
        <div className="anim-3 flex items-center gap-4 my-10">
          <div className="h-px w-16 bg-border" />
          <div className="size-1.5 bg-primary rotate-45" />
          <div className="h-px w-16 bg-border" />
        </div>

        {/* Tag line */}
        <p className="anim-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Arte que transforma cada detalhe — sofisticação e elegância em cada atendimento.
        </p>

        {/* CTAs */}
        <div className="anim-5 flex flex-col sm:flex-row items-center gap-3 mt-10">
          <a
            href="#agendar"
            className={buttonVariants({
              className: "rounded-none h-11 px-9 text-[11px] tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:opacity-90 hover:bg-primary"
            })}
          >
            Agendar Horário
          </a>
          <a
            href="#servicos"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-none h-11 px-9 text-[11px] tracking-[0.22em] uppercase border-border text-muted-foreground hover:border-primary hover:text-primary"
            })}
          >
            Ver Serviços
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <ChevronDown
          className="size-4 text-muted-foreground animate-bounce"
          strokeWidth={1.5}
        />
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60">
          Explorar
        </p>
      </div>
    </section>
  );
}
