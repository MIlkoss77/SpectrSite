import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Nebula {
  x: number;
  y: number;
  rx: number;
  ry: number;
  color: string;
  opacity: number;
}

export default function MilkyWayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let scrollY = 0;
    let prevScrollY = 0;
    let scrollVelocity = 0;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const stars: Star[] = [];
    const nebulas: Nebula[] = [];
    const STAR_COUNT = 1000;
    const NEBULA_COUNT = 4;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 3,
          z: Math.random(),
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.5 + 0.5,
        });
      }
    }

    function initNebulas() {
      nebulas.length = 0;
      const colors = [
        "0, 255, 255",
        "0, 227, 150",
        "0, 255, 255",
        "0, 227, 150",
      ];
      for (let i = 0; i < NEBULA_COUNT; i++) {
        nebulas.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 2,
          rx: 200 + Math.random() * 300,
          ry: 150 + Math.random() * 200,
          color: colors[i],
          opacity: 0.03 + Math.random() * 0.03,
        });
      }
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      // Background
      ctx!.fillStyle = "#050505";
      ctx!.fillRect(0, 0, w, h);

      // Update scroll
      scrollY = window.scrollY;
      scrollVelocity = scrollVelocity * 0.95 + (scrollY - prevScrollY) * 0.05;
      prevScrollY = scrollY;
      time += 0.016;

      const velocityFactor = Math.min(Math.abs(scrollVelocity) / 20, 1);

      // Draw nebulas
      for (const nebula of nebulas) {
        const ny = ((nebula.y - scrollY * 0.05) % (h * 3)) - h;
        const nx = nebula.x + (mouseX - w / 2) * 0.01;
        const grad = ctx!.createRadialGradient(nx, ny, 0, nx, ny, nebula.rx);
        grad.addColorStop(0, `rgba(${nebula.color}, ${nebula.opacity + velocityFactor * 0.02})`);
        grad.addColorStop(1, `rgba(${nebula.color}, 0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(nx - nebula.rx, ny - nebula.ry, nebula.rx * 2, nebula.ry * 2);
      }

      // Draw stars
      for (const star of stars) {
        const depthSpeed = 0.1 + star.z * 0.5;
        const sy = ((star.y - scrollY * depthSpeed + (mouseY - h / 2) * star.z * 0.02) % (h * 3));
        const normalizedY = sy < -h ? sy + h * 3 : sy;
        const sx = star.x + (mouseX - w / 2) * star.z * 0.02;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        // Warp effect
        const stretch = 1 + velocityFactor * star.z * 3;

        ctx!.save();
        ctx!.translate(sx, normalizedY);
        ctx!.scale(1, stretch);

        // Star color shifts toward cyan during warp
        const cyanMix = velocityFactor * star.z * 0.5;
        const r = Math.floor(255 * (1 - cyanMix) + 0 * cyanMix);
        const g = Math.floor(255 * (1 - cyanMix) + 255 * cyanMix);
        const b = Math.floor(255);

        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(0, 0, star.size * (1 + velocityFactor * 0.5), 0, Math.PI * 2);
        ctx!.fill();

        // Glow for brighter stars
        if (star.size > 1.5) {
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
          ctx!.beginPath();
          ctx!.arc(0, 0, star.size * 4 * (1 + velocityFactor), 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.restore();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    initNebulas();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initStars();
      initNebulas();
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
