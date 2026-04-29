import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FPS, FONT_FAMILY } from './theme';
import { ColdOpen } from './scenes/v2/ColdOpen';
import { RentedReality } from './scenes/v2/RentedReality';
import { PermanentAsset } from './scenes/v2/PermanentAsset';
import { OfflineEngine } from './scenes/v2/OfflineEngine';
import { ChatBuddy } from './scenes/v2/ChatBuddy';
import { OfflineIDE } from './scenes/v2/OfflineIDE';
import { SovereigntyFinale } from './scenes/v2/SovereigntyFinale';
import logo from './components/LOGO.png';

// TIGHT scene timing — animations fill the entire duration, no dead air
// Each scene overlaps with next by 12 frames for seamless cross-dissolve
const OVERLAP = 12;

export const V2_SCENES = {
  coldOpen:          { start: 0,    duration: 300 },    // 0s–5s    (cold open)
  rentedReality:     { start: 288,  duration: 330 },   // 4.8s–10.3s (fast, punchy problem)
  permanentAsset:    { start: 606,  duration: 310 },   // 10.1s–15.1s
  offlineEngine:     { start: 904,  duration: 460 },   // 15.1s–22.7s (needs time for tech demo)
  chatBuddy:         { start: 1352, duration: 400 },   // 22.5s–29.2s
  offlineIDE:        { start: 1740, duration: 400 },   // 29.0s–35.7s
  sovereigntyFinale: { start: 2128, duration: 452 },   // 35.5s–42.5s (grand finale)
} as const;

// Smooth cross-dissolve between scenes (faster, 10-frame dissolve)
const SceneTransition: React.FC<{ startFrame: number; duration?: number }> = ({
  startFrame,
  duration = 10,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(
    frame,
    [startFrame - duration, startFrame - 2],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
  );
  const fadeOut = interpolate(
    frame,
    [startFrame - 2, startFrame + 8],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = Math.min(fadeIn, fadeOut);
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        opacity,
        zIndex: 50,
      }}
    />
  );
};

// Elegant particle field background
const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const x = (i * 137.5 + frame * 0.12 * ((i % 3) + 0.5)) % 1920;
    const y = (i * 89.3 + frame * 0.06 * ((i % 2) + 0.3)) % 1080;
    const size = 1.5 + (i % 3);
    const opacity = 0.03 + (i % 5) * 0.008;
    return { x, y, size, opacity };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: COLORS.accentPrimary,
            opacity: p.opacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Cinematic vignette
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)',
      pointerEvents: 'none',
      zIndex: 60,
    }}
  />
);

export const QuietlySovereignty: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        fontFamily: FONT_FAMILY,
      }}
    >
      <ParticleField />

        <Sequence from={V2_SCENES.coldOpen.start} durationInFrames={V2_SCENES.coldOpen.duration}>
          <AbsoluteFill><ColdOpen /></AbsoluteFill>
        </Sequence>

      <Sequence from={V2_SCENES.rentedReality.start} durationInFrames={V2_SCENES.rentedReality.duration}>
        <AbsoluteFill><RentedReality /></AbsoluteFill>
      </Sequence>

        <Sequence from={V2_SCENES.permanentAsset.start} durationInFrames={V2_SCENES.permanentAsset.duration}>
          <AbsoluteFill><PermanentAsset /></AbsoluteFill>
        </Sequence>

      <Sequence from={V2_SCENES.offlineEngine.start} durationInFrames={V2_SCENES.offlineEngine.duration}>
        <AbsoluteFill><OfflineEngine /></AbsoluteFill>
      </Sequence>

      <Sequence from={V2_SCENES.chatBuddy.start} durationInFrames={V2_SCENES.chatBuddy.duration}>
        <AbsoluteFill><ChatBuddy /></AbsoluteFill>
      </Sequence>

      <Sequence from={V2_SCENES.offlineIDE.start} durationInFrames={V2_SCENES.offlineIDE.duration}>
        <AbsoluteFill><OfflineIDE /></AbsoluteFill>
      </Sequence>

        <Sequence from={V2_SCENES.sovereigntyFinale.start} durationInFrames={V2_SCENES.sovereigntyFinale.duration}>
          <AbsoluteFill><SovereigntyFinale /></AbsoluteFill>
        </Sequence>

      {/* Quick cross-dissolves — no dead air */}
      <SceneTransition startFrame={V2_SCENES.rentedReality.start} />
      <SceneTransition startFrame={V2_SCENES.permanentAsset.start} />
      <SceneTransition startFrame={V2_SCENES.offlineEngine.start} />
      <SceneTransition startFrame={V2_SCENES.chatBuddy.start} />
      <SceneTransition startFrame={V2_SCENES.offlineIDE.start} />
      <SceneTransition startFrame={V2_SCENES.sovereigntyFinale.start} />

      <Vignette />
    </AbsoluteFill>
  );
};
