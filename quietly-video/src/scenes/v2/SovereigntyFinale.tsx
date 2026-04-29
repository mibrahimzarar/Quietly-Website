import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, typewriter, pulseGlow } from '../../utils/animations';
import logo from '../../components/LOGO.png';

// Platform icons
const LinuxIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={COLORS.textPrimary} stroke="none">
    <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.2 3.1C7.3 10.5 6 12.3 6 14.5c0 1.5.6 2.8 1.5 3.8-.5.3-1 .7-1.3 1.2-.4.6-.2 1.4.4 1.8.6.4 1.4.2 1.8-.4.2-.3.5-.5.8-.6.9.4 1.8.7 2.8.7s1.9-.3 2.8-.7c.3.1.6.3.8.6.4.6 1.2.8 1.8.4.6-.4.8-1.2.4-1.8-.3-.5-.8-.9-1.3-1.2.9-1 1.5-2.3 1.5-3.8 0-2.2-1.3-4-2.7-4.9.7-.8 1.2-1.9 1.2-3.1C16.5 4 14.5 2 12 2z" />
  </svg>
);

const WindowsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={COLORS.textPrimary} stroke="none">
    <path d="M3 5.5l7.5-1v7H3V5.5zm0 13l7.5 1v-7H3v6zm8.5-12.5L21 4v7.5h-9.5V6zm0 12L21 20v-7.5h-9.5V18z" />
  </svg>
);

const AppleIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={COLORS.textPrimary} stroke="none">
    <path d="M18.7 19.5c-.9 1.3-1.9 2.5-3.4 2.5-1.5 0-2-.9-3.7-.9-1.8 0-2.3.9-3.7.9-1.5 0-2.6-1.3-3.5-2.6C2.6 16.4 1.7 12.2 3.5 9.5c.9-1.3 2.4-2.2 4-2.2 1.5 0 2.4 1 3.6 1 1.2 0 2-.9 3.7-.9 1.4 0 2.7.7 3.5 1.9-3.1 1.7-2.6 6.1.4 7.2zM14.5 5.5c.7-.9 1.2-2.1 1-3.4-1 .1-2.2.7-2.9 1.5-.7.8-1.2 2-1 3.2 1.1.1 2.2-.5 2.9-1.3z" />
  </svg>
);

export const SovereigntyFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield logo collapses in from edges
  const logoScale = springScale(frame, fps, 10, { damping: 10, mass: 0.8, stiffness: 180 });
  const logoOpacity = fadeIn(frame, 5, 15);
  const glow = pulseGlow(frame, 0.04, 0.4, 1.0);

  // Manifesto words slam in
  const manifestoWords = [
    { text: 'YOUR MACHINE.', color: COLORS.textPrimary, delay: 55, x: 400, size: 56 },
    { text: 'YOUR RULES.', color: COLORS.warning, delay: 75, x: 0, size: 72 },
  ];

  // Logo settles at center after manifesto
  const logoSettleY = interpolate(frame, [100, 130], [-120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  // URL typewriter
  const url = 'quietlycode.org';
  const urlDelay = 160;
  const urlChars = typewriter(frame, urlDelay, url, 1.0);
  const urlOpacity = fadeIn(frame, urlDelay, 10);

  // Platform icons fade in
  const platformDelay = 220;
  const platformOpacity = fadeIn(frame, platformDelay, 20);

  // Lifetime license text
  const licenseDelay = 250;
  const licenseOpacity = fadeIn(frame, licenseDelay, 15);
  const licenseScale = springScale(frame, fps, licenseDelay, { damping: 14 });

  // Expanding glow ring
  const ringScale = interpolate(frame, [75, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const ringOpacity = interpolate(frame, [75, 90, 120, 160], [0, 0.6, 0.4, 0.1], {
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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGlowStrong} 0%, transparent 60%)`,
          opacity: 0.3 * glow,
          filter: 'blur(80px)',
        }}
      />

      {/* Glow ring */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: `2px solid ${COLORS.accentPrimary}`,
          transform: `scale(${ringScale * 4})`,
          opacity: ringOpacity,
          boxShadow: `0 0 30px ${COLORS.accentGlowStrong}`,
        }}
      />

      {/* Amber shockwave on "YOUR RULES" */}
      {frame > 75 && (
        <div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `2px solid ${COLORS.warning}`,
            transform: `scale(${interpolate(frame, [75, 110], [0.5, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
            opacity: interpolate(frame, [75, 85, 110], [0, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        />
      )}

      {/* Manifesto words — slam in from sides */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 30 }}>
        {manifestoWords.map((word, i) => {
          const wordX = interpolate(frame, [word.delay, word.delay + 12], [word.x, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.back(1.5)),
          });
          const wordOpacity = fadeIn(frame, word.delay, 8);
          const wordScale = springScale(frame, fps, word.delay, { damping: 10, mass: 1.2, stiffness: 200 });

          // Impact flash
          const flashOpacity = interpolate(
            frame,
            [word.delay + 10, word.delay + 14, word.delay + 20],
            [0, 0.3, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div key={i} style={{ position: 'relative', textAlign: 'center', marginBottom: i < 2 ? 8 : 0 }}>
              {/* Impact flash */}
              <div
                style={{
                  position: 'absolute',
                  inset: -20,
                  backgroundColor: word.color,
                  opacity: flashOpacity,
                  borderRadius: 8,
                  filter: 'blur(20px)',
                }}
              />
              <h1
                style={{
                  fontSize: word.size,
                  fontWeight: 900,
                  color: word.color,
                  margin: 0,
                  letterSpacing: 6,
                  opacity: wordOpacity,
                  transform: `translateX(${wordX}px) scale(${wordScale})`,
                  textShadow: word.color === COLORS.warning
                    ? `0 0 30px rgba(251, 191, 36, 0.4)`
                    : `0 0 15px ${COLORS.accentGlow}`,
                  position: 'relative',
                }}
              >
                {word.text}
              </h1>
            </div>
          );
        })}
      </div>

      {/* Shield logo — settles at center, more prominent */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${logoSettleY}px)`,
          opacity: logoOpacity,
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={logo}
            alt="Quietly Logo"
            style={{
              width: 120,
              height: 'auto',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 ${10 * glow}px ${COLORS.accentGlowStrong})`,
            }}
          />
        </div>
      </div>

      {/* URL typewriter */}
      <p
        style={{
          fontSize: 26,
          fontWeight: 500,
          color: COLORS.accentSecondary,
          opacity: urlOpacity,
          margin: 0,
          marginBottom: 30,
          height: 36,
          zIndex: 10,
        }}
      >
        {url.slice(0, urlChars)}
        {urlChars < url.length && (
          <span
            style={{
              borderRight: `2px solid ${COLORS.accentPrimary}`,
              opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
              marginLeft: 2,
            }}
          />
        )}
      </p>

      {/* Platform icons + "Lifetime License. Available Now." */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          opacity: platformOpacity,
          zIndex: 10,
        }}
      >
        <LinuxIcon />
        <WindowsIcon />
        <AppleIcon />
      </div>

      <div
        style={{
          marginTop: 16,
          opacity: licenseOpacity,
          transform: `scale(${licenseScale})`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.textSecondary,
            letterSpacing: 2,
          }}
        >
          Lifetime License.{' '}
          <span style={{ color: COLORS.warning }}>Available Now.</span>
        </span>
      </div>
    </div>
  );
};
