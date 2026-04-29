import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, pulseGlow } from '../../utils/animations';

/* ─── Neural network node ─── */
const NeuralNode: React.FC<{
  x: number; y: number; size: number;
  frame: number; delay: number; color: string;
}> = ({ x, y, size, frame, delay, color }) => {
  const scale = springScale(frame, 60, delay, { damping: 14, mass: 0.5 });
  const pulse = pulseGlow(frame, 0.06 + (delay % 3) * 0.01, 0.4, 1.0);

  return (
    <circle
      cx={x} cy={y} r={size * scale}
      fill={color}
      opacity={0.15 + 0.25 * pulse}
      filter="url(#nodeGlow)"
    />
  );
};

/* ─── Connection line between nodes ─── */
const ConnectionLine: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  frame: number; delay: number;
}> = ({ x1, y1, x2, y2, frame, delay }) => {
  const progress = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const opacity = fadeIn(frame, delay, 12) * 0.15;
  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  return (
    <line
      x1={x1} y1={y1} x2={currentX} y2={currentY}
      stroke={COLORS.accentPrimary}
      strokeWidth="1"
      opacity={opacity}
    />
  );
};

/* ─── Neural network background ─── */
const NeuralNetworkBg: React.FC<{ frame: number }> = ({ frame }) => {
  const layers = [
    { nodes: [{ x: 120, y: 200 }, { x: 120, y: 350 }, { x: 120, y: 500 }, { x: 120, y: 650 }, { x: 120, y: 800 }], delay: 20 },
    { nodes: [{ x: 350, y: 280 }, { x: 350, y: 430 }, { x: 350, y: 580 }, { x: 350, y: 730 }], delay: 40 },
    { nodes: [{ x: 580, y: 350 }, { x: 580, y: 500 }, { x: 580, y: 650 }], delay: 60 },
  ];

  const connections: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const fromNode of layers[l].nodes) {
      for (const toNode of layers[l + 1].nodes) {
        connections.push({
          x1: fromNode.x, y1: fromNode.y,
          x2: toNode.x, y2: toNode.y,
          delay: layers[l].delay + 10,
        });
      }
    }
  }

  return (
    <svg
      width={700} height={1080}
      viewBox="0 0 700 1080"
      style={{ position: 'absolute', left: -50, top: 0, opacity: 0.6 }}
    >
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {connections.map((c, i) => (
        <ConnectionLine key={i} {...c} frame={frame} />
      ))}
      {layers.map((layer, li) =>
        layer.nodes.map((node, ni) => (
          <NeuralNode
            key={`${li}-${ni}`}
            x={node.x} y={node.y}
            size={li === 1 ? 10 : 7}
            frame={frame}
            delay={layer.delay + ni * 5}
            color={li === 0 ? COLORS.accentPrimary : li === 1 ? COLORS.accentSecondary : COLORS.success}
          />
        ))
      )}
    </svg>
  );
};

/* ─── Compact model card ─── */
const ModelCard: React.FC<{
  name: string; params: string; quantization: string;
  frame: number; fps: number; delay: number; isHighlighted?: boolean;
}> = ({ name, params, quantization, frame, fps, delay, isHighlighted }) => {
  const scale = springScale(frame, fps, delay, { damping: 14, mass: 0.5 });
  const opacity = fadeIn(frame, delay, 10);
  const glow = isHighlighted ? pulseGlow(frame, 0.04, 0.3, 0.8) : 0;

  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity,
      padding: '12px 18px',
      backgroundColor: isHighlighted ? 'rgba(124,108,240,0.08)' : COLORS.bgSecondary,
      border: `1px solid ${isHighlighted ? COLORS.accentPrimary : COLORS.borderLight}`,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      boxShadow: isHighlighted ? `0 0 ${20 * glow}px ${COLORS.accentGlow}` : 'none',
      width: 340,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 7,
          backgroundColor: isHighlighted ? COLORS.accentPrimary : COLORS.bgElevated,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: isHighlighted ? '#fff' : COLORS.textMuted }}>
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, fontFamily: FONT_FAMILY }}>
            {name}
          </div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, fontFamily: FONT_FAMILY, marginTop: 1 }}>
            {params}
          </div>
        </div>
      </div>
      <div style={{
        padding: '3px 9px',
        backgroundColor: isHighlighted ? 'rgba(124,108,240,0.15)' : COLORS.bgTertiary,
        borderRadius: 5, fontSize: 9, fontWeight: 700,
        color: isHighlighted ? COLORS.accentSecondary : COLORS.textMuted,
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {quantization}
      </div>
    </div>
  );
};

