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
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UniversityCarousel } from "@/components/harness/university-carousel";
import { PixelIcon, type IconName } from "@/components/hustly/pixel-icon";

/* ── Data ── */

const pains = [
  {
    title: "Você paga IA mas ela não sabe seu curso nem sua fase",
    description:
      "ChatGPT, Claude, Gemini ou Perplexity... eles respondem qualquer coisa, mas não sabem que você está no 3º semestre de Direito e já viu Constitucional. A Hustly sabe.",
  },
  {
    title: "Você explica tudo de novo a cada pergunta, toda vez",
    description:
      "Com IA genérica você precisa reexplicar seu contexto em cada mensagem. A Hustly lembra do seu histórico, seu nível e seu jeito de aprender.",
  },
  {
    title: "Você usa IA pra estudar mas não tem rotina nem progresso",
    description:
      "IA sozinha não cria hábito. A Hustly junta IA que te conhece com Meu Dia, streak e trilha personalizada. Estudo que vira progresso real, não só respostas soltas.",
  },
];

const faqItems = [
  {
    question: "Já uso ChatGPT, Claude, Gemini ou Perplexity. Por que preciso da Hustly?",
    answer:
      "Porque a Hustly sabe seu curso, sua fase e o que você já dominou. O ChatGPT, Claude, Gemini ou Perplexity não sabem: você precisa reexplicar tudo a cada pergunta. A Hustly já sabe quem você é.",
  },
  {
    question: "Preciso pagar pra usar a Hustly?",
    answer:
      "Não. A Hustly é um benefício para alunos Ânima, 100% gratuita. Diferente de IAs pagas, aqui você não precisa de assinatura.",
  },
  {
    question: "Funciona pro meu curso?",
    answer:
      "Sim. A Hustly se adapta ao seu curso, perfil e objetivos. Cada trilha é única: ela aprende com seu histórico.",
  },
  {
    question: "O que são os coins e como eu ganho?",
    answer:
      "Coins são a moeda da Hustly. Você ganha estudando, mantendo o streak e completando o Desafio do Dia, e troca por benefícios reais como Spotify, Amazon Prime Student e cupons de desconto.",
  },
  {
    question: "A Hustly tem comunidade?",
    answer:
      "Tem. É um espaço só da sua turma, organizado por temas como carreira, dúvidas e dicas de veterano. Assuntos administrativos continuam no portal oficial da universidade.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer:
      "Pode. A experiência é mobile-first, perfeita pra usar no intervalo, no ônibus ou em casa.",
  },
  {
    question: "Como faço login?",
    answer:
      "Use sempre o botão Login Universidade com seu RA ou e-mail institucional e a senha do Ulife.",
  },
];

const testimonials = [
  {
    avatar: "",
    name: "Ana Beatriz",
    role: "Direito · 1º semestre · Mackenzie",
    quote:
      "Eu usava ChatGPT, Claude, Gemini ou Perplexity pra estudar, mas toda hora tinha que explicar que era Direito, que era 1º semestre... A Hustly já sabe. É como ter uma monitora que te conhece.",
    result: "7 dias de streak",
  },
  {
    avatar: "",
    name: "Lucas Martins",
    role: "Engenharia · 2º semestre · Insper",
    quote:
      "A diferença é que a Hustly não me dá uma resposta genérica: ela conecta com o que eu já vi na trilha. Parece que ela estudou comigo o semestre todo.",
    result: "Lv 12 em 3 semanas",
  },
  {
    avatar: "",
    name: "Marina Costa",
    role: "Medicina · 1º semestre · IBMEC",
    quote:
      "Cancelei minha assinatura de IA paga. A Hustly faz a mesma coisa, melhor, porque sabe meu curso, e ainda tem streak e rotina. De graça.",
    result: "820 coins acumulados",
  },
  {
    avatar: "",
    name: "Pedro Henrique",
    role: "Administração · 3º semestre · Inteli",
    quote:
      "O nivelamento mostrou onde eu tava travando e a Hustly ajustou as explicações pro meu nível. Nenhuma IA genérica faz isso: elas não te conhecem.",
    result: "+50 XP por estudo",
  },
];

