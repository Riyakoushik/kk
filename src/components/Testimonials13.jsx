import React from "react";
import { cn } from "@/lib/utils";

// 8 Company Brand Marks (Enlarged with bolder icons & typography)
const LogoFluentgrid = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <rect x="6" y="11" width="12" height="12" rx="3" fill="#06b6d4" />
    <rect x="22" y="11" width="12" height="12" rx="3" fill="#0891b2" />
    <rect x="6" y="27" width="12" height="12" rx="3" fill="#0284c7" />
    <rect x="22" y="27" width="12" height="12" rx="3" fill="#0369a1" />
    <text x="44" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">FLUENTGRID</text>
  </svg>
);

const LogoImaginnovate = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <path d="M8 38L20 12L32 38H8ZM20 22L14 34H26L20 22Z" fill="#f97316" />
    <text x="40" y="31" fill="#ffffff" fontSize="17" fontWeight="800" letterSpacing="0.01em" fontFamily="Manrope, sans-serif">IMAGINNOVATE</text>
  </svg>
);

const LogoMouriTech = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <circle cx="16" cy="25" r="7" fill="#8b5cf6" />
    <circle cx="32" cy="16" r="5.5" fill="#a855f7" />
    <circle cx="32" cy="34" r="5.5" fill="#6366f1" />
    <line x1="16" y1="25" x2="32" y2="16" stroke="#8b5cf6" strokeWidth="2.5" />
    <line x1="16" y1="25" x2="32" y2="34" stroke="#8b5cf6" strokeWidth="2.5" />
    <text x="46" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">MOURI TECH</text>
  </svg>
);

const LogoInspiredge = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <polygon points="20,10 33,25 20,40 7,25" fill="none" stroke="#10b981" strokeWidth="3" />
    <circle cx="20" cy="25" r="4" fill="#10b981" />
    <text x="42" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">INSPIREDGE</text>
  </svg>
);

const LogoRSNGinfo = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <ellipse cx="20" cy="16" rx="12" ry="4.5" fill="#38bdf8" />
    <ellipse cx="20" cy="25" rx="12" ry="4.5" fill="#0284c7" />
    <ellipse cx="20" cy="34" rx="12" ry="4.5" fill="#0369a1" />
    <text x="42" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">RSN GINFO</text>
  </svg>
);

const LogoNyros = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <path d="M10 16C10 16 19 10 28 16C28 16 28 34 19 38C10 34 10 16 10 16Z" fill="none" stroke="#e11d48" strokeWidth="3" />
    <circle cx="19" cy="24" r="3.5" fill="#e11d48" />
    <text x="42" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">NYROS TECH</text>
  </svg>
);

const LogoAmzur = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <rect x="8" y="13" width="22" height="22" rx="5" fill="none" stroke="#3b82f6" strokeWidth="3" />
    <path d="M14 24L18 28L25 19" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="40" y="32" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.02em" fontFamily="Manrope, sans-serif">AMZUR</text>
  </svg>
);

const LogoSajix = (props) => (
  <svg viewBox="0 0 220 50" fill="currentColor" {...props}>
    <path d="M6 25H13L17 14L23 36L27 25H34" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="44" y="32" fill="#ffffff" fontSize="19" fontWeight="800" letterSpacing="0.03em" fontFamily="Manrope, sans-serif">SAJIX</text>
  </svg>
);

// Custom User Profile SVG Avatar based on vecteezy profile silhouette
const UserProfileAvatar = ({ color = "#38bdf8", name }) => (
  <div
    className="relative w-11 h-11 rounded-full flex items-center justify-center border border-white/15 ring-2 ring-white/5 shrink-0 overflow-hidden"
    style={{
      background: `linear-gradient(135deg, ${color}22 0%, #151515 100%)`,
    }}
  >
    {/* Inner subtle glow */}
    <div
      className="absolute inset-0 opacity-25 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${color} 0%, transparent 70%)`,
      }}
    />
    <svg
      viewBox="0 0 100 100"
      className="w-7 h-7 relative z-10"
      fill="currentColor"
    >
      {/* Head circle */}
      <circle cx="50" cy="34" r="18" fill="#e2e8f0" />
      {/* Curved torso matching exact silhouette */}
      <path
        d="M20 78 C20 63, 33 55, 50 55 C67 55, 80 63, 80 78 C80 88, 67 92, 50 92 C33 92, 20 88, 20 78 Z"
        fill={color}
      />
    </svg>
  </div>
);

