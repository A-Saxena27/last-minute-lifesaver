"use client";

import { useEffect, useRef } from "react";

export default function OrbitalLifeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const vertex = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position,0.0,1.0);
      }
    `;

    const fragment = `
      precision mediump float;

      varying vec2 v_uv;
      uniform float u_time;

      void main() {
        vec2 center = vec2(0.5);
        float d = distance(v_uv, center);

        float glow = 0.04 / d;

        float ring =
          smoothstep(
            0.01,
            0.0,
            abs(d - 0.35 + sin(u_time * 2.0) * 0.02)
          );

        vec3 color =
          vec3(0.2,0.5,1.0) * glow +
          vec3(0.0,0.8,1.0) * ring;

        gl_FragColor = vec4(color,1.0);
      }
    `;

    function shader(type: number, source: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, source);
      gl!.compileShader(s);
      return s;
    }

    const program = gl.createProgram()!;

    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer()!;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");

    let frame = 0;

    const animate = (time: number) => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform1f(uTime, time * 0.001);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[600px]">
      <div className="relative w-80 h-80">
        <canvas ref={canvasRef} className="w-full h-full rounded-full" />

        <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-pulse" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs uppercase tracking-widest text-blue-300">
            Stability
          </span>

          <span className="text-5xl font-bold text-blue-400">89.4%</span>

          <span className="text-xs uppercase text-blue-200">Optimal Range</span>
        </div>
      </div>
    </div>
  );
}
