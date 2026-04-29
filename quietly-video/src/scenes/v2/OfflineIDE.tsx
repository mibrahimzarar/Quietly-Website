import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, pulseGlow, typewriter } from '../../utils/animations';

/* ─── Colors ─── */
const IDE_BG = '#0f0f15';
const IDE_SIDEBAR = '#111118';
const IDE_PANEL = '#161720';
const IDE_EDITOR = '#0d0d14';
const IDE_TERMINAL = '#111118';
const IDE_TAB_ACTIVE = '#0d0d14';
const IDE_BORDER = 'rgba(255,255,255,0.06)';
const ACCENT = COLORS.accentPrimary;

/* ─── Traffic lights (macOS style) ─── */
const TrafficLights: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = fadeIn(frame, 8, 12);
  return (
    <div style={{ display: 'flex', gap: 7, opacity }}>
      {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c, opacity: 0.85 }} />
      ))}
    </div>
  );
};

/* ─── Activity bar (left icon strip) ─── */
const ActivityBar: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const icons = [
    { active: true },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ];

  return (
    <div style={{
      width: 42,
      backgroundColor: IDE_SIDEBAR,
      borderRight: `1px solid ${IDE_BORDER}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10,
      gap: 2,
      flexShrink: 0,
    }}>
      {icons.map((icon, i) => {
        const s = springScale(frame, fps, 15 + i * 5, { damping: 14 });
        return (
          <div key={i} style={{
            width: 34,
            height: 34,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: icon.active ? `2px solid ${ACCENT}` : '2px solid transparent',
            backgroundColor: icon.active ? 'rgba(124,108,240,0.1)' : 'transparent',
            transform: `scale(${s})`,
          }}>
            <div style={{
              width: 14,
              height: 14,
              borderRadius: i === 4 ? '50%' : 3,
              backgroundColor: icon.active ? ACCENT : COLORS.textMuted,
              opacity: icon.active ? 0.85 : 0.25,
            }} />
          </div>
        );
      })}
    </div>
  );
};

/* ─── File explorer ─── */
const FileExplorer: React.FC<{ frame: number }> = ({ frame }) => {
  const entries = [
    { name: 'src', folder: true, depth: 0 },
    { name: 'components', folder: true, depth: 1 },
    { name: 'Editor.tsx', folder: false, depth: 2 },
    { name: 'ChatPanel.tsx', folder: false, depth: 2 },
    { name: 'AIPanel.tsx', folder: false, depth: 2, active: true },
    { name: 'hooks', folder: true, depth: 1 },
    { name: 'useAI.ts', folder: false, depth: 2 },
    { name: 'store', folder: true, depth: 1 },
    { name: 'appSlice.ts', folder: false, depth: 2 },
    { name: 'package.json', folder: false, depth: 0 },
    { name: 'tsconfig.json', folder: false, depth: 0 },
  ];

  return (
    <div style={{
      width: 180,
      backgroundColor: IDE_PANEL,
      borderRight: `1px solid ${IDE_BORDER}`,
      padding: '10px 8px',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        color: COLORS.textMuted,
        letterSpacing: 1.8,
        textTransform: 'uppercase',
        padding: '4px 6px 10px',
      }}>
        Explorer
      </div>
      {entries.map((e, i) => {
        const op = fadeIn(frame, 18 + i * 3, 8);
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '3.5px 8px',
            marginLeft: e.depth * 12,
            borderRadius: 5,
            backgroundColor: e.active ? 'rgba(124,108,240,0.1)' : 'transparent',
            opacity: op,
            marginBottom: 1,
          }}>
            {e.folder ? (
              <svg width={10} height={10} viewBox="0 0 24 24" fill={COLORS.warning} opacity={0.6}>
                <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            ) : (
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                backgroundColor: e.active ? ACCENT : COLORS.textMuted,
                opacity: e.active ? 0.85 : 0.3,
              }} />
            )}
            <span style={{
              fontSize: 10.5,
              fontFamily: "'JetBrains Mono', monospace",
              color: e.active ? ACCENT : COLORS.textSecondary,
              fontWeight: e.active ? 600 : 400,
            }}>
              {e.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Tab bar ─── */
const TabBar: React.FC<{ frame: number }> = ({ frame }) => {
  const tabs = [
    { name: 'App.tsx', active: true },
    { name: 'AIPanel.tsx', active: false },
    { name: 'useAI.ts', active: false },
  ];

  return (
    <div style={{
      height: 34,
      backgroundColor: IDE_PANEL,
      borderBottom: `1px solid ${IDE_BORDER}`,
      display: 'flex',
      alignItems: 'flex-end',
      paddingLeft: 2,
    }}>
      {tabs.map((t, i) => (
        <div key={i} style={{
          padding: '6px 16px',
          backgroundColor: t.active ? IDE_TAB_ACTIVE : 'transparent',
          borderTop: t.active ? `2px solid ${ACCENT}` : '2px solid transparent',
          borderRadius: '5px 5px 0 0',
          opacity: fadeIn(frame, 15 + i * 8, 10),
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            backgroundColor: t.active ? ACCENT : COLORS.textMuted,
            opacity: t.active ? 0.7 : 0.25,
          }} />
          <span style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: t.active ? COLORS.textPrimary : COLORS.textMuted,
            fontWeight: t.active ? 500 : 400,
          }}>
            {t.name}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── Code editor pane ─── */
const CodeEditor: React.FC<{ frame: number }> = ({ frame }) => {
  const lines = [
    { text: 'export default function App() {', color: ACCENT, indent: 0 },
    { text: '  const [query, setQuery] = useState("");', color: COLORS.warning, indent: 1 },
    { text: '  const result = useAI(query);', color: COLORS.accentSecondary, indent: 1 },
    { text: '', color: 'transparent', indent: 0 },
    { text: '  return (', color: COLORS.textPrimary, indent: 1 },
    { text: '    <main className="editor">', color: COLORS.success, indent: 2 },
    { text: '      <CodeEditor value={result} />', color: COLORS.info, indent: 3 },
    { text: '      <AIPanel context={query} />', color: COLORS.accentSecondary, indent: 3 },
    { text: '    </main>', color: COLORS.success, indent: 2 },
    { text: '  );', color: COLORS.textPrimary, indent: 1 },
    { text: '}', color: ACCENT, indent: 0 },
  ];

  const visible = Math.min(Math.floor(Math.max(0, frame - 35) / 5), lines.length);

  return (
    <div style={{ flex: 1, padding: '16px 20px', position: 'relative', backgroundColor: IDE_EDITOR, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {lines.slice(0, visible).map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', height: 20 }}>
            <span style={{
              fontSize: 11,
              color: COLORS.textMuted,
              width: 26,
              textAlign: 'right',
              fontFamily: "'JetBrains Mono', monospace",
              opacity: 0.35,
            }}>
              {i + 1}
            </span>
            {line.text ? (
              <span style={{
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                color: line.color,
                opacity: 0.9,
                marginLeft: line.indent * 18,
                whiteSpace: 'pre' as const,
              }}>
                {line.text}
              </span>
            ) : <span />}
          </div>
        ))}

        {/* Cursor */}
        {visible < lines.length && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', height: 20 }}>
            <span style={{
              fontSize: 11, color: COLORS.textMuted, width: 26, textAlign: 'right',
              fontFamily: "'JetBrains Mono', monospace", opacity: 0.35,
            }}>
              {visible + 1}
            </span>
            <div style={{
              width: 2, height: 16,
              backgroundColor: ACCENT,
              borderRadius: 1,
              marginLeft: (lines[visible]?.indent ?? 0) * 18,
              opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
            }} />
          </div>
        )}
      </div>

      {/* Minimap */}
      <div style={{
        position: 'absolute', right: 12, top: 16,
        width: 40, display: 'flex', flexDirection: 'column', gap: 2.5,
        opacity: fadeIn(frame, 50, 15) * 0.2,
      }}>
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} style={{
            height: 2,
            width: `${20 + (i * 23) % 80}%`,
            backgroundColor: i < visible ? ACCENT : COLORS.textMuted,
            borderRadius: 1,
            opacity: i < visible ? 0.6 : 0.3,
          }} />
        ))}
      </div>
    </div>
  );
};

/* ─── Terminal panel ─── */
const TerminalPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const lines = [
    { text: '$ quietly dev', color: COLORS.success, delay: 85 },
    { text: '  ✓ Local AI Model: Qwen-2.5-Coder (4.2 GB)', color: COLORS.accentSecondary, delay: 105 },
    { text: '  ✓ Monaco Editor v0.48 ready', color: COLORS.textSecondary, delay: 118 },
    { text: '  ✓ AI Server: localhost:8765', color: COLORS.success, delay: 130 },
    { text: '  Ready — all systems offline ▸', color: COLORS.success, delay: 145 },
  ];

  return (
    <div style={{
      height: 130,
      backgroundColor: IDE_TERMINAL,
      borderTop: `1px solid ${IDE_BORDER}`,
      padding: '8px 16px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: 0.5 }}>TERMINAL</span>
        <span style={{ fontSize: 10, color: COLORS.textMuted }}>PROBLEMS</span>
        <span style={{ fontSize: 10, color: COLORS.textMuted }}>OUTPUT</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['×', '□', '−'].map((s, i) => (
            <div key={i} style={{
              width: 18, height: 18, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{ opacity: fadeIn(frame, line.delay, 8), marginBottom: 3 }}>
          <span style={{ fontSize: 11.5, color: line.color, fontFamily: "'JetBrains Mono', monospace" }}>
            {line.text}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── AI Assist panel (right sidebar) ─── */
const AIAssistPanel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const slideX = interpolate(frame, [60, 85], [200, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const opacity = fadeIn(frame, 60, 20);

  const suggestions = [
    { text: 'Add error boundary', icon: '⚡', color: COLORS.success, delay: 100 },
    { text: 'Optimize re-renders', icon: '⚙', color: COLORS.warning, delay: 120 },
    { text: 'Extract to custom hook', icon: '↗', color: COLORS.info, delay: 140 },
  ];

  return (
    <div style={{
      width: 200,
      backgroundColor: IDE_PANEL,
      borderLeft: `1px solid ${IDE_BORDER}`,
      padding: '12px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      opacity,
      transform: `translateX(${slideX}px)`,
      overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        color: COLORS.accentSecondary,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        padding: '2px 0 6px',
      }}>
        AI Suggestions
      </div>

      {suggestions.map((s, i) => {
        const scale = springScale(frame, fps, s.delay, { damping: 14 });
        return (
          <div key={i} style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(255,255,255,0.025)',
            border: `1px solid ${IDE_BORDER}`,
            borderLeft: `3px solid ${s.color}`,
            borderRadius: 8,
            transform: `scale(${scale})`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 12 }}>{s.icon}</span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.textPrimary,
            }}>
              {s.text}
            </span>
          </div>
        );
      })}

      {/* Inline completion preview */}
      <div style={{
        marginTop: 8,
        padding: '10px 12px',
        backgroundColor: 'rgba(124,108,240,0.06)',
        border: `1px solid rgba(124,108,240,0.15)`,
        borderRadius: 8,
        opacity: fadeIn(frame, 170, 15),
      }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: ACCENT, marginBottom: 6, letterSpacing: 0.5 }}>
          INLINE COMPLETION
        </div>
        <div style={{
          fontSize: 10.5,
          fontFamily: "'JetBrains Mono', monospace",
          color: COLORS.textMuted,
          lineHeight: 1.6,
        }}>
          <span style={{ color: COLORS.textSecondary }}>const</span>{' '}
          <span style={{ color: COLORS.accentSecondary }}>result</span>{' = '}
          <span style={{ color: ACCENT, opacity: 0.6 }}>await model.process(…)</span>
        </div>
      </div>

      {/* Offline badge */}
      <div style={{
        marginTop: 'auto',
        padding: '10px 12px',
        backgroundColor: 'rgba(52,211,153,0.06)',
        border: `1px solid rgba(52,211,153,0.15)`,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: fadeIn(frame, 165, 15),
        transform: `scale(${springScale(frame, fps, 165, { damping: 12 })})`,
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          backgroundColor: COLORS.success,
          boxShadow: `0 0 6px ${COLORS.success}`,
        }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.success }}>
          OFFLINE
        </span>
      </div>
    </div>
  );
};

/* ─── Status bar ─── */
const StatusBar: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = fadeIn(frame, 25, 15);
  return (
    <div style={{
      height: 24,
      backgroundColor: IDE_SIDEBAR,
      borderTop: `1px solid ${IDE_BORDER}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      opacity,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.success }} />
          <span style={{ fontSize: 10, color: COLORS.success }}>AI Connected</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <span style={{ fontSize: 10, color: COLORS.textMuted }}>TypeScript</span>
        <span style={{ fontSize: 10, color: COLORS.textMuted }}>UTF-8</span>
        <span style={{ fontSize: 10, color: COLORS.textMuted }}>Quietly</span>
      </div>
    </div>
  );
};

