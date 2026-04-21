"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, CheckCircle } from "lucide-react";
import { SectionHeader } from "./ServicesSection";

const SERVICES = [
  { id: "alongamento", label: "Alongamento em Gel",  meta: "2h – 3h · R$ 120+" },
  { id: "nailart",     label: "Gel com Nail Art",    meta: "3h – 4h · R$ 180+" },
  { id: "manutencao",  label: "Manutenção em Gel",   meta: "1h30 – 2h · R$ 80+" },
  { id: "remocao",     label: "Remoção Segura",      meta: "1h · R$ 50+" },
];

const TIMES = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];

interface FormState {
  service: string; date: string; time: string;
  name: string; phone: string; email: string; notes: string;
}
const EMPTY: FormState = { service:"", date:"", time:"", name:"", phone:"", email:"", notes:"" };

export function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const set = (key: keyof FormState, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate1 = () => {
    if (!form.service) { setErrors({ service: "Selecione um serviço." }); return false; }
    return true;
  };
  const validate2 = () => {
    const e: Partial<FormState> = {};
    if (!form.date) e.date = "Informe a data.";
    if (!form.time) e.time = "Selecione um horário.";
    if (Object.keys(e).length) { setErrors(e); return false; }
    return true;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormState> = {};
    if (!form.name)  errs.name  = "Informe seu nome.";
    if (!form.phone) errs.phone = "Informe seu telefone.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const svc = SERVICES.find((s) => s.id === form.service);
    const msg = encodeURIComponent(
      `Olá! Quero agendar:\nServiço: ${svc?.label}\nData: ${form.date}\nHorário: ${form.time}\nNome: ${form.name}\nTel: ${form.phone}${form.notes ? `\nObs: ${form.notes}` : ""}`
    );
    window.open(`https://wa.me/5500000000000?text=${msg}`, "_blank");
    setDone(true);
  };

  const sel = SERVICES.find((s) => s.id === form.service);

  const steps = ["Serviço", "Data & Hora", "Seus Dados"];

  return (
    <section id="agendar" ref={ref} className="py-24 bg-muted/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">

          {/* Left — heading + stepper */}
          <div className="reveal flex flex-col gap-8">
            <SectionHeader
              eyebrow="Marque seu horário"
              title="Agendar Atendimento"
              body="Preencha o formulário rápido abaixo. Entraremos em contato pelo WhatsApp para confirmar."
            />

            {!done && (
              <div className="flex items-center gap-2">
                {steps.map((label, i) => {
                  const n = i + 1;
                  const active = step === n;
                  const past   = step > n;
                  return (
                    <div key={n} className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex size-7 items-center justify-center text-xs transition-colors border",
                          past   ? "bg-primary border-primary text-primary-foreground" :
                          active ? "border-primary text-primary" :
                                   "border-border text-muted-foreground"
                        )}
                      >
                        {past ? <Check className="size-3" strokeWidth={2.5} /> : n}
                      </div>
                      <span className={cn("text-[10px] tracking-wide hidden sm:block", active ? "text-foreground" : "text-muted-foreground")}>
                        {label}
                      </span>
                      {i < 2 && <div className={cn("h-px w-6", past ? "bg-primary" : "bg-border")} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right — Card form */}
          <div className="reveal">
            {done ? (
              <Card className="rounded-none border-border text-center">
                <CardContent className="flex flex-col items-center gap-4 pt-10 pb-10">
                  <div className="flex size-12 items-center justify-center border border-primary">
                    <CheckCircle className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif-display font-light text-2xl text-foreground mb-2">
                      Pedido Enviado
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Obrigada, <span className="text-foreground">{form.name}</span>! Entraremos em contato pelo WhatsApp para confirmar.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => { setForm(EMPTY); setStep(1); setDone(false); }}
                    className="rounded-none mt-2 text-[10px] tracking-[0.2em] uppercase"
                  >
                    Novo Agendamento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <Card className="rounded-none border-border">
                  <CardContent className="pt-8 pb-0 px-7">

                    {/* Step 1 — Service */}
                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                          Selecione o serviço
                        </p>
                        <RadioGroup
                          value={form.service}
                          onValueChange={(v) => set("service", v)}
                          className="flex flex-col gap-2"
                        >
                          {SERVICES.map((s) => (
                            <div
                              key={s.id}
                              className={cn(
                                "flex items-center gap-4 border p-4 cursor-pointer transition-colors",
                                form.service === s.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/40"
                              )}
                            >
                              <RadioGroupItem value={s.id} id={s.id} />
                              <Label htmlFor={s.id} className="flex flex-col gap-0.5 cursor-pointer flex-1">
                                <span className="text-sm text-foreground font-normal">{s.label}</span>
                                <span className="text-[10px] text-muted-foreground">{s.meta}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        {errors.service && (
                          <p className="text-xs text-destructive">{errors.service}</p>
                        )}
                      </div>
                    )}

                    {/* Step 2 — Date & Time */}
                    {step === 2 && (
                      <div className="flex flex-col gap-6">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                          Data e horário preferidos
                        </p>

                        <div className="flex flex-col gap-2">
                          <Label htmlFor="date" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            Data
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={form.date}
                            onChange={(e) => set("date", e.target.value)}
                            className="rounded-none h-11 bg-input border-border focus-visible:ring-ring text-foreground"
                          />
                          {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            Horário disponível
                          </Label>
                          <div className="grid grid-cols-4 gap-1">
                            {TIMES.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => set("time", t)}
                                className={cn(
                                  "py-2.5 text-xs tracking-wide border transition-colors",
                                  form.time === t
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-input text-muted-foreground hover:border-primary/60 hover:text-foreground"
                                )}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                          {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label htmlFor="notes" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            Observações (opcional)
                          </Label>
                          <Textarea
                            id="notes"
                            value={form.notes}
                            onChange={(e) => set("notes", e.target.value)}
                            placeholder="Ex: formato stiletto, referência de cor..."
                            className="rounded-none resize-none h-20 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3 — Contact */}
                    {step === 3 && (
                      <div className="flex flex-col gap-5">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                          Seus dados de contato
                        </p>

                        {/* Booking summary */}
                        <div className="border border-border bg-muted/30 p-4 flex flex-col gap-2">
                          <p className="text-[9px] tracking-[0.35em] uppercase text-primary mb-1">Resumo</p>
                          {[
                            ["Serviço", sel?.label],
                            ["Data", form.date || "—"],
                            ["Horário", form.time || "—"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{k}</span>
                              <span className="text-foreground">{v}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            Nome completo
                          </Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="Seu nome"
                            className="rounded-none h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                          />
                          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="phone" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                              WhatsApp
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              placeholder="(00) 00000-0000"
                              className="rounded-none h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                            />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                              E-mail (opcional)
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                              placeholder="seu@email.com"
                              className="rounded-none h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex items-center justify-between px-7 py-5 mt-5 border-t border-border">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setStep((s) => s - 1)}
                        className="rounded-none text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground h-auto px-0"
                      >
                        ← Voltar
                      </Button>
                    ) : <div />}

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={() => (step === 1 ? validate1() : validate2()) && setStep((s) => s + 1)}
                        className="rounded-none h-10 px-8 text-[10px] tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:opacity-90 hover:bg-primary"
                      >
                        Próximo →
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="rounded-none h-10 px-8 text-[10px] tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:opacity-90 hover:bg-primary"
                      >
                        Confirmar via WhatsApp
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
