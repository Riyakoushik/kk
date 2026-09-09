import React, { useEffect, useRef } from 'react';
import './Hero42Section.css';

export default function Hero42Section() {
  const containerRef = useRef(null);

  useEffect(() => {
    // WebGL2 Dot Matrix shader runner
    const perlinVertexShader = `#version 300 es
in vec2 uv;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0., 1.);
}`;

    const perlinFragmentShader = `#version 300 es
precision mediump float;
uniform float uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uValue;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv = (uv - 0.5) * vec2(aspect, 1.0) + 0.5;
  float hue = abs(snoise(vec3(uv * uFrequency, uTime * uSpeed)));
  vec3 rainbowColor = hsv2rgb(vec3(hue, 1.0, uValue));
  fragColor = vec4(rainbowColor, 1.0);
}`;

    const dotVertexShader = `#version 300 es
in vec2 uv;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0., 1.);
}`;

    const dotFragmentShader = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform int uPaletteCount;
uniform vec3 uPalette[10];
uniform float uPaletteA[10];
uniform float uCellSize;
uniform float uGamma;
uniform float uPaletteBias;
out vec4 fragColor;

void main() {
  vec2 pix = gl_FragCoord.xy;
  float cell = max(uCellSize, 1.0);

  vec2 cellIdx = floor(pix / cell);
  vec2 cellCenter = (cellIdx + 0.5) * cell;
  vec3 col = texture(uTexture, cellCenter / uResolution.xy).rgb;
  float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;
  gray = pow(clamp(gray, 0.0001, 1.0), uGamma);

  vec2 cellUV = fract(pix / cell) - 0.5;
  float dist = length(cellUV);
  float radius = 0.45 * clamp(gray, 0.15, 1.0);
  float mark = 1.0 - smoothstep(radius - 0.05, radius + 0.05, dist);

  if (mark <= 0.001 || uPaletteCount == 0) {
    fragColor = vec4(0.0);
    return;
  }

  float t = clamp(gray + uPaletteBias, 0.0, 0.9999) * float(uPaletteCount - 1);
  int i0 = int(floor(t));
  float frac = fract(t);

  vec3 outRgb = mix(uPalette[i0], uPalette[i0 + 1], frac);
  float outA = mix(uPaletteA[i0], uPaletteA[i0 + 1], frac) * mark;
  fragColor = vec4(outRgb * outA, outA);
}`;

    const MAX_COLORS = 10;
    const DEFAULTS = { frequency: 1, speed: 6, cellSize: 12, gamma: 4, paletteBias: 10 };

    function parseColorToRgba(input) {
      if (!input || !input.trim()) return { r: 0, g: 0, b: 0, a: 0 };
      const str = input.trim();
      const hex = str.replace(/^#/, '');
      if (hex.length === 8) {
        return {
          r: parseInt(hex.slice(0, 2), 16) / 255,
          g: parseInt(hex.slice(2, 4), 16) / 255,
          b: parseInt(hex.slice(4, 6), 16) / 255,
          a: parseInt(hex.slice(6, 8), 16) / 255,
        };
      }
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16) / 255,
          g: parseInt(hex.slice(2, 4), 16) / 255,
          b: parseInt(hex.slice(4, 6), 16) / 255,
          a: 1,
        };
      }
      return { r: 1, g: 1, b: 1, a: 1 };
    }

    const mapLinear = (v, inMin, inMax, outMin, outMax) => outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
    const mapFrequency = (ui) => mapLinear(ui, 1, 10, 0.3, 6);
    const mapSpeed = (ui) => ui * 0.05;
    const mapCellSize = (ui) => mapLinear(ui, 1, 100, 6, 60);
    const mapGamma = (ui) => mapLinear(ui, 1, 20, 0.5, 8);
    const mapPaletteBias = (ui) => ui * 0.05;

    function compile(gl, type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    function link(gl, vsSrc, fsSrc) {
      const p = gl.createProgram();
      gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vsSrc));
      gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
      gl.linkProgram(p);

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const attrs = [
        ['position', new Float32Array([-1, -1, 3, -1, -1, 3])],
        ['uv', new Float32Array([0, 0, 2, 0, 0, 2])],
      ];
      for (let i = 0; i < attrs.length; i++) {
        const loc = gl.getAttribLocation(p, attrs[i][0]);
        if (loc < 0) continue;
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, attrs[i][1], gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      }
      gl.bindVertexArray(null);
      return { program: p, vao };
    }

    const instances = [];
    let rafId = null;
    let lastTime = 0;

    function create(canvas) {
      const gl = canvas.getContext('webgl2', {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
        depth: false,
      });
      if (!gl) return null;

      const perlin = link(gl, perlinVertexShader, perlinFragmentShader);
      const dot = link(gl, dotVertexShader, dotFragmentShader);
      const u = (prog, name) => gl.getUniformLocation(prog, name);

      const colors = (canvas.dataset.colors || '')
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .slice(0, MAX_COLORS);

      const rgb = new Float32Array(MAX_COLORS * 3);
      const alpha = new Float32Array(MAX_COLORS);
      for (let i = 0; i < colors.length; i++) {
        const c = parseColorToRgba(colors[i]);
        rgb[i * 3] = c.r;
        rgb[i * 3 + 1] = c.g;
        rgb[i * 3 + 2] = c.b;
        alpha[i] = c.a;
      }

      const num = (key) => {
        const v = parseFloat(canvas.dataset[key]);
        return isFinite(v) ? v : DEFAULTS[key];
      };
      const seed = parseFloat(canvas.dataset.seed) || 0;

      const rtTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, rtTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rtTex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      gl.disable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);

      gl.useProgram(dot.program);
      gl.uniform1i(u(dot.program, 'uTexture'), 0);
      gl.uniform1i(u(dot.program, 'uPaletteCount'), colors.length);
      gl.uniform3fv(u(dot.program, 'uPalette'), rgb);
      gl.uniform1fv(u(dot.program, 'uPaletteA'), alpha);
      gl.uniform1f(u(dot.program, 'uCellSize'), mapCellSize(num('cellSize')));
      gl.uniform1f(u(dot.program, 'uGamma'), mapGamma(num('gamma')));
      gl.uniform1f(u(dot.program, 'uPaletteBias'), mapPaletteBias(num('paletteBias')));

      gl.useProgram(perlin.program);
      gl.uniform1f(u(perlin.program, 'uFrequency'), mapFrequency(num('frequency')));
      gl.uniform1f(u(perlin.program, 'uSpeed'), mapSpeed(num('speed')));
      gl.uniform1f(u(perlin.program, 'uValue'), 1);

      const inst = {
        gl,
        canvas,
        perlin,
        dot,
        fbo,
        rtTex,
        seed,
        w: 0,
        h: 0,
        uPerlinTime: u(perlin.program, 'uTime'),
        uPerlinRes: u(perlin.program, 'uResolution'),
        uDotRes: u(dot.program, 'uResolution'),
      };

      resize(inst);
      const ro = new ResizeObserver(() => {
        resize(inst);
        draw(inst, lastTime);
      });
      ro.observe(canvas);
      inst.ro = ro;
      return inst;
    }

    function resize(inst) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = inst.canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (w === inst.w && h === inst.h) return;
      inst.w = w;
      inst.h = h;
      inst.canvas.width = w;
      inst.canvas.height = h;
      const gl = inst.gl;
      gl.bindTexture(gl.TEXTURE_2D, inst.rtTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    function draw(inst, time) {
      const gl = inst.gl;
      gl.viewport(0, 0, inst.w, inst.h);

      gl.bindFramebuffer(gl.FRAMEBUFFER, inst.fbo);
      gl.useProgram(inst.perlin.program);
      gl.bindVertexArray(inst.perlin.vao);
      gl.uniform1f(inst.uPerlinTime, time * 0.001 + inst.seed);
      gl.uniform2f(inst.uPerlinRes, inst.w, inst.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(inst.dot.program);
      gl.bindVertexArray(inst.dot.vao);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, inst.rtTex);
      gl.uniform2f(inst.uDotRes, inst.w, inst.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function tick(time) {
      rafId = requestAnimationFrame(tick);
      if (time - lastTime < 1000 / 30) return;
      lastTime = time;
      for (let i = 0; i < instances.length; i++) draw(instances[i], time);
    }

    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll('canvas[data-dot-matrix]');
      for (let i = 0; i < nodes.length; i++) {
        try {
          const inst = create(nodes[i]);
          if (inst) instances.push(inst);
        } catch (e) {
          console.warn('dot-matrix:', e.message);
        }
      }
      if (instances.length) {
        rafId = requestAnimationFrame(tick);
      }
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      instances.forEach((inst) => {
        if (inst.ro) inst.ro.disconnect();
      });
    };
  }, []);

  return (
    <section className="hero-dark" ref={containerRef}>
      <div className="hero-dark__texture"></div>
      <div className="frame-dark">
        <div className="stack-dark">
          {/* Headings */}
          <div className="headings-dark">
            <div className="headings-dark__left">
              <div className="badge-dark">
                <div className="badge-dark__pill">
                  <div className="badge-dark__dot">
                    <img src="/hero-42/dot.svg" alt="" />
                  </div>
                  <span>Still building want to join</span>
                </div>
              </div>
              <p className="headline-dark">My Projects in Progress</p>
            </div>
            <div className="headings-dark__right">
              <p>Building personal systems for memory, real-time communication, and agent development.</p>
            </div>
          </div>

          {/* Cards */}
          <div className="cards-dark">
            {/* Card 1 */}
            <div className="card-dark card-dark--flex">
              <img className="card-dark__bg" src="/hero-42/card1-bg.jpg" alt="" />
              <canvas
                className="card-dark__dots"
                data-dot-matrix
                data-cell-size="12"
                data-colors="#0A2013FF,#0B321CFF,#084425FF"
                data-seed="0"
              ></canvas>

              <div className="card-dark__head card-dark__head--l">
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>Main Project</span>
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Building</span>
              </div>

              <div className="widget-dark">
                <div className="dates-dark">
                  <div className="dates-dark__row">
                    <p>27</p><p>28</p><p>29</p><p>30</p><p>31</p>
                    <div className="dates-dark__sel"><p>1</p></div>
                    <p>2</p><p>3</p>
                  </div>
                  <div className="dates-dark__fade dates-dark__fade--l"></div>
                  <div className="dates-dark__fade dates-dark__fade--r"></div>
                </div>

                <div className="panel-dark panel-dark--1">
                  <div className="panel-dark__head">
                    <p>Nov 1</p>
                    <div className="seg-dark">
                      <button type="button"><img className="flip" src="/hero-42/arrow-right-01.svg" alt="Previous" /></button>
                      <button type="button"><img src="/hero-42/arrow-right-02.svg" alt="Next" /></button>
                    </div>
                  </div>
                  <div className="panel-dark__rule">
                    <img src="/hero-42/line-2282.svg" alt="" />
                  </div>
                  <div className="rows-dark">
                    <div><img src="/hero-42/icon-search-ai.svg" alt="" /><p>3 Bottlenecks Detected</p></div>
                    <div><img src="/hero-42/icon-alert.svg" alt="" /><p>2 Risk Alerts Flagged</p></div>
                    <div><img src="/hero-42/icon-workflow.svg" alt="" /><p>26% Workflow Optimized</p></div>
                  </div>
                  <div className="cursor-dark">
                    <img src="/hero-42/cursor.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="card-dark__foot">
                <div className="card-dark__foot-icon">
                  <img src="/hero-42/icon-bolt.svg" alt="" style={{ inset: '8.84% 21.3% 8.49% 20.34%' }} />
                </div>
                <div className="card-dark__foot-text">
                  <p className="card-dark__title">Riya Personal Hologram</p>
                  <p className="card-dark__sub">Recall memories and enable live speech-to-speech without losing context.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-dark card-dark--wide">
              <img className="card-dark__bg" src="/hero-42/card2-bg.jpg" alt="" />
              <canvas
                className="card-dark__dots"
                data-dot-matrix
                data-cell-size="12"
                data-colors="#0C201AFF,#0C2755FF,#093A47FF"
                data-seed="137"
              ></canvas>

              <div className="card-dark__head card-dark__head--c">
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>Outer Layer Of Agent</span>
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>2nd Project</span>
              </div>

              <div className="draft-dark panel-dark panel-dark--2">
                <div className="panel-dark__head">
                  <p>AI Task Draft</p>
                  <div className="seg-dark seg-dark--solo">
                    <button type="button"><img src="/hero-42/icon-dots.svg" alt="More" /></button>
                  </div>
                </div>
                <div className="panel-dark__rule"><img src="/hero-42/line-2282.svg" alt="" /></div>
                <div className="draft-dark__body">
                  <div className="draft-dark__hl" style={{ left: '9px', top: '47px', width: '112px' }}>
                    <img src="/hero-42/card2-bg.jpg" alt="" />
                  </div>
                  <div className="draft-dark__hl" style={{ left: '31px', top: '111px', width: '145px' }}>
                    <img src="/hero-42/card2-bg.jpg" alt="" />
                  </div>
                  <div className="draft-dark__text">
                    <p>Hey Alex,</p>
                    <p>&zwnj;</p>
                    <p><b>I noticed your team’s</b> sprint velocity dropped 18% this week 📉.</p>
                    <p>&zwnj;</p>
                    <p>Based on workflow patterns, it looks like<b> most time is being spent on</b> repetitive status updates and manual reporting.</p>
                    <p>&zwnj;</p>
                    <p>I’ve automated summary reports and drafted 3 task optimizations to help the team refocus on high-impact work.</p>
                    <p>&zwnj;</p>
                    <p>Would you like a quick overview or a detailed breakdown?</p>
                  </div>
                  <div className="draft-dark__fade"></div>
                </div>
              </div>

              <div className="chip-dark" style={{ left: '27px', top: '205px' }}><p>Context</p></div>
              <div className="chip-dark" style={{ left: '348px', top: '270px' }}><p>Insights</p></div>

              <div className="wire-dark" style={{ left: '292px', top: '288px', width: '60px' }}>
                <img src="/hero-42/line-2283.svg" alt="" style={{ width: '60px' }} />
              </div>
              <div className="node-dark" style={{ left: '291px', top: '286px' }}></div>
              <div className="wire-dark" style={{ left: '97px', top: '223px', width: '28px' }}>
                <img src="/hero-42/line-2284.svg" alt="" style={{ width: '28px' }} />
              </div>
              <div className="node-dark" style={{ left: '123px', top: '221px' }}></div>

              <div className="card-dark__foot">
                <div className="card-dark__foot-icon">
                  <img src="/hero-42/icon-book-ai.svg" alt="" style={{ inset: '0.05% 4.17% 8.33% 12.5%' }} />
                </div>
                <div className="card-dark__foot-text">
                  <p className="card-dark__title card-dark__title--c">Intelligent Response Engine</p>
                  <p className="card-dark__sub">Track agent layers, memory flow, and token usage while building.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-dark card-dark--flex">
              <img className="card-dark__bg" src="/hero-42/card3-bg.jpg" alt="" />
              <canvas
                className="card-dark__dots"
                data-dot-matrix
                data-cell-size="12"
                data-colors="#0C1528FF,#17243CFF,#212F45FF"
                data-seed="291"
              ></canvas>

              <div className="card-dark__head card-dark__head--l">
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>Training & Valuation</span>
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Daily Updates</span>
              </div>

              <div className="stats-dark">
                <div className="stat-dark">
                  <div className="stat-dark__row">
                    <div className="stat-dark__meta">
                      <img src="/hero-42/icon-hourglass.svg" alt="" />
                      <p>Time Saved</p>
                    </div>
                    <p className="stat-dark__val">12h</p>
                  </div>
                </div>
                <div className="stat-dark stat-dark--accent">
                  <div className="stat-dark__row">
                    <div className="stat-dark__meta">
                      <img src="/hero-42/icon-target.svg" alt="" />
                      <p>Accuracy Rate</p>
                    </div>
                    <p className="stat-dark__val stat-dark__val--grad">97%</p>
                  </div>
                </div>
                <div className="stat-dark">
                  <div className="stat-dark__row">
                    <div className="stat-dark__meta">
                      <div><img src="/hero-42/icon-ai.svg" alt="" /></div>
                      <p>AI Score</p>
                    </div>
                    <p className="stat-dark__val">0.01%</p>
                  </div>
                </div>
              </div>

              <div className="card-dark__foot">
                <div className="card-dark__foot-icon">
                  <img src="/hero-42/icon-target-lg.svg" alt="" style={{ inset: '8.33%' }} />
                </div>
                <div className="card-dark__foot-text">
                  <p className="card-dark__title">Predictive Performance Metrics</p>
                  <p className="card-dark__sub">buidiiing and traind with real emotions and memeories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logos Row */}
          <div className="logos-wrap-dark">
            <div className="logos-dark">
              <div className="logos-dark__track">
                <div className="logo-dark" style={{ width: '113.4px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 73.54% 0 0' }}><img src="/hero-42/brand-iconize-icon.svg" alt="Iconize" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 34.39%' }}>
                    <div style={{ position: 'absolute', inset: '26.7% 2.38% 26.5% -0.02%' }}><img src="/hero-42/brand-iconize-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '135.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 77.88% 0 0' }}><img src="/hero-42/brand-wayline-icon.svg" alt="WayLINE" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 28.76%' }}>
                    <div style={{ position: 'absolute', inset: '26.92% 17.14% 26.3% 0.05%' }}><img src="/hero-42/brand-wayline-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '123px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.61% 0 0' }}><img src="/hero-42/brand-imprintify-icon.svg" alt="Imprintify" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 31.71%' }}>
                    <div style={{ position: 'absolute', inset: '26.13% 1.2% 13.71% 0.3%' }}><img src="/hero-42/brand-imprintify-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '96px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 68.75% 0 0' }}><img src="/hero-42/brand-signet-icon.svg" alt="Signet" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 40.63%' }}>
                    <div style={{ position: 'absolute', inset: '26.56% 0.7% 14.96% 0.32%' }}><img src="/hero-42/brand-signet-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '123.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.73% 0 0' }}><img src="/hero-42/brand-grapherz-icon.svg" alt="Grapherz" style={{ bottom: '-0.3%', height: 'auto', top: 0 }} /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 31.55%' }}>
                    <div style={{ position: 'absolute', inset: '25.68% 4.62% 15.42% 0.13%' }}><img src="/hero-42/brand-grapherz-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '111.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 73.12% 0 0' }}><img src="/hero-42/brand-artistry-icon.svg" alt="Artistry" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 34.95%' }}>
                    <div style={{ position: 'absolute', inset: '26.14% 0.39% 11.78% 0.12%' }}><img src="/hero-42/brand-artistry-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '121.8px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.37% 0 0' }}><img src="/hero-42/brand-prelude-icon.svg" alt="Prelude" style={{ inset: '-0.54% 0 0 -0.5%', width: 'auto', height: 'auto' }} /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 32.02%' }}>
                    <div style={{ position: 'absolute', inset: '27.48% 0.59% 27.07% 0' }}><img src="/hero-42/brand-prelude-text.svg" alt="" /></div>
                  </div>
                </div>
              </div>
              <div className="logos-dark__track" aria-hidden="true">
                <div className="logo-dark" style={{ width: '113.4px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 73.54% 0 0' }}><img src="/hero-42/brand-iconize-icon.svg" alt="Iconize" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 34.39%' }}>
                    <div style={{ position: 'absolute', inset: '26.7% 2.38% 26.5% -0.02%' }}><img src="/hero-42/brand-iconize-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '135.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 77.88% 0 0' }}><img src="/hero-42/brand-wayline-icon.svg" alt="WayLINE" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 28.76%' }}>
                    <div style={{ position: 'absolute', inset: '26.92% 17.14% 26.3% 0.05%' }}><img src="/hero-42/brand-wayline-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '123px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.61% 0 0' }}><img src="/hero-42/brand-imprintify-icon.svg" alt="Imprintify" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 31.71%' }}>
                    <div style={{ position: 'absolute', inset: '26.13% 1.2% 13.71% 0.3%' }}><img src="/hero-42/brand-imprintify-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '96px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 68.75% 0 0' }}><img src="/hero-42/brand-signet-icon.svg" alt="Signet" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 40.63%' }}>
                    <div style={{ position: 'absolute', inset: '26.56% 0.7% 14.96% 0.32%' }}><img src="/hero-42/brand-signet-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '123.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.73% 0 0' }}><img src="/hero-42/brand-grapherz-icon.svg" alt="Grapherz" style={{ bottom: '-0.3%', height: 'auto', top: 0 }} /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 31.55%' }}>
                    <div style={{ position: 'absolute', inset: '25.68% 4.62% 15.42% 0.13%' }}><img src="/hero-42/brand-grapherz-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '111.6px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 73.12% 0 0' }}><img src="/hero-42/brand-artistry-icon.svg" alt="Artistry" /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 34.95%' }}>
                    <div style={{ position: 'absolute', inset: '26.14% 0.39% 11.78% 0.12%' }}><img src="/hero-42/brand-artistry-text.svg" alt="" /></div>
                  </div>
                </div>
                <div className="logo-dark" style={{ width: '121.8px' }}>
                  <div className="logo-dark__icon" style={{ inset: '0 75.37% 0 0' }}><img src="/hero-42/brand-prelude-icon.svg" alt="Prelude" style={{ inset: '-0.54% 0 0 -0.5%', width: 'auto', height: 'auto' }} /></div>
                  <div className="logo-dark__text" style={{ inset: '0 0 0 32.02%' }}>
                    <div style={{ position: 'absolute', inset: '27.48% 0.59% 27.07% 0' }}><img src="/hero-42/brand-prelude-text.svg" alt="" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edge-dark edge-dark--l"></div>
            <div className="edge-dark edge-dark--r"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
