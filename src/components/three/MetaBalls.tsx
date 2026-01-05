import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface MetaBallsProps {
  color?: string;
  cursorBallColor?: string;
  speed?: number;
  ballCount?: number;
  className?: string;
}

const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uCursorColor;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uBallCount;
  uniform float uEnableCursor;

  // Smooth metaball function
  float metaball(vec2 p, vec2 center, float radius) {
    float d = length(p - center);
    return radius * radius / (d * d + 0.0001);
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect * 2.0;
    vec2 mouse = (uMouse - 0.5) * aspect * 2.0;
    
    float sum = 0.0;
    
    // Cursor following ball - only if enabled (disabled on mobile)
    if (uEnableCursor > 0.5) {
      sum += metaball(p, mouse, 0.06);
    }
    
    // Multiple floating blobs with independent organic motion
    for (float i = 0.0; i < 30.0; i++) {
      if (i >= uBallCount) break;
      
      // Each ball has unique movement pattern
      float t = uTime * 0.4;
      float uniqueOffset = i * 2.399; // Golden angle for distribution
      
      // Organic floating motion - each ball moves independently
      vec2 pos = vec2(
        sin(t * 0.7 + uniqueOffset) * 0.6 + cos(t * 0.3 + i * 0.5) * 0.3,
        cos(t * 0.5 + uniqueOffset) * 0.5 + sin(t * 0.4 + i * 0.7) * 0.25
      );
      
      // Vary the size of each ball
      float size = 0.08 + 0.04 * sin(i * 1.7 + t * 0.2);
      
      sum += metaball(p, pos, size);
    }
    
    // Smooth threshold - no hard edges or outlines
    float blob = smoothstep(0.4, 0.5, sum);
    
    // Color based on cursor proximity (only if cursor enabled)
    vec3 finalColor = uColor;
    if (uEnableCursor > 0.5) {
      float mouseDist = length(p - mouse);
      float colorMix = smoothstep(0.8, 0.0, mouseDist);
      finalColor = mix(uColor, uCursorColor, colorMix * 0.3);
    }
    
// Output with soft alpha - very light
     gl_FragColor = vec4(finalColor, blob * 0.28);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0.59, 0.66, 0.73];
}

export default function MetaBalls({
  color = '#96a9bb',
  cursorBallColor = '#96a9bb',
  speed = 0.6,
  ballCount = 25,
  className = '',
}: MetaBallsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const colorRgb = hexToRgb(color);
    const cursorColorRgb = hexToRgb(cursorBallColor);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: colorRgb },
        uCursorColor: { value: cursorColorRgb },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uMouse: { value: [0.5, 0.5] },
        uBallCount: { value: ballCount },
        uEnableCursor: { value: isMobile ? 0.0 : 1.0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      program.uniforms.uResolution.value = [container.clientWidth, container.clientHeight];
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener('resize', resize);
    
    if (!isMobile) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    resize();

    let animationId: number;
    const animate = (time: number) => {
      if (!isMobile) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.25;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.25;
        program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      }

      program.uniforms.uTime.value = time * 0.001 * speed;

      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (!isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, [color, cursorBallColor, speed, ballCount]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}

