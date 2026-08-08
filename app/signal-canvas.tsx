"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; drift: number };

export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mountedCanvas = canvasRef.current;
    if (!mountedCanvas) return;

    const mountedContext = mountedCanvas.getContext("2d");
    if (!mountedContext) return;

    const canvas: HTMLCanvasElement = mountedCanvas;
    const context: CanvasRenderingContext2D = mountedContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let animationFrame = 0;
    let points: Point[] = [];

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(bounds.width * ratio);
      canvas.height = Math.floor(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.max(16, Math.floor(bounds.width / 68)) }, (_, index) => ({
        x: ((index * 97) % Math.max(bounds.width, 1)) + 8,
        y: ((index * 53) % Math.max(bounds.height, 1)) + 8,
        drift: index * 0.73,
      }));
    }

    function draw() {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(150, 255, 196, 0.13)";
      context.fillStyle = "rgba(208, 255, 233, 0.72)";
      context.lineWidth = 1;

      points.forEach((point, index) => {
        const offset = reducedMotion ? 0 : Math.sin(frame / 90 + point.drift) * 10;
        const x = point.x;
        const y = point.y + offset;
        const next = points[(index + 3) % points.length];
        const nextOffset = reducedMotion ? 0 : Math.sin(frame / 90 + next.drift) * 10;
        const distance = Math.hypot(x - next.x, y - (next.y + nextOffset));

        if (distance < Math.max(width * 0.34, 140)) {
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(next.x, next.y + nextOffset);
          context.stroke();
        }

        context.beginPath();
        context.arc(x, y, 1.65, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion) {
        frame += 1;
        animationFrame = requestAnimationFrame(draw);
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
