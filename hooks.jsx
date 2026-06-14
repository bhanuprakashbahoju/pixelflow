// Shared hooks + helpers
const { useEffect, useRef, useState, useCallback } = React;

// IntersectionObserver-driven reveal
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}

// Reveal wrapper component
function Reveal({ children, delay = 0, as: Tag = "div", className = "", style, ...rest }) {
  const [ref, shown] = useReveal();
  const cls = `reveal ${shown ? "is-in" : ""} ${delay ? `reveal-delay-${delay}` : ""} ${className}`.trim();
  return (
    <Tag ref={ref} className={cls} style={style} {...rest}>
      {children}
    </Tag>
  );
}

// Count-up number on first reveal
function CountUp({ end, decimals = 0, duration = 1600, suffix = "" }) {
  const [v, setV] = useState(0);
  const [ref, shown] = useReveal(0.4);
  useEffect(() => {
    if (!shown) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(eased * end);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, end, duration]);
  const display = decimals ? v.toFixed(decimals) : Math.round(v).toString();
  return <span ref={ref}>{display}{suffix}</span>;
}

// Custom cursor (and magnetic targets)
function useCursor() {
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    let tx = -100, ty = -100;
    let cx = -100, cy = -100;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target;
      const hover = t && t.closest && t.closest('a, button, [data-cursor="hover"], .cta, .svc-row, .cap, .ghost-link, .nav-cta, .email');
      cursor.classList.toggle("is-hover", !!hover);
    };
    const onDown = () => cursor.classList.add("is-down");
    const onUp = () => cursor.classList.remove("is-down");

    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cursor.remove();
    };
  }, []);
}

// Magnetic hover ref
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    const parent = el.parentElement;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

// Split words for staggered hero reveal
function SplitWords({ text, baseDelay = 0 }) {
  const words = String(text || "").split(" ");
  return (
    <span className="line">
      {words.map((w, i) => (
        <span className="word" key={i} style={{ "--i": baseDelay + i }}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

// London clock
function useLondonTime() {
  const [time, setTime] = useState(() => formatLondon());
  useEffect(() => {
    const id = setInterval(() => setTime(formatLondon()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
function formatLondon() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Europe/London"
    }).format(new Date());
  } catch (e) { return "—"; }
}

Object.assign(window, { useReveal, Reveal, CountUp, useCursor, useMagnetic, SplitWords, useLondonTime });