/* ─── Data flow particle ─── */
const DataParticle: React.FC<{
  frame: number; delay: number; startY: number; color: string;
}> = ({ frame, delay, startY, color }) => {
  const elapsed = Math.max(0, frame - delay);
  const cycle = elapsed % 50;
  const y = interpolate(cycle, [0, 50], [startY, startY + 180], { extrapolateRight: 'clamp' });
  const opacity = interpolate(cycle, [0, 5, 40, 50], [0, 0.6, 0.4, 0], { extrapolateRight: 'clamp' });
  const x = Math.sin(cycle * 0.15) * 8;

  if (frame < delay) return null;

  return (
    <div style={{
      position: 'absolute',
      left: `calc(50% + ${x}px)`,
      top: y,
      width: 4, height: 4,
      borderRadius: '50%',
      backgroundColor: color,
      opacity,
      boxShadow: `0 0 8px ${color}`,
    }} />
  );
};

/* ─── Architecture flow line (animated dashes) ─── */
const FlowLine: React.FC<{
  frame: number; delay: number; vertical?: boolean; length?: number;
  color: string;
}> = ({ frame, delay, vertical, length = 50, color }) => {
  const opacity = fadeIn(frame, delay, 12);
  const dashOffset = -(frame * 1.5);

  return (
    <svg
      width={vertical ? 3 : length}
      height={vertical ? length : 3}
      style={{ opacity, display: 'block' }}
    >
      <line
        x1={vertical ? 1.5 : 0}
        y1={vertical ? 0 : 1.5}
        x2={vertical ? 1.5 : length}
        y2={vertical ? length : 1.5}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
};

/* ─── Prominent Engine Card ─── */
const EngineCard: React.FC<{
  frame: number; fps: number; delay: number;
  title: string; badge: string; description: string;
  features: { label: string; value: string }[];
  accentColor: string; accentBg: string;
  icon: React.ReactNode;
  perfLabel: string; perfValue: string; perfUnit: string;
}> = ({ frame, fps, delay, title, badge, description, features, accentColor, accentBg, icon, perfLabel, perfValue, perfUnit }) => {
  const scale = springScale(frame, fps, delay, { damping: 11, mass: 0.6, stiffness: 180 });
  const opacity = fadeIn(frame, delay, 14);
  const glow = pulseGlow(frame, 0.035, 0.3, 0.7);
  const floatY = Math.sin((frame - delay) * 0.018) * 3;

  return (
    <div style={{
      transform: `scale(${scale}) translateY(${floatY}px)`,
      opacity,
      width: 320,
      borderRadius: 20,
      border: `1.5px solid ${accentColor}30`,
      background: `linear-gradient(165deg, ${accentBg} 0%, ${COLORS.bgSecondary} 40%, ${COLORS.bgPrimary}ee 100%)`,
      boxShadow: `0 16px 50px rgba(0,0,0,0.35), 0 0 ${25 * glow}px ${accentColor}12, inset 0 1px 0 rgba(255,255,255,0.04)`,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top gradient accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Inner content */}
      <div style={{ padding: '24px 26px 22px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Icon container */}
            <div style={{
              width: 48, height: 48,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
              border: `1px solid ${accentColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 ${12 * glow}px ${accentColor}15`,
            }}>
              {icon}
            </div>
            <div>
              <div style={{
                fontSize: 20, fontWeight: 800,
                color: COLORS.textPrimary, fontFamily: FONT_FAMILY,
                letterSpacing: -0.3,
              }}>
                {title}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 600,
                color: COLORS.textMuted, fontFamily: FONT_FAMILY,
                marginTop: 2, letterSpacing: 0.5,
              }}>
                {description}
              </div>
            </div>
          </div>

          {/* Badge */}
          <div style={{
            padding: '4px 10px',
            borderRadius: 8,
            backgroundColor: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
          }}>
            <span style={{
              fontSize: 8, fontWeight: 800,
              color: accentColor, letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontFamily: FONT_FAMILY,
            }}>
              {badge}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`, marginBottom: 16 }} />

        {/* Feature rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          {features.map((feat, i) => {
            const featOpacity = fadeIn(frame, delay + 18 + i * 8, 10);
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                opacity: featOpacity,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    backgroundColor: accentColor, opacity: 0.6,
                  }} />
                  <span style={{
                    fontSize: 12, fontWeight: 500,
                    color: COLORS.textSecondary, fontFamily: FONT_FAMILY,
                  }}>
                    {feat.label}
                  </span>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: COLORS.textPrimary,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {feat.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Performance highlight */}
        <div style={{
          padding: '14px 16px',
          borderRadius: 12,
          background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}04)`,
          border: `1px solid ${accentColor}18`,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: COLORS.textMuted, textTransform: 'uppercase',
            letterSpacing: 1, fontFamily: FONT_FAMILY,
          }}>
            {perfLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{
              fontSize: 28, fontWeight: 900,
              color: accentColor, fontFamily: FONT_FAMILY,
              lineHeight: 1,
            }}>
              {perfValue}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: COLORS.textMuted, fontFamily: FONT_FAMILY,
            }}>
              {perfUnit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── SVG Icons for engine cards ─── */
const LlamaIcon: React.FC = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M13 3L4 14h5l-1 7 9-11h-5l1-7z" stroke={COLORS.accentPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill={`${COLORS.accentPrimary}15`} />
  </svg>
);

