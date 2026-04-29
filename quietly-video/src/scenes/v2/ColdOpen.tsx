import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, fadeOut, typewriter, pulseGlow } from '../../utils/animations';
import logo from '../../components/LOGO.png';

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three bouncing dots (0–60 frames, staggered)
  const dotSize = 28;
  const dotGap = 28;

  const dots = [0, 1, 2].map((i) => {
    const delay = i * 10;
    // Make dots stop bouncing after frame 150 and fade out completely
    const bounceY = frame < 150
      ? interpolate(
        Math.sin(((frame - delay) / fps) * Math.PI * 3),
        [-1, 1],
        [0, -30],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
      : 0;
    const dotOpacity = fadeIn(frame, delay, 10);
    // Fade dots out as logo comes in
    const dotFadeOut = interpolate(frame, [90, 120], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    // Additional fade out after frame 180 to ensure clean ending
    const endFadeOut = fadeOut(frame, 180, 60);

    return (
      <div
        key={i}
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: COLORS.accentPrimary,
          boxShadow: `0 0 20px ${COLORS.accentGlowStrong}, 0 0 40px ${COLORS.accentGlow}`,
          transform: `translateY(${bounceY}px)`,
          opacity: dotOpacity * dotFadeOut * endFadeOut,
          marginLeft: i > 0 ? dotGap : 0,
        }}
      />
    );
  });

  // "Quietly" text fades in at frame 80
  const textOpacity = fadeIn(frame, 80, 30);
  // Make text glow pulse only during the scene duration
  const textGlow = frame < 220
    ? pulseGlow(frame, 0.04, 0.6, 1.0)
    : interpolate(frame, [220, 240], [0.6, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Logo scales from 0 to 1 with spring overshoot
  const logoScale = springScale(frame, fps, 70, { damping: 10, mass: 0.6, stiffness: 200 });
  // Scale down slightly at the end for clean transition
  const logoEndScale = interpolate(frame, [220, 240], [1, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline typewriter at frame 140
  const tagline = 'Offline-First AI IDE & Chat Buddy';
  const tagChars = typewriter(frame, 140, tagline, 2);
  const tagOpacity = fadeIn(frame, 140, 10);
  // New duration: Fade out starts at 280 and ends at 300
  const tagEndOpacity = interpolate(frame, [200, 300], [1, 0], {
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
      {/* Subtle radial background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGlowStrong} 0%, transparent 70%)`,
          opacity: textOpacity * 0.4,
          filter: 'blur(80px)',
        }}
      />

      {/* Bouncing dots */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
        {dots}
      </div>

      {/* Logo / Brand Name */}
      <div
        style={{
          transform: `scale(${logoScale * logoEndScale})`,
          opacity: textOpacity,
          marginBottom: 20,
        }}
      >
        {/* Logo - very big and prominent */}
        <img
          src={logo}
          alt="Quietly Logo"
          style={{
            width: 220,
            height: 'auto',
            margin: '0 auto 60px',
            filter: `drop-shadow(0 0 ${20 * textGlow}px ${COLORS.accentGlowStrong})`,
          }}
        />
      </div>

      {/* "Quietly" text */}
      <h1
        style={{
          fontSize: 82,
          fontWeight: 800,
          color: COLORS.textPrimary,
          opacity: textOpacity,
          textShadow: `0 0 ${40 * textGlow}px ${COLORS.accentGlowStrong}`,
          letterSpacing: -2,
          margin: 0,
        }}
      >
        Quietly
      </h1>

      {/* Tagline typewriter */}
      <p
        style={{
          fontSize: 30,
          fontWeight: 500,
          color: COLORS.accentSecondary,
          opacity: tagOpacity * tagEndOpacity,
          marginTop: 16,
          letterSpacing: 2,
          height: 40,
        }}
      >
        {tagline.slice(0, tagChars)}
        {tagChars < tagline.length && (
          <span
            style={{
              borderRight: `2px solid ${COLORS.accentPrimary}`,
              opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
              marginLeft: 2,
            }}
          />
        )}
      </p>
    </div>
  );
};
