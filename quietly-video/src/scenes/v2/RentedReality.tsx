import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, pulseGlow } from '../../utils/animations';

// Elegant cloud icon with AI sparkle — larger, more refined
const CloudAIIcon: React.FC<{ size?: number; pulse: number }> = ({ size = 110, pulse }) => (
  <div
    style={{
      filter: `drop-shadow(0 0 ${12 * pulse}px rgba(248, 113, 113, 0.25))`,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="rgba(248, 113, 113, 0.06)"
        stroke={COLORS.textSecondary}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* AI sparkle */}
      <path
        d="M12 12l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"
        fill={COLORS.accentSecondary}
        stroke="none"
      />
    </svg>
  </div>
);

// Animated red tether with pulsing data flow
const DataTether: React.FC<{
  frame: number;
  x1: number; y1: number;
  x2: number; y2: number;
  delay: number;
  broken: boolean;
  breakProgress: number;
}> = ({ frame, x1, y1, x2, y2, delay, broken, breakProgress }) => {
  const opacity = fadeIn(frame, delay, 12);
  // Animated dash offset for "data flowing" effect
  const dashOffset = -(frame * 2);
  // Breaking animation
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const gap = breakProgress * 40;

  if (broken && breakProgress >= 1) return null;

  return (
    <g opacity={opacity * (1 - breakProgress * 0.8)}>
      <line
        x1={x1}
        y1={y1}
        x2={broken ? midX - gap : x2}
        y2={broken ? midY : y2}
        stroke={COLORS.error}
        strokeWidth="2"
        strokeDasharray="8 5"
        strokeDashoffset={dashOffset}
        opacity="0.7"
      />
      {!broken && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={COLORS.error}
          strokeWidth="6"
          strokeDasharray="8 5"
          strokeDashoffset={dashOffset}
          opacity="0.08"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

// Floating dollar sign with trail effect
const DollarFloat: React.FC<{
  frame: number;
  delay: number;
  startX: number;
  startY: number;
}> = ({ frame, delay, startX, startY }) => {
  const elapsed = Math.max(0, frame - delay);
  const cycle = elapsed % 70; // Faster cycle
  const y = interpolate(cycle, [0, 70], [0, -140], { extrapolateRight: 'clamp' });
  const opacity = interpolate(cycle, [0, 8, 50, 70], [0, 0.85, 0.6, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(cycle, [0, 10, 60, 70], [0.5, 1, 0.8, 0.3], { extrapolateRight: 'clamp' });

  if (frame <= delay) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: COLORS.warning,
          fontFamily: FONT_FAMILY,
          textShadow: `0 0 12px rgba(251, 191, 36, 0.4)`,
        }}
      >
        $
      </span>
    </div>
  );
};

// Stylized laptop with screen glow
const LaptopDevice: React.FC<{ frame: number; fps: number; dark: boolean }> = ({ frame, fps, dark }) => {
  const scale = springScale(frame, fps, 15, { damping: 14, mass: 0.7 });
  const screenGlow = dark ? 0 : pulseGlow(frame, 0.06, 0.3, 0.6);

  return (
    <div style={{ transform: `scale(${scale})`, position: 'relative' }}>
      {/* Screen glow behind laptop */}
      {!dark && (
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: -30,
            right: -30,
            bottom: 0,
            borderRadius: 20,
            background: `radial-gradient(ellipse at 50% 30%, rgba(124,108,240,${0.08 * screenGlow}), transparent 70%)`,
          }}
        />
      )}
      <svg width={180} height={120} viewBox="0 0 180 120" fill="none">
        {/* Laptop body */}
        <rect x="20" y="8" width="140" height="85" rx="6"
          stroke={dark ? COLORS.textMuted : COLORS.textSecondary}
          strokeWidth="2"
          fill={COLORS.bgSecondary}
        />
        {/* Screen bezel */}
        <rect x="26" y="14" width="128" height="73" rx="2" fill={COLORS.bgPrimary} />
        {/* Code lines on screen */}
        {dark ? (
          <>
            <rect x="34" y="24" width="60" height="3.5" rx="1.5" fill={COLORS.textMuted} opacity="0.15" />
            <rect x="34" y="33" width="40" height="3.5" rx="1.5" fill={COLORS.textMuted} opacity="0.15" />
            <rect x="34" y="42" width="75" height="3.5" rx="1.5" fill={COLORS.textMuted} opacity="0.15" />
            <rect x="34" y="51" width="50" height="3.5" rx="1.5" fill={COLORS.textMuted} opacity="0.15" />
            <rect x="34" y="60" width="65" height="3.5" rx="1.5" fill={COLORS.textMuted} opacity="0.15" />
            {/* Red X overlay on dark screen */}
            <text x="90" y="55" textAnchor="middle" fill={COLORS.error} fontSize="30" fontWeight="900" opacity="0.4">✕</text>
          </>
        ) : (
          <>
            <rect x="34" y="24" width="60" height="3.5" rx="1.5" fill={COLORS.accentPrimary} opacity="0.5" />
            <rect x="34" y="33" width="40" height="3.5" rx="1.5" fill={COLORS.success} opacity="0.5" />
            <rect x="34" y="42" width="75" height="3.5" rx="1.5" fill={COLORS.warning} opacity="0.45" />
            <rect x="34" y="51" width="50" height="3.5" rx="1.5" fill={COLORS.info} opacity="0.5" />
            <rect x="34" y="60" width="65" height="3.5" rx="1.5" fill={COLORS.accentSecondary} opacity="0.4" />
            <rect x="34" y="69" width="45" height="3.5" rx="1.5" fill={COLORS.success} opacity="0.4" />
          </>
        )}
        {/* Base */}
        <path d="M8 93h164l-10 16H18L8 93z" fill={COLORS.bgTertiary} stroke={COLORS.textMuted} strokeWidth="1" />
        {/* Trackpad line */}
        <rect x="70" y="98" width="40" height="6" rx="3" fill="none" stroke={COLORS.textMuted} strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
};

// Wi-Fi disconnected with dramatic flash
const WifiCutoff: React.FC<{ frame: number; fps: number; delay: number }> = ({ frame, fps, delay }) => {
  const scale = springScale(frame, fps, delay, { damping: 8, mass: 0.5, stiffness: 250 });
  const opacity = fadeIn(frame, delay, 6);
  const flash = frame > delay && frame < delay + 20
    ? interpolate(frame, [delay, delay + 8, delay + 20], [0, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  if (frame < delay) return null;

  return (
    <div style={{ position: 'relative', transform: `scale(${scale})`, opacity }}>
      {/* Red flash ring */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: '50%',
          backgroundColor: COLORS.error,
          opacity: flash,
          filter: 'blur(15px)',
        }}
      />
      <svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke={COLORS.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Full outer arc */}
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        {/* Middle arc */}
        <path d="M5 12.55a11 11 0 0 1 14 0" />
        {/* Inner arc */}
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        {/* Dot */}
        <circle cx="12" cy="20" r="1" fill={COLORS.error} stroke="none" />
        {/* Diagonal slash */}
        <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// Subscription badge with chain icon
const SubscriptionBadge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = springScale(frame, fps, 20, { damping: 10, stiffness: 220 });
  const shake = frame > 100 ? Math.sin(frame * 0.5) * 2 : 0;

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${shake}deg)`,
        padding: '7px 18px',
        backgroundColor: COLORS.error,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: `0 4px 20px rgba(248, 113, 113, 0.3)`,
      }}
    >
      {/* Chain link icon */}
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: FONT_FAMILY, letterSpacing: 1.5 }}>
        SUBSCRIPTION
      </span>
    </div>
  );
};

export const RentedReality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = pulseGlow(frame, 0.05, 0.4, 1.0);

  // Cloud floats in with elegant bobbing
  const cloudScale = springScale(frame, fps, 5, { damping: 12, mass: 0.6, stiffness: 220 });
  const cloudFloat = Math.sin(frame * 0.035) * 10;

  // ---- TIGHTER TIMING (total 420 frames = 7s) ----
  // Phase 1: Setup (0–100)  ~1.7s — cloud, tethers, laptop, dollars appear
  // Phase 2: Problem text (40–140) ~1.7s — text appears early, overlapping setup
  // Phase 3: Disconnect (130–200)  ~1.2s — wifi flash, lines break, screen dark
  // Phase 4: Beam & shatter (200–320) ~2s — purple beam cuts, everything shatters
  // Phase 5: Fade (320–420) ~1.7s — fragments fall out

  // Tethers appear fast
  const tetherOpacity = fadeIn(frame, 15, 10);

  // Wi-Fi disconnect
  const wifiDelay = 130;

  // Lines break
  const breakStart = 155;
  const breakProgress = interpolate(frame, [breakStart, breakStart + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const screenDark = frame > 165;

  // Text appears early and overlaps with setup
  const textOpacity = fadeIn(frame, 35, 12);
  const textY = interpolate(frame, [35, 50], [25, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.3)),
  });
  // Text fades out before beam
  const textFadeOut = interpolate(frame, [190, 210], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Purple beam — starts earlier
  const beamStart = 200;
  const beamProgress = interpolate(frame, [beamStart, beamStart + 20], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  // Beam glow flash
  const beamFlash = interpolate(frame, [beamStart + 10, beamStart + 15, beamStart + 25], [0, 0.12, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Shatter — starts right after beam
  const shatterStart = 225;
  const shatterProgress = frame > shatterStart
    ? interpolate(frame, [shatterStart, shatterStart + 50], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        easing: Easing.in(Easing.ease),
      })
    : 0;

  // Fragments with varied sizes and physics
  const fragments = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2 + (i * 0.3);
    const speed = 600 + (i % 4) * 200;
    const dist = shatterProgress * speed;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist + shatterProgress * shatterProgress * 500,
      rotation: shatterProgress * 540 * (i % 2 === 0 ? 1 : -1),
      opacity: Math.max(0, 1 - shatterProgress * 1.3),
      width: 40 + (i % 5) * 25,
      height: 25 + (i % 3) * 20,
    };
  });

  const mainOpacity = 1 - shatterProgress;

  // Danger pills that appear around the cloud
  const dangerPills = [
    { text: 'Privacy Risk', delay: 55, x: -220, y: -30 },
    { text: 'Always Online', delay: 70, x: 200, y: -50 },
    { text: '$29/mo', delay: 85, x: -200, y: 60 },
    { text: 'Data Leaks', delay: 100, x: 210, y: 40 },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bgPrimary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial danger glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248, 113, 113, 0.06) 0%, transparent 60%)',
          opacity: mainOpacity * pulse,
          filter: 'blur(40px)',
        }}
      />

      {/* Main scene container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: mainOpacity,
        }}
      >
        {/* Cloud AI icon with floating motion */}
        <div
          style={{
            transform: `scale(${cloudScale}) translateY(${cloudFloat}px)`,
            position: 'relative',
            marginBottom: 20,
          }}
        >
          <CloudAIIcon pulse={pulse} />

          {/* Subscription badge */}
          <div style={{ position: 'absolute', top: -20, right: -80 }}>
            <SubscriptionBadge frame={frame} fps={fps} />
          </div>
        </div>

        {/* Danger pills around cloud */}
        {dangerPills.map((pill, i) => {
          const pillScale = springScale(frame, fps, pill.delay, { damping: 14, mass: 0.5 });
          const pillOpacity = fadeIn(frame, pill.delay, 8);
          const pillFloat = Math.sin((frame - pill.delay) * 0.04 + i) * 4;
          const pillFade = interpolate(frame, [breakStart, breakStart + 15], [1, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: `translate(${pill.x}px, ${pill.y + pillFloat}px) scale(${pillScale})`,
                opacity: pillOpacity * pillFade,
                padding: '6px 16px',
                backgroundColor: 'rgba(248, 113, 113, 0.08)',
                border: '1px solid rgba(248, 113, 113, 0.25)',
                borderRadius: 20,
                whiteSpace: 'nowrap' as const,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.error, fontFamily: FONT_FAMILY }}>
                {pill.text}
              </span>
            </div>
          );
        })}

        {/* Red tether lines — animated SVG */}
        <svg
          width={500}
          height={90}
          viewBox="0 0 500 90"
          style={{ marginBottom: 10 }}
        >
          <DataTether frame={frame} x1={250} y1={0} x2={100} y2={90} delay={18} broken={frame > breakStart} breakProgress={breakProgress} />
          <DataTether frame={frame} x1={250} y1={0} x2={250} y2={90} delay={22} broken={frame > breakStart} breakProgress={breakProgress} />
          <DataTether frame={frame} x1={250} y1={0} x2={400} y2={90} delay={26} broken={frame > breakStart} breakProgress={breakProgress} />
        </svg>

        {/* Floating dollars along tethers */}
        <DollarFloat frame={frame} delay={30} startX={-80} startY={-60} />
        <DollarFloat frame={frame} delay={42} startX={0} startY={-40} />
        <DollarFloat frame={frame} delay={54} startX={75} startY={-55} />
        <DollarFloat frame={frame} delay={66} startX={-40} startY={-70} />
        <DollarFloat frame={frame} delay={78} startX={50} startY={-50} />

        {/* Laptop device */}
        <LaptopDevice frame={frame} fps={fps} dark={screenDark} />

        {/* Wi-Fi disconnected — dramatic flash */}
        <div style={{ position: 'absolute', top: 10, right: -140 }}>
          <WifiCutoff frame={frame} fps={fps} delay={wifiDelay} />
        </div>
      </div>

      {/* Kinetic text — appears early, positioned elegantly */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          opacity: textOpacity * textFadeOut * mainOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 46,
            fontWeight: 600,
            color: COLORS.textPrimary,
            margin: 0,
            letterSpacing: -0.5,
            lineHeight: 1.2,
          }}
        >
          Tired of{' '}
          <span
            style={{
              color: COLORS.error,
              fontStyle: 'italic',
              fontWeight: 700,
              textShadow: `0 0 20px rgba(248, 113, 113, 0.3)`,
            }}
          >
            renting
          </span>
          {' '}your intelligence?
        </p>
      </div>

      {/* ───── PURPLE BEAM ───── */}
      {frame >= beamStart && (
        <>
          {/* Main beam line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: `${beamProgress}%`,
              height: 3,
              backgroundColor: COLORS.accentPrimary,
              boxShadow: `0 0 20px ${COLORS.accentPrimary}, 0 0 50px ${COLORS.accentGlowStrong}, 0 0 80px ${COLORS.accentGlow}`,
              zIndex: 20,
            }}
          />
          {/* Beam leading edge glow */}
          <div
            style={{
              position: 'absolute',
              left: `${beamProgress}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: COLORS.accentPrimary,
              opacity: beamProgress < 100 ? 0.6 : 0,
              filter: 'blur(12px)',
              zIndex: 21,
            }}
          />
          {/* Full-screen flash on beam completion */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: COLORS.accentPrimary,
              opacity: beamFlash,
              zIndex: 19,
            }}
          />
        </>
      )}

      {/* Shatter fragments */}
      {frame > shatterStart && fragments.map((frag, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: frag.width,
            height: frag.height,
            backgroundColor: i % 3 === 0 ? COLORS.bgSecondary : i % 3 === 1 ? COLORS.bgTertiary : COLORS.bgElevated,
            border: `1px solid ${COLORS.borderLight}`,
            borderRadius: 4,
            transform: `translate(${frag.x}px, ${frag.y}px) rotate(${frag.rotation}deg)`,
            opacity: frag.opacity,
            zIndex: 15,
          }}
        />
      ))}
    </div>
  );
};