/* ─── Full IDE window ─── */
const IDEWindow: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = springScale(frame, fps, 5, { damping: 10, mass: 0.9, stiffness: 160 });
  const opacity = fadeIn(frame, 3, 18);

  return (
    <div style={{
      width: 1080,
      height: 660,
      borderRadius: 16,
      backgroundColor: IDE_BG,
      border: `1px solid ${IDE_BORDER}`,
      overflow: 'hidden',
      transform: `scale(${scale})`,
      opacity,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 20px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(168,160,255,0.06)`,
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent 10%, ${ACCENT}, ${COLORS.accentSecondary}, transparent 90%)`,
        opacity: 0.5,
      }} />

      {/* Title bar */}
      <div style={{
        height: 38,
        backgroundColor: IDE_SIDEBAR,
        borderBottom: `1px solid ${IDE_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 14,
        flexShrink: 0,
      }}>
        <TrafficLights frame={frame} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>
            Quietly — my-project
          </span>
        </div>
        <div style={{ width: 52 }} />
      </div>

      {/* Main body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <ActivityBar frame={frame} fps={fps} />
        <FileExplorer frame={frame} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TabBar frame={frame} />
          <CodeEditor frame={frame} />
          <TerminalPanel frame={frame} />
        </div>
        <AIAssistPanel frame={frame} fps={fps} />
      </div>

      {/* Status bar */}
      <StatusBar frame={frame} />
    </div>
  );
};

/* ─── Feature pill ─── */
const FeaturePill: React.FC<{
  text: string; icon: string;
  frame: number; fps: number; delay: number; color: string;
}> = ({ text, icon, frame, fps, delay, color }) => {
  const scale = springScale(frame, fps, delay, { damping: 12, mass: 0.5 });
  const opacity = fadeIn(frame, delay, 10);
  const floatY = Math.sin((frame - delay) * 0.025) * 3;

  return (
    <div style={{
      transform: `scale(${scale}) translateY(${floatY}px)`,
      opacity,
      padding: '8px 18px',
      backgroundColor: 'rgba(22,23,32,0.9)',
      border: `1px solid ${color}30`,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
      backdropFilter: 'blur(8px)',
    }}>
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.textPrimary }}>{text}</span>
    </div>
  );
};

/* ─── Exported scene ─── */
export const OfflineIDE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = pulseGlow(frame, 0.03, 0.12, 0.35);
  const labelOpacity = fadeIn(frame, 0, 12);

  const features = [
    { text: 'Monaco Editor', icon: '✦', color: ACCENT, delay: 195 },
    { text: 'Built-in Terminal', icon: '▸', color: COLORS.info, delay: 215 },
    { text: 'AI Inline Completion', icon: '⚡', color: COLORS.warning, delay: 235 },
  ];

  const headlineDelay = 275;
  const headlines = [
    { text: 'A Complete IDE.', color: COLORS.textPrimary, delay: headlineDelay },
    { text: '100% Offline.', color: COLORS.success, delay: headlineDelay + 10 },
    { text: 'Zero Compromise.', color: COLORS.accentSecondary, delay: headlineDelay + 20 },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: IDE_BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '40%',
        width: 800, height: 500,
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, ${COLORS.accentGlowStrong} 0%, transparent 55%)`,
        opacity: glow,
        filter: 'blur(100px)',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Diagonal grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, ${IDE_BORDER} 0px, ${IDE_BORDER} 1px, transparent 1px, transparent 80px)`,
        opacity: 0.06,
      }} />

      {/* Section label */}
      <div style={{ position: 'absolute', top: 40, opacity: labelOpacity }}>
        <span style={{
          fontSize: 13, fontWeight: 700,
          color: COLORS.accentSecondary,
          textTransform: 'uppercase',
          letterSpacing: 6,
        }}>
          The Offline IDE
        </span>
      </div>

      {/* IDE mockup */}
      <IDEWindow frame={frame} fps={fps} />

      {/* Feature pills */}
      <div style={{
        position: 'absolute', bottom: 105,
        display: 'flex', gap: 12,
      }}>
        {features.map((f, i) => (
          <FeaturePill key={i} {...f} frame={frame} fps={fps} />
        ))}
      </div>

      {/* Bottom headline */}
      <div style={{
        position: 'absolute', bottom: 50,
        display: 'flex', gap: 16,
      }}>
        {headlines.map((word, i) => {
          const wordScale = springScale(frame, fps, word.delay, { damping: 12, mass: 0.5 });
          const wordOpacity = fadeIn(frame, word.delay, 10);
          return (
            <span key={i} style={{
              fontSize: 32, fontWeight: 700,
              color: word.color,
              transform: `scale(${wordScale})`,
              opacity: wordOpacity,
              display: 'inline-block',
            }}>
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
