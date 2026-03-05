declare module 'ogl' {
  export class Renderer {
    constructor(options?: {
      alpha?: boolean;
      antialias?: boolean;
      dpr?: number;
      width?: number;
      height?: number;
      canvas?: HTMLCanvasElement;
    });
    gl: WebGLRenderingContext & {
      canvas: HTMLCanvasElement;
      clearColor: (r: number, g: number, b: number, a: number) => void;
    };
    setSize: (width: number, height: number) => void;
    render: (options: { scene: Mesh }) => void;
  }

  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms?: Record<string, { value: unknown }>;
        transparent?: boolean;
        depthTest?: boolean;
      }
    );
    uniforms: Record<string, { value: unknown }>;
  }

  export class Mesh {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        geometry: Triangle;
        program: Program;
      }
    );
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }
}