const BrainIcon: React.FC = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" stroke={COLORS.accentSecondary} strokeWidth="1.8" strokeLinecap="round" fill={`${COLORS.accentSecondary}15`} />
    <path d="M9 21h6M10 17v4M14 17v4" stroke={COLORS.accentSecondary} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Exported scene ─── */
export const OfflineEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = pulseGlow(frame, 0.03, 0.2, 0.5);

  /* Section label */
  const labelOpacity = fadeIn(frame, 0, 12);

  /* Title */
  const titleDelay = 10;
  const titleScale = springScale(frame, fps, titleDelay, { damping: 12, mass: 0.7 });
  const titleOpacity = fadeIn(frame, titleDelay, 15);

  /* Subtitle */
  const subtitleDelay = 30;
  const subtitleOpacity = fadeIn(frame, subtitleDelay, 12);

  /* Model cards */
  const models = [
    { name: 'Qwen 2.5', params: '72B Parameters', quantization: 'Q4_K_M', delay: 55 },
    { name: 'Llama 3.1', params: '70B Parameters', quantization: 'Q5_K_S', delay: 70, highlighted: true },
    { name: 'Mistral Large', params: '123B Parameters', quantization: 'Q3_K_L', delay: 85 },
    { name: 'DeepSeek V3', params: '67B Parameters', quantization: 'Q4_K_M', delay: 100 },
  ];

  /* Engine card delays */
  const llamaDelay = 140;
  const airDelay = 160;

  /* "VS" connector */
  const vsDelay = 175;
  const vsScale = springScale(frame, fps, vsDelay, { damping: 10, mass: 0.5 });
  const vsOpacity = fadeIn(frame, vsDelay, 10);

  /* Bottom stat counters */
  const statDelay = 250;
  const stats = [
    { value: '8GB', label: 'Min RAM', color: COLORS.success, delay: statDelay },
    { value: '0ms', label: 'Cloud Latency', color: COLORS.accentPrimary, delay: statDelay + 12 },
    { value: '100%', label: 'Offline', color: COLORS.warning, delay: statDelay + 24 },
    { value: '$0', label: 'API Cost', color: COLORS.accentSecondary, delay: statDelay + 36 },
  ];

  /* Bottom text */
  const bottomTextDelay = 330;
  const bottomOpacity = fadeIn(frame, bottomTextDelay, 15);
  const bottomY = interpolate(frame, [bottomTextDelay, bottomTextDelay + 15], [12, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: COLORS.bgPrimary,
      fontFamily: FONT_FAMILY,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Neural network background */}
      <NeuralNetworkBg frame={frame} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${COLORS.borderLight} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.borderLight} 1px, transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.12,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        width: 900, height: 900,
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${COLORS.accentGlowStrong} 0%, transparent 55%)`,
        opacity: glow * 0.45,
        filter: 'blur(90px)',
      }} />

      {/* Data flow particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <DataParticle key={i} frame={frame} delay={50 + i * 12} startY={80 + i * 50} color={COLORS.accentSecondary} />
      ))}

      {/* Main content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        padding: '36px 60px 40px',
        zIndex: 10,
      }}>
        {/* Section label */}
        <div style={{ opacity: labelOpacity, marginBottom: 14 }}>
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: COLORS.accentSecondary,
            textTransform: 'uppercase', letterSpacing: 6,
          }}>
            The Offline Engine
          </span>
        </div>

        {/* Title */}
        <div style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: 'center',
          marginBottom: 4,
        }}>
          <h1 style={{
            fontSize: 48, fontWeight: 800,
            color: COLORS.textPrimary,
            margin: 0, letterSpacing: -1,
            lineHeight: 1.1,
          }}>
            Run{' '}
            <span style={{ color: COLORS.accentSecondary }}>1B – 100B</span>
            {' '}Models Locally
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: subtitleOpacity, marginBottom: 28, textAlign: 'center' }}>
          <span style={{ fontSize: 17, fontWeight: 500, color: COLORS.textSecondary, letterSpacing: 0.5 }}>
            On your hardware. No cloud. No compromise.
          </span>
        </div>

        {/* Model cards strip */}
        <div style={{
          display: 'flex', gap: 10,
          marginBottom: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {models.map((model, i) => (
            <ModelCard
              key={i}
              name={model.name} params={model.params} quantization={model.quantization}
              frame={frame} fps={fps} delay={model.delay}
              isHighlighted={model.highlighted}
            />
          ))}
        </div>

        {/* Flow lines from models → engines */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 120, marginBottom: 4 }}>
          <FlowLine frame={frame} delay={llamaDelay - 8} vertical length={30} color={COLORS.accentPrimary} />
          <FlowLine frame={frame} delay={airDelay - 8} vertical length={30} color={COLORS.accentSecondary} />
        </div>

        {/* Engine cards row — the star of the scene */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: 20,
        }}>
          <EngineCard
            frame={frame} fps={fps} delay={llamaDelay}
            title="llama.cpp"
            badge="Primary"
            description="GGUF Quantized Inference"
            features={[
              { label: 'Format', value: 'GGUF' },
              { label: 'Quantization', value: 'Q2–Q8_0' },
              { label: 'GPU Offload', value: 'Partial / Full' },
              { label: 'Context', value: 'Up to 128K' },
            ]}
            accentColor={COLORS.accentPrimary}
            accentBg="rgba(124,108,240,0.05)"
            icon={<LlamaIcon />}
            perfLabel="Throughput"
            perfValue="40+"
            perfUnit="tok/s"
          />

          {/* VS connector */}
          <div style={{
            transform: `scale(${vsScale})`,
            opacity: vsOpacity,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 6,
            padding: '0 16px',
          }}>
            <FlowLine frame={frame} delay={vsDelay} length={24} color={COLORS.textMuted} />
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              border: `1.5px solid ${COLORS.borderLight}`,
              backgroundColor: COLORS.bgSecondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontSize: 10, fontWeight: 800,
                color: COLORS.textMuted,
                letterSpacing: 1,
              }}>
                OR
              </span>
            </div>
            <FlowLine frame={frame} delay={vsDelay} length={24} color={COLORS.textMuted} />
          </div>

          <EngineCard
            frame={frame} fps={fps} delay={airDelay}
            title="AirLLM"
            badge="Fallback"
            description="Layer-by-Layer Streaming"
            features={[
              { label: 'Mode', value: 'Layer Swap' },
              { label: 'Max Model', value: '70B on 8GB' },
              { label: 'VRAM Need', value: 'Near Zero' },
              { label: 'Precision', value: 'FP16 / INT4' },
            ]}
            accentColor={COLORS.accentSecondary}
            accentBg="rgba(168,160,255,0.04)"
            icon={<BrainIcon />}
            perfLabel="Min Memory"
            perfValue="8"
            perfUnit="GB RAM"
          />
        </div>

        {/* Stat counters row */}
        <div style={{ display: 'flex', gap: 14 }}>
          {stats.map((stat, i) => {
            const statScale = springScale(frame, fps, stat.delay, { damping: 14, mass: 0.5 });
            const statOpacity = fadeIn(frame, stat.delay, 10);

            return (
              <div key={i} style={{
                transform: `scale(${statScale})`,
                opacity: statOpacity,
                padding: '12px 22px',
                backgroundColor: COLORS.bgSecondary,
                border: `1px solid ${COLORS.borderLight}`,
                borderRadius: 10,
                textAlign: 'center',
                minWidth: 100,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, fontFamily: FONT_FAMILY }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 600, color: COLORS.textMuted,
                  fontFamily: FONT_FAMILY, marginTop: 3,
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute', bottom: 44, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: bottomOpacity,
        transform: `translateY(${bottomY}px)`,
        zIndex: 10,
      }}>
        <p style={{ fontSize: 24, fontWeight: 600, color: COLORS.textPrimary, margin: 0 }}>
          Powered by{' '}
          <span style={{ color: COLORS.accentPrimary, fontWeight: 700 }}>llama.cpp</span>
          {' '}&{' '}
          <span style={{ color: COLORS.accentSecondary, fontWeight: 700 }}>AirLLM</span>
          {' '}·{' '}
          <span style={{ color: COLORS.success }}>Zero Internet Required</span>
        </p>
      </div>
    </div>
  );
};
