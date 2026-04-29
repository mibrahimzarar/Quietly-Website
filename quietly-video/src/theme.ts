export const COLORS = {
  bgPrimary: '#0f1019',
  bgSecondary: '#161722',
  bgTertiary: '#1c1d2b',
  bgElevated: '#22233a',

  accentPrimary: '#7c6cf0',
  accentSecondary: '#a8a0ff',
  accentGlow: 'rgba(124, 108, 240, 0.12)',
  accentGlowStrong: 'rgba(124, 108, 240, 0.25)',

  textPrimary: '#e8e8f0',
  textSecondary: '#9898b8',
  textMuted: '#686888',

  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',

  borderLight: 'rgba(255, 255, 255, 0.08)',
  borderAccent: '#7c6cf0',
} as const;

export const FPS = 60;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_SECONDS = 43;
export const TOTAL_FRAMES = FPS * DURATION_SECONDS; // 2580

// Scene frame ranges
export const SCENES = {
  coldOpen:        { start: 0,    end: 240 },   // 0s–4s
  theProblem:      { start: 240,  end: 600 },   // 4s–10s
  theSolution:     { start: 600,  end: 1080 },  // 10s–18s
  featureShowcase: { start: 1080, end: 1800 },  // 18s–30s
  platformParade:  { start: 1800, end: 2280 },  // 30s–38s
  closingCTA:      { start: 2280, end: 2700 },  // 38s–45s
} as const;

export const FONT_FAMILY = 'Inter, system-ui, -apple-system, sans-serif';
