"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria",  label: "Galeria"  },
  { href: "#sobre",    label: "Sobre"    },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-baseline gap-2 no-underline text-foreground"
        >
          <span className="font-serif-display text-lg tracking-[0.12em] text-primary font-light">
            NALEKA
          </span>
          <span className="text-[9px] tracking-[0.45em] uppercase text-muted-foreground font-light">
            Beauty
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollTo("#agendar")}
            className="text-[10px] tracking-[0.2em] uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none h-8 px-5"
          >
            Agendar
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-primary rounded-none"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-background border-l border-border p-8">
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <p className="font-serif-display text-lg text-primary tracking-[0.12em] font-light">NALEKA</p>
                <p className="text-[9px] tracking-[0.45em] uppercase text-muted-foreground mt-0.5">Beauty</p>
              </div>
              <Separator />
              {[...NAV_LINKS, { href: "#agendar", label: "Agendar" }].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
