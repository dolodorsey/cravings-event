"use client";
import { useState, useEffect, useRef } from "react";

// ─── DESIGN SYSTEM — CRAVINGS ─────────────────────────────────────────────────
// Aesthetic: "Ember Editorial" — premium culinary cinema meets festival flame
// Palette: near-black / charred orange / deep red / cream / warm bronze / herb green
const C = {
  base:     "#090704",
  surface:  "#0f0c08",
  panel:    "#161210",
  border:   "rgba(255,255,255,0.07)",
  ember:    "#C45A1A",
  emberGlow:"rgba(196,90,26,0.22)",
  red:      "#8B1A1A",
  cream:    "#F5EDDF",
  bone:     "#EDE4D5",
  bronze:   "#B07A30",
  herb:     "#3A5C2E",
  herbDim:  "rgba(58,92,46,0.3)",
  muted:    "rgba(245,237,223,0.48)",
  dim:      "rgba(245,237,223,0.28)",
};
const F = {
  display: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  sans:    "'DM Sans', 'Inter', system-ui, sans-serif",
  mono:    "'DM Mono', monospace",
};

function useInView(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v] as const;
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ transform: v ? "translateY(0)" : "translateY(44px)", opacity: v ? 1 : 0, transition: `all 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}
function Grain() {
  return <div style={{ position: "absolute", inset: 0, opacity: 0.038, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />;
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: sc ? "12px clamp(20px,4vw,60px)" : "24px clamp(20px,4vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: sc ? "rgba(9,7,4,0.97)" : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? `1px solid ${C.border}` : "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <div>
        <span style={{ fontFamily: F.display, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 700, fontStyle: "italic", color: C.cream, letterSpacing: "0.02em", display: "block" }}>Cravings</span>
        <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.3em", color: C.ember, textTransform: "uppercase" }}>Culinary Festival · ATL</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2vw,32px)", alignItems: "center" }}>
        {["Taste", "Vendors", "Experience"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = C.cream} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = C.muted}>{n}</a>
        ))}
        <a href="#tickets" style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.cream, background: C.ember, border: "none", padding: "10px 24px", cursor: "pointer", textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}>Get Tickets</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: C.base, display: "flex", alignItems: "flex-end" }}>
      {/* Ember atmosphere */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Primary fire glow from bottom center */}
        <div style={{ position: "absolute", bottom: "-15%", left: "50%", transform: "translateX(-50%)", width: "140%", height: "90%", background: `radial-gradient(ellipse at ${mousePos.x * 100}% 100%, ${C.emberGlow} 0%, rgba(139,26,26,0.15) 35%, transparent 65%)`, transition: "background 0.8s ease-out" }} />
        {/* Side ember glows */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: `radial-gradient(ellipse at 0% 70%, rgba(196,90,26,0.1) 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `radial-gradient(ellipse at 100% 60%, rgba(176,122,48,0.08) 0%, transparent 55%)` }} />
        {/* Smoke texture lines */}
        {[10, 25, 45, 65, 80].map(y => (
          <div key={y} style={{ position: "absolute", left: 0, right: 0, top: `${y}%`, height: "1px", background: `linear-gradient(90deg, transparent, ${C.ember}14, transparent)` }} />
        ))}
        <Grain />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,7,4,0.97) 0%, rgba(9,7,4,0.5) 45%, rgba(9,7,4,0.15) 100%)" }} />

      {/* Floating ember particles */}
      {[...Array(16)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: `${1 + i % 3}px`, height: `${1 + i % 3}px`, borderRadius: "50%", background: i % 3 === 0 ? C.ember : i % 3 === 1 ? C.bronze : C.red, left: `${8 + i * 5.5}%`, top: `${25 + (i % 5) * 12}%`, opacity: 0.2 + (i % 4) * 0.15, animation: `ember${i % 3} ${4 + i % 5}s ease-in-out infinite ${i * 0.4}s` }} />
      ))}

      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 clamp(24px,5vw,80px) clamp(64px,8vh,100px)", maxWidth: "1600px", margin: "0 auto" }}>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: C.ember, marginBottom: "28px" }}>
          A Culinary Festival Series · Atlanta
        </div>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(64px,13vw,190px)", fontWeight: 800, fontStyle: "italic", lineHeight: 0.88, letterSpacing: "-0.01em", color: C.cream, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(60px)", transition: "all 1.3s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
            Come
          </h1>
          <div style={{ display: "flex", alignItems: "baseline", gap: "24px", flexWrap: "wrap" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(64px,13vw,190px)", fontWeight: 800, fontStyle: "italic", lineHeight: 0.88, letterSpacing: "-0.01em", color: C.ember, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(60px)", transition: "all 1.3s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
              Hungry.
            </h1>
          </div>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px,8vw,120px)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, letterSpacing: "-0.01em", color: C.bronze, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(60px)", transition: "all 1.3s cubic-bezier(0.16,1,0.3,1) 0.8s" }}>
            Leave Obsessed.
          </h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "32px" }}>
          <p style={{ fontFamily: F.sans, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.8, color: C.muted, maxWidth: "440px", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}>
            A culinary festival series serving flavor, culture, and unforgettable food experiences. Rotating editions. Every one hits different.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s" }}>
            <a href="#tickets" style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: C.ember, padding: "15px 48px", textDecoration: "none", display: "inline-block" }}>Get Tickets</a>
            <a href="#vendors" style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "15px 36px", textDecoration: "none", display: "inline-block" }}>Become a Vendor</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ember0 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-24px) scale(0.7)} }
        @keyframes ember1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-16px) scale(0.8)} }
        @keyframes ember2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-32px) scale(0.6)} }
      `}</style>
    </section>
  );
}

// ─── MORE THAN A FOOD FEST ────────────────────────────────────────────────────
function MoreThan() {
  return (
    <section id="taste" style={{ background: C.surface, padding: "120px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${C.emberGlow} 0%, transparent 55%)` }} />
      <Grain />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <Reveal>
            <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "20px" }}>More Than a Food Fest</div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,5.5vw,76px)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.0, color: C.cream, marginBottom: "28px" }}>
              A rotating<br />culinary<br /><em style={{ color: C.ember }}>universe.</em>
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.9, color: C.muted, marginBottom: "36px" }}>
              CRAVINGS is not limited to one food world. Each edition celebrates a different culinary culture: desserts, crawfish, tacos, chef-driven concepts, international street food, and more. Same standard. Different flavor.
            </p>
            <div style={{ display: "flex", gap: "40px" }}>
              {[["100+", "Vendors"], ["10+", "Editions"], ["ATL", "Home Base"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,52px)", fontStyle: "italic", fontWeight: 700, color: C.ember, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.dim, marginTop: "6px" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Culinary atmosphere visual */}
            <div style={{ position: "relative", height: "540px", background: C.panel, overflow: "hidden" }}>
              <Grain />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 90%, ${C.emberGlow} 0%, transparent 55%)` }} />
              {/* Flame effect layers */}
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", bottom: `${i * 8}%`, left: `${25 + i * 10}%`, width: `${60 - i * 15}%`, height: "35%", background: `radial-gradient(ellipse at 50% 100%, ${i === 0 ? C.ember + "40" : i === 1 ? C.red + "25" : C.bronze + "15"}, transparent 60%)`, transform: "scaleY(-1)" }} />
              ))}
              {/* Steam columns */}
              {[30, 50, 70].map(x => (
                <div key={x} style={{ position: "absolute", bottom: "20%", left: `${x}%`, width: "2px", height: "40%", background: `linear-gradient(to top, rgba(245,237,223,0.15), transparent)`, borderRadius: "2px" }} />
              ))}
              <div style={{ position: "absolute", bottom: "24px", left: "24px", fontFamily: F.display, fontSize: "14px", fontStyle: "italic", color: C.bronze }}>Every edition has a flavor.</div>
              <div style={{ position: "absolute", top: "20px", right: "20px", fontFamily: F.mono, fontSize: "9px", color: C.ember, letterSpacing: "0.3em", textTransform: "uppercase" }}>ATL · 2026</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── EVERY EDITION HAS A FLAVOR ───────────────────────────────────────────────
const FLAVORS = [
  { n: "Desserts", emoji: "🍰", d: "Premium pastry, cakes, frozen treats, confections" },
  { n: "Crawfish & Seafood", emoji: "🦞", d: "Boils, platters, raw bars, coastal flavors" },
  { n: "Tacos & Street", emoji: "🌮", d: "International street food at festival scale" },
  { n: "Global Cuisine", emoji: "🌍", d: "Pan-African, Caribbean, Asian fusion, Latin" },
  { n: "Chef-Driven", emoji: "👨🏾‍🍳", d: "Atlanta's best chefs, curated menus, live cooking" },
  { n: "Food Trucks", emoji: "🚚", d: "ATL's most popular trucks, all in one place" },
  { n: "Specialty Bites", emoji: "🍢", d: "Unique, niche, and hard-to-find indulgences" },
  { n: "Drink Pairings", emoji: "🥂", d: "Craft cocktails, mocktails, local brews" },
];
function FlavorGrid() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section style={{ background: C.base, padding: "120px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "12px" }}>What You&apos;ll Taste</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,80px)", fontStyle: "italic", fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: "64px" }}>Every Edition<br />Has a Flavor</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", background: C.border }}>
          {FLAVORS.map((f, i) => (
            <div key={f.n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ background: hover === i ? C.panel : C.surface, padding: "32px 28px", cursor: "default", transition: "background 0.3s", position: "relative", overflow: "hidden" }}>
              {hover === i && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${C.emberGlow}, transparent 60%)` }} />}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.emoji}</div>
                <div style={{ fontFamily: F.display, fontSize: "clamp(16px,1.8vw,22px)", fontStyle: "italic", fontWeight: 600, color: hover === i ? C.cream : C.muted, marginBottom: "8px", transition: "color 0.3s" }}>{f.n}</div>
                <div style={{ fontFamily: F.sans, fontSize: "12px", color: hover === i ? C.dim : "rgba(245,237,223,0.2)", transition: "color 0.3s", lineHeight: 1.6 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FULL-SENSORY EXPERIENCE ──────────────────────────────────────────────────
function FullSensory() {
  const moments = ["Live DJs & Music", "Stylish Crowd", "Tasting Zones", "Content Moments", "Fire & Grill Visuals", "Sponsor Activations"];
  return (
    <section id="experience" style={{ background: C.surface, padding: "120px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "5%", top: "5%", fontFamily: F.display, fontSize: "clamp(100px,16vw,260px)", fontStyle: "italic", fontWeight: 800, lineHeight: 1, color: "rgba(255,255,255,0.015)", pointerEvents: "none", whiteSpace: "nowrap" }}>CRAVINGS</div>
      <Grain />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "12px" }}>The Full Experience</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,80px)", fontStyle: "italic", fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: "64px" }}>A Full-Sensory<br />Experience</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <Reveal>
              <p style={{ fontFamily: F.sans, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.9, color: C.muted, marginBottom: "40px" }}>
                CRAVINGS is more than eating. It is culture, community, music, and fire. A full-production food festival designed for discovery, content, and unforgettable flavors.
              </p>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {moments.map((m, i) => (
                <Reveal key={m} delay={i * 0.06}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 20px", background: C.panel, borderLeft: `2px solid ${C.ember}` }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.ember, flexShrink: 0 }} />
                    <div style={{ fontFamily: F.sans, fontSize: "14px", fontWeight: 500, color: C.cream }}>{m}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2}>
            {/* Visual grid of food moments */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
              {[C.emberGlow, C.herbDim, "rgba(176,122,48,0.25)", "rgba(139,26,26,0.2)"].map((bg, i) => (
                <div key={i} style={{ height: "200px", background: C.panel, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${bg}, transparent 65%)` }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.01) 10px, rgba(255,255,255,0.01) 11px)" }} />
                  <div style={{ position: "absolute", bottom: "12px", left: "12px", fontFamily: F.mono, fontSize: "8px", color: C.ember, opacity: 0.6, letterSpacing: "0.25em" }}>
                    {["FIRE", "FRESH", "CRAFT", "CULTURE"][i]}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── VENDOR CTA ───────────────────────────────────────────────────────────────
function VendorCTA() {
  return (
    <section id="vendors" style={{ background: C.ember, padding: "100px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.25), transparent 70%)" }} />
      <Grain />
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: `${C.cream}80`, marginBottom: "20px" }}>Vendor Applications</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,80px)", fontStyle: "italic", fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: "20px" }}>Bring Your<br />Flavor to the Fest</h2>
          <p style={{ fontFamily: F.sans, fontSize: "16px", lineHeight: 1.85, color: `${C.cream}CC`, maxWidth: "480px", margin: "0 auto 44px" }}>
            We curate vendors with quality, presence, and cultural relevance. Food trucks, chefs, pop-ups, specialty producers — apply to join CRAVINGS.
          </p>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Cravings Vendor Application" style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.ember, background: C.cream, padding: "18px 56px", textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}>Apply as Vendor</a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── TICKETS ──────────────────────────────────────────────────────────────────
// ─── TICKET DATA ─────────────────────────────────────────────────────────────
const HUGLIFE_TICKET_HUB = "https://huglife.vercel.app/#tickets";

function Tickets() {
  return (
    <section id="tickets" style={{
      background: C.base, padding: "100px clamp(24px,5vw,80px)",
      position: "relative", overflow: "hidden",
    }}>
      <Grain />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.ember}25, transparent 55%)` }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "16px" }}>
            Tickets & Access
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "32px", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,88px)", fontWeight: 600, lineHeight: 0.9, letterSpacing: "0.03em", color: C.cream }}>
              GET IN THE ROOM
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: C.muted, maxWidth: "360px" }}>
              Each edition sells out. Secure your entry early and come hungry.
            </p>
          </div>
        </Reveal>

        {/* ── PRIMARY TICKET CTA ── */}
        <Reveal delay={0.1}>
          <div style={{
            background: `linear-gradient(135deg, ${C.ember}15, transparent)`,
            border: `1px solid ${C.ember}30`,
            padding: "48px 40px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "32px",
            marginBottom: "3px",
          }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "8px" }}>
                Culinary Festival · Atlanta
              </div>
              <div style={{ fontFamily: F.display, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600, color: C.cream, marginBottom: "6px" }}>
                CRAVINGS
              </div>
              <div style={{ fontFamily: F.body, fontSize: "13px", color: C.muted }}>
                Multiple dates — 2026
              </div>

              {/* Live indicator */}
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#4ADE80", boxShadow: "0 0 8px #4ADE80",
                  animation: "ticketPulse 2s ease-in-out infinite",
                }} />
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.3em", color: "#4ADE80", textTransform: "uppercase" }}>
                  Tickets On Sale Now
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={HUGLIFE_TICKET_HUB}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: F.body, fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#080808", background: C.ember,
                  padding: "18px 48px", textDecoration: "none", display: "inline-block",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"}
              >
                Buy Tickets →
              </a>
              <a
                href={"mailto:thekollectiveworldwide@gmail.com?subject=Cravings Vendor Application"}
                style={{
                  fontFamily: F.body, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.cream, background: "transparent",
                  border: `1px solid ${C.border}`,
                  padding: "18px 36px", textDecoration: "none", display: "inline-block",
                  transition: "all 0.3s",
                }}
              >
                Vendor Application
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── GROUP / ADDITIONAL OPTIONS ── */}
        <Reveal delay={0.2}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px",
            background: C.border,
          }}>
            {[
              { icon: "👥", title: "Group Tickets", sub: "10+ people", cta: "Inquire", href: "mailto:thekollectiveworldwide@gmail.com?subject=Group Ticket Inquiry - CRAVINGS" },
              { icon: "🏢", title: "Corporate / Private", sub: "Buyouts & private events", cta: "Inquire", href: "mailto:thekollectiveworldwide@gmail.com?subject=Corporate Inquiry - CRAVINGS" },
              { icon: "🤝", title: "Sponsor / Partner", sub: "Brand activation", cta: "Inquire", href: "mailto:thekollectiveworldwide@gmail.com?subject=Sponsor Inquiry - CRAVINGS" },
            ].map((opt, i) => (
              <a key={opt.title} href={opt.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: C.surface,
                  padding: "28px 24px",
                  display: "flex", flexDirection: "column", gap: "8px",
                  transition: "background 0.3s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${C.ember}12`}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ""}
                >
                  <div style={{ fontSize: "20px" }}>{opt.icon}</div>
                  <div style={{ fontFamily: F.body, fontSize: "13px", fontWeight: 600, color: C.cream }}>{opt.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: "11px", color: C.muted }}>{opt.sub}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.ember, marginTop: "4px" }}>{opt.cta} →</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Trust signals */}
        <div style={{ marginTop: "32px", display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {["Powered by Eventbrite", "Secure Checkout", "Instant Confirmation", "All Ages Welcome"].map(s => (
            <div key={s} style={{ fontFamily: F.mono, fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>{s}</div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticketPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is CRAVINGS?", a: "A rotating culinary festival series in Atlanta. Each edition celebrates a different food culture — desserts, crawfish, tacos, chef pop-ups, and more." },
  { q: "When and where?", a: "Atlanta, GA. Dates and venues announced per edition. Follow @thekollectiveworldwide for drops." },
  { q: "How do vendors apply?", a: "Email us at the vendor inquiry link above. We review quality, concept, and presentation." },
  { q: "Is it family-friendly?", a: "Yes. Most editions are all-ages. Evening editions may have 21+ areas." },
  { q: "Is there parking?", a: "Yes. Paid parking on-site and nearby. Rideshare recommended for larger editions." },
  { q: "Can I bring my own food?", a: "Outside food is not permitted. We want you to experience everything we&apos;ve curated." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: C.surface, padding: "100px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Reveal><div style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,64px)", fontStyle: "italic", fontWeight: 700, color: C.cream, marginBottom: "48px" }}>FAQ</div></Reveal>
        {FAQS.map((f, i) => (
          <div key={f.q} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: "16px" }}>
              <span style={{ fontFamily: F.display, fontSize: "clamp(15px,2vw,21px)", fontStyle: "italic", color: open === i ? C.cream : C.muted, textAlign: "left", transition: "color 0.3s" }}>{f.q}</span>
              <span style={{ fontFamily: F.sans, fontSize: "20px", color: C.ember, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.8, color: C.dim, paddingBottom: "24px" }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#060402", borderTop: `1px solid ${C.border}`, padding: "56px clamp(24px,5vw,80px) 36px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px" }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: "32px", fontStyle: "italic", fontWeight: 700, color: C.cream, marginBottom: "8px" }}>Cravings</div>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.3em", color: C.ember }}>CULINARY FESTIVAL · ATLANTA</div>
          <p style={{ fontFamily: F.sans, fontSize: "12px", color: C.muted, marginTop: "12px", maxWidth: "260px", lineHeight: 1.7 }}>A KHG HugLife Event. Come hungry. Leave obsessed.</p>
        </div>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {[{ h: "Festival", l: ["Taste", "Vendors", "Experience", "FAQ"] }, { h: "Connect", l: ["Get Tickets", "Vendor Apply", "@thekollectiveworldwide", "Contact"] }].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.ember, marginBottom: "16px" }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.l.map(item => <li key={item} style={{ fontFamily: F.sans, fontSize: "12px", color: C.muted }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "1400px", margin: "32px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>© 2026 Cravings. A KHG Enterprise.</div>
        <div style={{ fontFamily: F.mono, fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Privacy · Terms</div>
      </div>
    </footer>
  );
}

export default function Cravings() {
  return (
    <div style={{ background: C.base }}>
      <Nav /><Hero /><MoreThan /><FlavorGrid /><FullSensory /><VendorCTA /><Tickets /><FAQ /><Footer />
    </div>
  );
}
