import { interpolate, spring, Easing } from 'remotion';

/** Bouncy overshoot easing — cubic-bezier(0.34, 1.56, 0.64, 1) approximation */
export function bounceIn(frame: number, start: number, duration: number): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => {
      // Custom overshoot curve
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
  });
}

/** Spring-based scale animation (0 → 1 with overshoot) */
export function springScale(
  frame: number,
  fps: number,
  delay: number = 0,
  config?: { damping?: number; mass?: number; stiffness?: number }
): number {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      damping: config?.damping ?? 12,
      mass: config?.mass ?? 0.8,
      stiffness: config?.stiffness ?? 180,
    },
  });
}

/** Fade in with optional delay */
export function fadeIn(
  frame: number,
  start: number,
  duration: number = 15
): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Fade out */
export function fadeOut(
  frame: number,
  start: number,
  duration: number = 15
): number {
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Slide in from direction */
export function slideIn(
  frame: number,
  start: number,
  duration: number = 20,
  distance: number = 100,
): number {
  return interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.7)),
  });
}

/** Slide out to direction */
export function slideOut(
  frame: number,
  start: number,
  duration: number = 15,
  distance: number = -100,
): number {
  return interpolate(frame, [start, start + duration], [0, distance], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });
}

/** Typewriter character count */
export function typewriter(
  frame: number,
  start: number,
  text: string,
  charsPerFrame: number = 0.8,
): number {
  const elapsed = Math.max(0, frame - start);
  return Math.min(Math.floor(elapsed * charsPerFrame), text.length);
}

/** Pulse glow opacity (0.5 → 1 → 0.5) */
export function pulseGlow(
  frame: number,
  speed: number = 0.05,
  min: number = 0.3,
  max: number = 1.0,
): number {
  const range = max - min;
  return min + range * (0.5 + 0.5 * Math.sin(frame * speed));
}

/** Stagger delay for array items */
export function staggerDelay(index: number, delayPerItem: number = 8): number {
  return index * delayPerItem;
}

/** Clip-path reveal left to right */
export function clipRevealX(
  frame: number,
  start: number,
  duration: number = 20,
): string {
  const progress = interpolate(frame, [start, start + duration], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  return `inset(0 ${100 - progress}% 0 0)`;
}

/** Horizontal wipe transition (returns clipPath for overlay) */
export function horizontalWipe(
  frame: number,
  start: number,
  duration: number = 30,
): string {
  const progress = interpolate(frame, [start, start + duration], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  return `inset(0 ${progress}% 0 0)`;
}
