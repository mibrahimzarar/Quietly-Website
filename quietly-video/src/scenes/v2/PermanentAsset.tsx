import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, pulseGlow } from '../../utils/animations';
import logo from '../../components/LOGO.png';

// Shield logo with logo image (no background, more prominent)
const ShieldLogo: React.FC<{ size?: number; glowIntensity: number }> = ({ size = 180, glowIntensity }) => (
  <div
    style={{
      width: size,
      height: size,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: `drop-shadow(0 0 ${20 * glowIntensity}px ${COLORS.accentPrimary})`,
    }}
  >
    {/* Logo - larger and more prominent */}
    <img
      src={logo}
      alt="Quietly Logo"
      style={{
        width: size * 0.6,
        height: 'auto',
        objectFit: 'contain',
        filter: `drop-shadow(0 0 ${10 * glowIntensity}px ${COLORS.accentGlowStrong})`,
      }}
    />
  </div>
);

export const PermanentAsset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scales up with heavy spring overshoot
  const logoScale = springScale(frame, fps, 10, { damping: 10, mass: 0.7, stiffness: 200 });
  const logoOpacity = fadeIn(frame, 5, 15);
  const glowPulse = pulseGlow(frame, 0.05, 0.5, 1.0);

  // The stamp — "PAY ONCE. OWN FOREVER." slams in at frame 60
  const stampScale = interpolate(frame, [60, 72], [4.0, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const stampOpacity = fadeIn(frame, 58, 8);
  // Use heavier mass for the stamp
  const stampFinalScale = frame >= 72 ? springScale(frame, fps, 72, { damping: 8, mass: 1.5, stiffness: 180 }) : stampScale / 4.0;

  // Amber shockwave on stamp impact
  const shockwaveStart = 72;
  const shockwaveScale = interpolate(frame, [shockwaveStart, shockwaveStart + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const shockwaveOpacity = interpolate(frame, [shockwaveStart, shockwaveStart + 15, shockwaveStart + 40], [0, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bottom text — staggered reveal
  const textLines = [
    'No Monthly Fees.',
    'No Expiration.',
    'Your Private AI Asset.',
  ];

  // Background amber flash on impact
  const flashOpacity = interpolate(frame, [72, 76, 85], [0, 0.08, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* Amber flash on impact */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.warning,
          opacity: flashOpacity,
          zIndex: 5,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGlowStrong} 0%, transparent 60%)`,
          opacity: 0.4 * glowPulse,
          filter: 'blur(80px)',
        }}
      />

      {/* Shield Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 40,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <ShieldLogo glowIntensity={glowPulse} />
      </div>

      {/* Amber shockwave ring */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: `3px solid ${COLORS.warning}`,
          transform: `scale(${shockwaveScale * 4})`,
          opacity: shockwaveOpacity,
          boxShadow: `0 0 40px ${COLORS.warning}, inset 0 0 40px rgba(251, 191, 36, 0.1)`,
          zIndex: 8,
        }}
      />

      {/* "PAY ONCE. OWN FOREVER." stamp */}
      <div
        style={{
          transform: `scale(${frame >= 72 ? stampFinalScale : stampScale})`,
          opacity: stampOpacity,
          marginBottom: 50,
          padding: '20px 50px',
          border: `4px solid ${COLORS.warning}`,
          borderRadius: 8,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: COLORS.warning,
            margin: 0,
            letterSpacing: 4,
            textTransform: 'uppercase',
            textShadow: `0 0 20px rgba(251, 191, 36, 0.3)`,
          }}
        >
          PAY ONCE. OWN FOREVER.
        </h2>
      </div>

      {/* Bottom text — staggered */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }}>
        {textLines.map((line, i) => {
          const lineDelay = 140 + i * 12;
          const lineOpacity = fadeIn(frame, lineDelay, 12);
          const lineY = interpolate(frame, [lineDelay, lineDelay + 15], [15, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.ease),
          });

          return (
            <p
              key={i}
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: i === 2 ? COLORS.accentSecondary : COLORS.textPrimary,
                margin: 0,
                opacity: lineOpacity,
                transform: `translateY(${lineY}px)`,
              }}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};
