import { ScrollProgress } from "@/components/harness/scroll-progress";
import { Hero } from "@/components/harness/hero";
import { PainList } from "@/components/harness/pain-list";
import { CountUp } from "@/components/harness/count-up";
import { FeatureCard } from "@/components/harness/feature-card";
import { PlatformPreview } from "@/components/harness/platform-preview";
import { TestimonialCarousel } from "@/components/harness/testimonial-carousel";
import { FAQ } from "@/components/harness/faq";
import { FinalCTA } from "@/components/harness/final-cta";
import { StickyCTA } from "@/components/harness/sticky-cta";

/* ── Custom SVG icons (inline, não stock) ── */

function FireIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 4c2 4 6 6 6 12a6 6 0 0 1-12 0c0-2 1-3 2-4-1 4 4 6 4 2 0-4-2-6 0-10z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="6" r="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="6" cy="24" r="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="26" cy="24" r="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 9v5M16 14L8 21M16 14l8 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M10 6h12v8a6 6 0 0 1-12 0V6z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M10 8H6v2a4 4 0 0 0 4 4M22 8h4v2a4 4 0 0 1-4 4M13 20v4h-3v2h12v-2h-3v-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */

const pains = [
  {
    title: "Sua biblioteca virou cemitério de ideias nunca executadas",
    description: "Você salva, organiza, planeja, mas a execução nunca chega. O PDF fica lá, esperando.",
  },
  {
    title: "Você comprou curso de passive income e ainda vendeu R$ 0",
    description: "Assistiu todos os módulos, fez todas as anotações. O extrato continua o mesmo.",
  },
  {
    title: "Toda semana você assiste a mais um módulo, e nada muda",
    description: "Sensação de progresso sem progresso real. Consumir conteúdo não é executar.",
  },
];

const faqItems = [
  {
    question: "Preciso pagar pra usar a Hustly?",
    answer: "Não. A Hustly é um benefício para alunos Ânima, 100% gratuita pra você.",
  },
  {
    question: "Funciona pro meu curso?",
    answer: "Sim. A Hustly se adapta ao seu curso, perfil e objetivos. Cada jornada é única.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer: "Pode. A experiência é mobile-first, perfeita pra usar no intervalo, no ônibus ou em casa.",
  },
  {
    question: "Quanto tempo leva pra começar?",
    answer: "Poucos minutos. Faz o onboarding, o nivelamento e sua trilha já é liberada.",
  },
  {
    question: "Como faço login?",
    answer: "Use sempre o botão Login Universidade com seu RA/e-mail institucional e a senha do Ulife.",
  },
];

const testimonials = [
  {
    avatar: "",
    name: "Ana Beatriz",
    role: "Direito · 1º semestre",
    quote: "Comecei a usar antes das aulas e cheguei no primeiro dia entendendo a matéria. A Hustly explica do meu jeito.",
    result: "+7 dias de streak",
  },
  {
    avatar: "",
    name: "Lucas Martins",
    role: "Engenharia · 2º semestre",
    quote: "O nivelamento me mostrou exatamente onde eu tava travando. Em uma semana minha rotina de estudo mudou.",
    result: "Lv 12 em 3 semanas",
  },
  {
    avatar: "",
    name: "Marina Costa",
    role: "Medicina · 1º semestre",
    quote: "A streak virou vício bom. Estudar todo dia deixou de ser peso e virou parte da minha rotina.",
    result: "820 coins",
  },
];

const screens = [
  {
    videoSrc: "/videos/Habilidades.mp4",
    alt: "Dashboard com próxima ação e métricas de progresso",
    title: "Dashboard",
    caption: "Próxima ação + métricas em tempo real",
  },
  {
    videoSrc: "/videos/Ferramentas.mp4",
    alt: "Trilha de aprendizagem com checkpoints e progresso visual",
    title: "Trilha de aprendizagem",
    caption: "Steps com checkpoints do seu jeito",
  },
  {
    videoSrc: "/videos/Beneficios.mp4",
    alt: "Feed da comunidade com outros alunos executando desafios",
    title: "Comunidade",
    caption: "Veja outros alunos na mesma semana que você",
  },
];

/* ── Page ── */

export default function HarnessPage() {
  return (
    <>
      <ScrollProgress />

      {/* Skip link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-lp-cta focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* 1. Hero */}
      <section id="hero" className="scroll-mt-0">
        <Hero />
      </section>

      {/* 2. PainList */}
      <section className="scroll-mt-4">
        <PainList pains={pains} />
      </section>

      {/* 3. CountUp (proof — cream break) */}
      <section id="proof" className="bg-lp-cream px-4 py-24 scroll-mt-4 md:py-32">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="lp-eyebrow mb-3 text-lp-cta">Prova real</p>
            <h2 className="lp-h2 text-lp-text-dark">Não é promessa. É o que já está acontecendo.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <CountUp
              to={1247}
              suffix="+"
              label="Alunos ativos em execução"
              sublabel="Universidade Ânima"
            />
            <CountUp
              to={247890}
              format="currency-brl"
              label="Resultados gerados pela comunidade"
              sublabel="Este mês"
            />
          </div>
        </div>
      </section>

      {/* 4. FeatureCards */}
      <section className="bg-lp-bg px-4 py-24 scroll-mt-4 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="lp-eyebrow mb-3 text-lp-accent">Como funciona</p>
            <h2 className="lp-h2 text-lp-text">Três formas de sair do zero, no seu ritmo.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<FireIcon />}
              title="Aprenda fazendo"
              description="47 aulas curtas + desafio de execução ao final de cada uma. Nada de PDF esquecido."
            />
            <FeatureCard
              icon={<NetworkIcon />}
              title="Comunidade que executa"
              description="Veja outros alunos na mesma semana que você, saia da bolha isolada."
              highlight
              badge="novo"
            />
            <FeatureCard
              icon={<TrophyIcon />}
              title="Mostre resultado"
              description="Publicar resultado é parte do método, não extra. XP, streak e mapa de evolução."
              href="#proof"
            />
          </div>
        </div>
      </section>

      {/* 5. PlatformPreview */}
      <section className="scroll-mt-4">
        <PlatformPreview screens={screens} />
      </section>

      {/* 6. TestimonialCarousel (cream break) */}
      <section className="scroll-mt-4">
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* 7. FAQ */}
      <section className="scroll-mt-4">
        <FAQ items={faqItems} defaultOpen={0} />
      </section>

      {/* 8. FinalCTA (cream break) */}
      <section className="scroll-mt-4">
        <FinalCTA />
      </section>

      {/* Footer spacer for sticky CTA */}
      <div className="h-24 bg-lp-bg md:hidden" />

      {/* Sticky CTA + ScrollProgress are fixed */}
      <StickyCTA />
    </>
  );
}