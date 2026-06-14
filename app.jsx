// Main app
const TWEAK_DEFAULTS = {
  "mode": "light",
  "accent": "#2240ff",
  "showCursor": true,
  "marquee": true,
  "density": "comfortable"
};

const ACCENT_TO_OKLCH = {
  "#2240ff": "oklch(0.52 0.24 265)",
  "#d97757": "oklch(0.65 0.14 45)",
  "#1f8a5b": "oklch(0.58 0.13 155)",
  "#a855f7": "oklch(0.62 0.22 305)",
};

function App() {
  const useTweaksFn = window.useTweaks || ((d) => [d, () => {}]);
  const [tweaks, setTweak] = useTweaksFn(TWEAK_DEFAULTS);

  // Apply tweak values to :root
  React.useEffect(() => {
    document.documentElement.setAttribute("data-mode", tweaks.mode);
    const accent = ACCENT_TO_OKLCH[tweaks.accent] || tweaks.accent;
    document.documentElement.style.setProperty("--accent", accent);
    if (tweaks.density === "tight") {
      document.documentElement.style.setProperty("--hpad", "clamp(16px, 3vw, 40px)");
    } else if (tweaks.density === "airy") {
      document.documentElement.style.setProperty("--hpad", "clamp(24px, 6vw, 96px)");
    } else {
      document.documentElement.style.setProperty("--hpad", "clamp(20px, 4vw, 64px)");
    }
  }, [tweaks.mode, tweaks.accent, tweaks.density]);

  // Cursor on/off
  React.useEffect(() => {
    if (!tweaks.showCursor) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "";
    }
  }, [tweaks.showCursor]);

  useCursor();

  // Pause marquee
  React.useEffect(() => {
    document.querySelectorAll(".marquee").forEach((m) => m.classList.toggle("paused", !tweaks.marquee));
  }, [tweaks.marquee]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;
  const TweakColor = window.TweakColor;
  const TweakToggle = window.TweakToggle;

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <London />
      <Contact />
      <Footer />

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Theme">
            <TweakRadio
              label="Mode"
              value={tweaks.mode}
              options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]}
              onChange={(v) => setTweak("mode", v)}
            />
            <TweakColor
              label="Accent"
              value={tweaks.accent}
              options={["#2240ff", "#d97757", "#1f8a5b", "#a855f7"]}
              onChange={(v) => setTweak("accent", v)}
            />
            <TweakRadio
              label="Density"
              value={tweaks.density}
              options={[
                { label: "Tight", value: "tight" },
                { label: "Comfy", value: "comfortable" },
                { label: "Airy", value: "airy" },
              ]}
              onChange={(v) => setTweak("density", v)}
            />
          </TweakSection>
          <TweakSection label="Motion">
            <TweakToggle
              label="Custom cursor"
              value={tweaks.showCursor}
              onChange={(v) => setTweak("showCursor", v)}
            />
            <TweakToggle
              label="Marquee"
              value={tweaks.marquee}
              onChange={(v) => setTweak("marquee", v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