const screens = [
  {
    videoSrc: "/videos/Habilidades.mp4",
    alt: "IA copiloto ajudando o aluno a desenvolver habilidades para o dia a dia da faculdade",
    title: "Copiloto de habilidades",
    caption: "A IA que te ajuda a desenvolver as habilidades certas para o dia a dia da faculdade, com orientação prática e personalizada.",
  },
  {
    videoSrc: "/videos/Ferramentas.mp4",
    alt: "Ferramentas de estudo, produção acadêmica e carreira com IA",
    title: "Ferramentas que destravam seu dia",
    caption: "Hustly Flow para foco, Explica do Meu Jeito, Gabarita Prova, Monta Trabalho, Guia de Carreira IA e muito mais — tudo num só lugar.",
  },
  {
    videoSrc: "/videos/Beneficios.mp4",
    alt: "Marketplace de benefícios onde moedas viram recompensas reais",
    title: "Marketplace de benefícios",
    caption: "Quanto mais você usa a plataforma, mais coins você acumula. Troque por Spotify, Amazon Prime Student, Dell e outros benefícios reais.",
  },
];

type ToolGroup = {
  label: string;
  tools: { icon: IconName; name: string; desc: string }[];
};

const toolGroups: ToolGroup[] = [
  {
    label: "Aprendizagem & Estudos",
    tools: [
      { icon: "spiral", name: "Hustly Flow", desc: "Entra em estado de foco pra estudar de verdade, sem distração." },
      { icon: "lightbulb", name: "Explica do Meu Jeito", desc: "Analogias personalizadas pro conteúdo finalmente fazer sentido." },
      { icon: "bolt", name: "Destrava Matéria", desc: "Simplifica o conteúdo mais complexo na hora que você trava." },
      { icon: "quiz", name: "Gabarita Prova", desc: "Questões de treino personalizadas antes da sua avaliação." },
    ],
  },
  {
    label: "Trabalhos & Produção",
    tools: [
      { icon: "book", name: "Monta Trabalho", desc: "Estrutura seu trabalho acadêmico do zero em minutos." },
      { icon: "cards", name: "Referência Certa", desc: "Resolve suas formatações em normas ABNT sem dor de cabeça." },
    ],
  },
  {
    label: "Carreira & Futuro",
    tools: [
      { icon: "rocket", name: "Guia de Carreira IA", desc: "Salários, empresas que contratam e competências do seu campo." },
      { icon: "target", name: "Match de Carreira", desc: "Compara o seu perfil com as carreiras que mais combinam." },
      { icon: "case", name: "Foto Profissional IA", desc: "Transforma uma selfie em um retrato executivo pronto pro LinkedIn." },
    ],
  },
  {
    label: "Mentoria & Carreira",
    tools: [
      { icon: "chat", name: "Oráculo", desc: "Converse com mentores de IA inspirados em grandes nomes da história." },
    ],
  },
];

type Benefit = { icon: IconName; name: string; desc: string; cost: string };

const benefits: Benefit[] = [
  {
    icon: "case",
    name: "Dell",
    desc: "Desconto em notebooks e equipamentos para estudante.",
    cost: "Cupom exclusivo",
  },
  {
    icon: "heart",
    name: "Spotify",
    desc: "Plano universitário com preço especial pra sua playlist de estudo.",
    cost: "100 coins",
  },
  {
    icon: "gift",
    name: "Amazon Prime Student",
    desc: "Frete rápido, Prime Video e ofertas com acesso facilitado.",
    cost: "150 coins",
  },
  {
    icon: "book",
    name: "BeConfident",
    desc: "Desafio de inglês de 21 dias pra destravar o idioma.",
    cost: "200 coins",
  },
];

/* ── Page ── */