const testimonials = [
  {
    id: 1,
    name: "Suresh Babu",
    designation: "Mid-level Software Engineer (Smart City Utility Data)",
    company: "Fluentgrid Limited",
    tag: "Smart Meter Ingestion Pipeline",
    testimonial:
      "Suggested a Redis + Kafka streaming stack and built a load-simulation harness for safe testing. Deployed an AI auto-scaling agent—cutting ingestion lag from 45 minutes to sub-second.",
    accentColor: "#06b6d4",
    logo: LogoFluentgrid,
  },
  {
    id: 2,
    name: "Ravi Teja",
    designation: "Senior Backend Engineer (Logistics & MongoDB)",
    company: "Imaginnovate Techsolutions",
    tag: "Fleet Tracking Aggregation Lag",
    testimonial:
      "Redesigned query orchestration with a read/write segregation harness and introduced an AI predictive scaling agent. Slashed CPU usage from 94% to 28% without touching our code.",
    accentColor: "#f97316",
    logo: LogoImaginnovate,
  },
  {
    id: 3,
    name: "Mahesh Reddy",
    designation: "Enterprise Integration Lead",
    company: "MOURI Tech",
    tag: "Legacy Middleware Bottleneck",
    testimonial:
      "Mapped a modern event-driven stack (Kafka + Debezium), built a validation harness for corrupt messages, and designed an AI retry orchestrator. Achieved 100% integration success with zero data loss.",
    accentColor: "#8b5cf6",
    logo: LogoMouriTech,
  },
  {
    id: 4,
    name: "Venkat Rao",
    designation: "AI/ML Developer (Agentic AI & X10D Framework)",
    company: "Inspiredge IT Solutions",
    tag: "Autonomous Agent Fallbacks",
    testimonial:
      "Architected agent guardrails with a stateful evaluation harness and deterministic fallback routing. Boosted agent task success rates from 64% to 98.5% through better orchestration.",
    accentColor: "#10b981",
    logo: LogoInspiredge,
  },
  {
    id: 5,
    name: "Naveen Kumar",
    designation: "Systems Architect / Performance Engineer",
    company: "RSN GINFO Solutions",
    tag: "Flash-Sale Concurrency Crisis",
    testimonial:
      "Proposed a Redis caching layer, built a high-concurrency testing harness, and deployed an AI pre-warming agent. Handled our biggest Diwali traffic surge without a single crash.",
    accentColor: "#38bdf8",
    logo: LogoRSNGinfo,
  },
  {
    id: 6,
    name: "Pavan Kalyan",
    designation: "Junior Full-Stack Developer (Ruby on Rails / DevOps)",
    company: "Nyros Technologies",
    tag: "Zero-Downtime Docker/CI Rescue",
    testimonial:
      "Recommended a containerized stack (Docker + Puma tuning), built a staging-validation harness, and designed an AI rollback agent. Fixed our broken deployment pipeline in one evening.",
    accentColor: "#e11d48",
    logo: LogoNyros,
  },
  {
    id: 7,
    name: "Srinivas Goud",
    designation: "QA Manager / Legacy Modernization Lead",
    company: "Amzur Technologies",
    tag: "Regression Automation Overhaul",
    testimonial:
      "Suggested a microservices test isolation stack, built a parallel-execution harness, and added an AI flakiness-detection agent. Cut regression test time from 11 hours to just 35 minutes.",
    accentColor: "#3b82f6",
    logo: LogoAmzur,
  },
  {
    id: 8,
    name: "Rajesh Naidu",
    designation: "Java Full Stack Developer (Product Development)",
    company: "Sajix Software Solutions",
    tag: "Spring Boot & Angular Memory Leaks",
    testimonial:
      "Recommended a Prometheus + Grafana observability stack, built a session-simulation harness, and designed an AI health-check agent. Permanently closed the memory leak cycle affecting EHR sessions.",
    accentColor: "#6366f1",
    logo: LogoSajix,
  },
];

function TestimonialCard({ item }) {
  const Logo = item.logo;

  return (
    <div className="flex flex-col odd:flex-col-reverse w-[370px] sm:w-[410px] shrink-0 gap-3">
      {/* Testimonial Quote Box with strict equal height and flex column alignment */}
      <div className="relative flex flex-col justify-between h-[230px] rounded-2xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#121212]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <UserProfileAvatar color={item.accentColor} name={item.name} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-[15px] leading-tight truncate">
                  {item.name}
                </span>
              </div>
              <span className="text-xs text-neutral-400 leading-tight block truncate">
                {item.designation} · <strong className="text-neutral-300 font-medium">{item.company}</strong>
              </span>
            </div>
          </div>

          {/* Challenge/Outcome Tag */}
          <div className="mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">{item.tag}</span>
          </div>
        </div>

        <p className="text-[13.5px] leading-relaxed text-neutral-300 font-normal line-clamp-4">
          &ldquo;{item.testimonial}&rdquo;
        </p>
      </div>

      {/* Decorative Grid / Logo Backdrop Tile with fixed height and crisp alignment */}
      <div className="relative flex h-[150px] w-full items-center justify-center p-6 overflow-hidden rounded-2xl border border-white/10 bg-[#080808]">
        <Logo className="h-12 sm:h-14 max-w-[240px] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Subtle geometric dot/line background pattern matching hero-42 texture */}
        <div
          className="absolute inset-0 isolate -z-1 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}

export default function Testimonials13() {
  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-20 blur-[130px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 xl:px-12 mb-14">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-widest text-neutral-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            Crisis & Timeline Rescues
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white font-manrope md:whitespace-nowrap">
            When Timelines Crunch & Systems Break
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            Real stories from engineering leads, founders, and teams who called when products stalled, latency surged, or launch deadlines were impossible.
          </p>
        </div>
      </div>

      {/* Seamless Dual-Track Infinite Marquee */}
      <div className="relative w-full overflow-hidden mask-edge-fade group flex select-none">
        <div className="flex shrink-0 items-center gap-5 pr-5 [--duration:45s] animate-marquee-endless group-hover:[animation-play-state:paused]">
          {testimonials.map((t) => (
            <TestimonialCard key={`track1-${t.id}`} item={t} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-5 pr-5 [--duration:45s] animate-marquee-endless group-hover:[animation-play-state:paused]" aria-hidden="true">
          {testimonials.map((t) => (
            <TestimonialCard key={`track2-${t.id}`} item={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
