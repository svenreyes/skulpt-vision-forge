
import React, { useEffect, useRef } from "react";

export function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let wWidth = window.innerWidth;
    let wHeight = window.innerHeight;
    let noiseData: ImageData[] = [];
    let frame = 0;
    let loopTimeout: number;

    // ① Fill the noiseData array with 10 frames of random black pixels
    const createNoise = () => {
      if (!ctx) return;
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }

      noiseData.push(idata);
    };

    // ② Paint the current noise frame onto the canvas
    const paintNoise = () => {
      if (!ctx) return;
      ctx.putImageData(noiseData[frame], 0, 0);
      frame = frame === 9 ? 0 : frame + 1;
    };

    // ③ Animation loop: requestAnimationFrame at ~25fps
    const loop = () => {
      paintNoise();
      loopTimeout = window.setTimeout(() => {
        requestAnimationFrame(loop);
      }, 1000 / 25);
    };

    // ④ Handle resizing: rebuild noiseData at new dimensions
    let resizeThrottle: number;
    const onResize = () => {
      clearTimeout(resizeThrottle);
      resizeThrottle = window.setTimeout(() => {
        clearTimeout(loopTimeout);
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        canvas.width = wWidth;
        canvas.height = wHeight;
        noiseData = [];
        for (let i = 0; i < 10; i++) createNoise();
        loop();
      }, 200);
    };

    // ⑤ Initial setup
    canvas.width = wWidth;
    canvas.height = wHeight;
    for (let i = 0; i < 10; i++) createNoise();
    loop();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(loopTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="noise"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.25,
      }}
    />
  );
}