export default function Home() {
  return (
    <>
      {/* Skip link — a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-lp-cta focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* 1. Scroll progress (fixed) */}
      <ScrollProgress />

      {/* 2. Header sticky */}
      <Header />

      {/* 2b. University carousel — social proof */}
      <UniversityCarousel />

      {/* 3-11. Main content */}
      <main id="main">
        {/* 3. Hero */}
        <Hero />

        {/* 4. PainList */}
        <PainList pains={pains} />

        {/* 5. CountUp (proof — cream break) */}
        <section id="proof" className="scroll-mt-16 bg-hustly-cream px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="lp-eyebrow mb-3 text-hustly-purple">Prova real</p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-hustly-purple-ink sm:text-4xl md:text-5xl">
                Alunos que trocaram IA genérica pela <span className="text-gradient-purple">sua IA</span>.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <CountUp
                to={4000}
                suffix="+"
                label="Alunos já na Hustly"
                sublabel="Em instituições de ensino em todo o Brasil"
              />
              <CountUp
                to={47}
                label="Trilhas de estudo personalizadas"
                sublabel="Uma pra cada curso"
              />
            </div>
          </div>
        </section>

        {/* 6. FeatureCards — dark gradient section */}
        <section id="features" className="relative scroll-mt-16 overflow-hidden bg-gradient-dark py-20 text-white md:py-28 grain">
          <div className="pointer-events-none absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-hustly-purple/40 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-hustly-lime/20 blur-[120px]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mb-14 text-center">
              <p className="lp-eyebrow mb-3 text-hustly-lime">Por que não só o ChatGPT, Claude, Gemini ou Perplexity?</p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                A Hustly é a <span className="text-gradient-lime">sua IA</span>. Não uma IA qualquer.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <FeatureCard
                icon={<PixelIcon name="route" size={32} className="text-hustly-lime" accentClassName="fill-hustly-lime" />}
                title="Ela sabe seu curso e sua fase"
                description="A Hustly conhece sua trilha, o que você já viu e o que vem depois. Não precisa reexplicar contexto: ela já sabe quem você é."
              />
              <FeatureCard
                icon={<PixelIcon name="brain" size={32} className="text-hustly-lime" accentClassName="fill-hustly-lime" />}
                title="Memória de aprendizado"
                description="Quanto mais você usa a Hustly no lugar do ChatGPT, Claude, Gemini ou Perplexity, mais ela entende como seu cérebro funciona e como você aprende, e traz as melhores respostas com os melhores modelos. E você não paga nada por isso."
                highlight
                badge="novo"
              />
              <FeatureCard
                icon={<PixelIcon name="gift" size={32} className="text-hustly-lime" accentClassName="fill-hustly-lime" />}
                title="Benefícios que só a Hustly tem"
                description="Descontos e vantagens exclusivas para estudantes Ânima. Além de aprender melhor, você ainda economiza de verdade, sem pagar assinatura de IA."
                href="#beneficios"
              />
            </div>
          </div>
        </section>

        {/* 6b. Ferramentas de IA — cream break */}
        <section id="ferramentas" className="scroll-mt-16 bg-hustly-cream px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="lp-eyebrow mb-3 text-hustly-purple">O que você desbloqueia</p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-hustly-purple-ink sm:text-4xl md:text-5xl">
                Uma IA pra cada parte da sua <span className="text-gradient-purple">vida acadêmica</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-hustly-purple-ink/70">
                Não é um chat genérico. São ferramentas que sabem seu curso, sua fase e o seu jeito de aprender.
              </p>
            </div>
            <div className="space-y-10">
              {toolGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-hustly-purple">
                    {group.label}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {group.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="rounded-2xl border border-hustly-purple-ink/10 bg-white p-5 shadow-soft transition-transform hover:-translate-y-1"
                      >
                        <PixelIcon name={tool.icon} size={28} className="text-hustly-purple" accentClassName="fill-hustly-lime" />
                        <h4 className="mt-3 font-display text-base font-bold text-hustly-purple-ink">{tool.name}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-hustly-purple-ink/70">{tool.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PlatformPreview */}
        <PlatformPreview screens={screens} />

        {/* 8. TestimonialCarousel (cream break) */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* 8b. Benefícios / parcerias — dark gradient section */}
        <section id="beneficios" className="relative scroll-mt-16 overflow-hidden bg-gradient-dark py-20 text-white md:py-28 grain">
          <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-hustly-lime/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-hustly-purple/40 blur-[120px]" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <p className="lp-eyebrow mb-3 text-hustly-lime">Estudar tem recompensa</p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ganhe <span className="text-gradient-lime">coins</span> estudando e troque por benefícios reais.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Cada estudo, streak e desafio do dia vira coin. Use pra desbloquear descontos e parcerias exclusivas pra estudante.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div key={b.name} className="glass-dark flex flex-col rounded-2xl p-5">
                  <PixelIcon name={b.icon} size={28} className="text-hustly-lime" accentClassName="fill-hustly-lime" />
                  <h3 className="mt-3 font-display text-base font-bold text-white">{b.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{b.desc}</p>
                  <span className="mt-4 inline-flex w-fit items-center rounded-full bg-hustly-lime/15 px-3 py-1 text-xs font-bold text-hustly-lime">
                    {b.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <div id="faq" className="scroll-mt-16">
          <FAQ items={faqItems} defaultOpen={0} />
        </div>

        {/* 10. FinalCTA (cream break) */}
        <div id="final-cta" className="scroll-mt-16">
          <FinalCTA />
        </div>

        {/* 11. Footer */}
        <Footer />
      </main>

      {/* 12. StickyCTA (fixed) — esconde quando FinalCTA visível */}
      <StickyCTA />
    </>
  );
}