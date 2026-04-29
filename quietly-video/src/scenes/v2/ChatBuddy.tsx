import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, FONT_FAMILY } from '../../theme';
import { springScale, fadeIn, typewriter, slideIn } from '../../utils/animations';

/* ─── ChatGPT-style standalone chat (full-screen, centered, clean) ─── */

const GPT_BG = '#0f0f15';
const GPT_PANEL = '#171720';
const GPT_INPUT_BG = '#1e1e2a';
const GPT_BORDER = 'rgba(255,255,255,0.06)';
const GPT_SIDEBAR_BG = '#111118';

/* ── Sidebar ── */
const Sidebar: React.FC<{ frame: number }> = ({ frame }) => {
  const slideX = interpolate(frame, [5, 30], [-220, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const opacity = fadeIn(frame, 5, 20);

  const sessions = [
    { title: 'Fix auth middleware', active: false, time: '2h ago' },
    { title: 'Optimize DB queries', active: false, time: '5h ago' },
    { title: 'Code privacy question', active: true, time: 'Now' },
  ];

  return (
    <div style={{
      width: 220,
      height: '100%',
      backgroundColor: GPT_SIDEBAR_BG,
      borderRight: `1px solid ${GPT_BORDER}`,
      display: 'flex',
      flexDirection: 'column',
      opacity,
      transform: `translateX(${slideX}px)`,
      flexShrink: 0,
    }}>
      {/* New chat button */}
      <div style={{
        padding: '16px 14px',
        borderBottom: `1px solid ${GPT_BORDER}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 10,
          border: `1px solid rgba(168,160,255,0.2)`,
          cursor: 'pointer',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={COLORS.accentSecondary} strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>New Chat</span>
        </div>
      </div>

      {/* Session list */}
      <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted, padding: '6px 8px', textTransform: 'uppercase', letterSpacing: 1 }}>
          Recent
        </div>
        {sessions.map((s, i) => {
          const itemOpacity = fadeIn(frame, 30 + i * 10, 15);
          return (
            <div key={i} style={{
              padding: '10px 12px',
              borderRadius: 8,
              backgroundColor: s.active ? 'rgba(168,160,255,0.1)' : 'transparent',
              opacity: itemOpacity,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
              <span style={{
                fontSize: 12.5,
                fontWeight: s.active ? 600 : 400,
                color: s.active ? COLORS.accentSecondary : COLORS.textSecondary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap' as const,
              }}>{s.title}</span>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>{s.time}</span>
            </div>
          );
        })}
      </div>

      {/* Model indicator */}
      <div style={{
        padding: '14px',
        borderTop: `1px solid ${GPT_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: COLORS.success,
          boxShadow: `0 0 6px ${COLORS.success}`,
        }} />
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>gemma-2-2b · Local</span>
      </div>
    </div>
  );
};

/* ── Message row (ChatGPT-style: icon + text, full width) ── */
const MessageRow: React.FC<{
  frame: number;
  delay: number;
  role: 'user' | 'assistant';
  text: string;
  typing?: boolean;
}> = ({ frame, delay, role, text, typing }) => {
  const opacity = fadeIn(frame, delay, 15);
  const slideY = interpolate(frame, [delay, delay + 20], [16, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const isAssistant = role === 'assistant';
  const visibleChars = typing
    ? typewriter(frame, delay + 10, text, 1.4)
    : text.length;
  const displayText = text.slice(0, visibleChars);

  const showCursor = typing && visibleChars < text.length && frame > delay + 10;

  return (
    <div style={{
      opacity,
      transform: `translateY(${slideY}px)`,
      padding: '20px 0',
      borderBottom: `1px solid ${GPT_BORDER}`,
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    }}>
      {/* Avatar */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: isAssistant ? 8 : '50%',
        backgroundColor: isAssistant ? COLORS.accentPrimary : '#2a2a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {isAssistant ? (
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Q</span>
        ) : (
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSecondary }}>→</span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          color: isAssistant ? COLORS.accentSecondary : COLORS.textSecondary,
          marginBottom: 6,
        }}>
          {isAssistant ? 'Quietly AI' : 'You'}
        </div>
        <div style={{
          fontSize: 14.5,
          lineHeight: 1.65,
          color: COLORS.textPrimary,
          fontFamily: FONT_FAMILY,
        }}>
          {displayText}
          {showCursor && (
            <span style={{
              display: 'inline-block',
              width: 2,
              height: 16,
              backgroundColor: COLORS.accentPrimary,
              marginLeft: 1,
              verticalAlign: 'text-bottom',
              opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
            }} />
          )}
        </div>

        {/* Action buttons for assistant messages */}
        {isAssistant && visibleChars >= text.length && (
          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 10,
            opacity: fadeIn(frame, delay + Math.ceil(text.length / 1.4) + 15, 15),
          }}>
            {['Copy', 'Regenerate'].map((label) => (
              <div key={label} style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: `1px solid ${GPT_BORDER}`,
                fontSize: 11,
                color: COLORS.textMuted,
                cursor: 'pointer',
              }}>
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Input bar (ChatGPT capsule style) ── */
const InputBar: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = fadeIn(frame, 15, 20);
  const slideY = interpolate(frame, [15, 40], [30, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const placeholderText = 'Message Quietly AI...';
  const typedPlaceholder = placeholderText.slice(0, typewriter(frame, 250, placeholderText, 0.6));

  const glowOpacity = interpolate(
    Math.sin(frame * 0.04), [-1, 1], [0.15, 0.4],
  );

  return (
    <div style={{
      opacity,
      transform: `translateY(${slideY}px)`,
      padding: '16px 0 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 680,
        position: 'relative',
      }}>
        {/* Glow behind input */}
        <div style={{
          position: 'absolute',
          inset: -2,
          borderRadius: 18,
          background: `linear-gradient(135deg, rgba(168,160,255,${glowOpacity}), rgba(124,108,240,${glowOpacity * 0.6}))`,
          filter: 'blur(8px)',
          opacity: 0.5,
        }} />

        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: GPT_INPUT_BG,
          border: `1.5px solid rgba(168,160,255,0.25)`,
          borderRadius: 16,
          padding: '14px 16px',
          gap: 12,
        }}>
          {/* Attach icon */}
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.5">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>

          <span style={{
            flex: 1,
            fontSize: 14,
            color: COLORS.textMuted,
            fontFamily: FONT_FAMILY,
          }}>
            {typedPlaceholder}
            {frame > 250 && typedPlaceholder.length < placeholderText.length && (
              <span style={{
                display: 'inline-block',
                width: 1.5,
                height: 14,
                backgroundColor: COLORS.textMuted,
                marginLeft: 1,
                verticalAlign: 'text-bottom',
                opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
              }} />
            )}
          </span>

          {/* Model pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 8,
            backgroundColor: 'rgba(168,160,255,0.08)',
            border: `1px solid rgba(168,160,255,0.15)`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.success }} />
            <span style={{ fontSize: 11, color: COLORS.textMuted, whiteSpace: 'nowrap' as const }}>gemma-2-2b</span>
          </div>

          {/* Send button */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: COLORS.accentPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>

      <span style={{ fontSize: 11, color: COLORS.textMuted, opacity: 0.5 }}>
        Quietly AI runs entirely on your machine. Your data never leaves.
      </span>
    </div>
  );
};

/* ── Main chat area ── */
const ChatArea: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = fadeIn(frame, 10, 20);

  const userQuestion = 'How does Quietly ensure my code stays private when using AI features?';
  const assistantAnswer =
    'All AI processing in Quietly happens locally on your machine using models you download and own. ' +
    'Your code, prompts, and responses never leave your device — there are no API calls to external servers. ' +
    'This means full privacy compliance, zero latency from network round-trips, and complete data sovereignty.';

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      opacity,
      backgroundColor: GPT_BG,
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '14px 24px',
        borderBottom: `1px solid ${GPT_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>
            Code privacy question
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            padding: '5px 12px',
            borderRadius: 8,
            backgroundColor: 'rgba(52,211,153,0.08)',
            border: `1px solid rgba(52,211,153,0.2)`,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.success, boxShadow: `0 0 4px ${COLORS.success}` }} />
            <span style={{ fontSize: 11, color: COLORS.success, fontWeight: 500 }}>Connected</span>
          </div>
        </div>
      </div>

      {/* Messages scroll area */}
      <div style={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
          padding: '8px 24px',
          flex: 1,
        }}>
          <MessageRow frame={frame} delay={40} role="user" text={userQuestion} />
          <MessageRow frame={frame} delay={80} role="assistant" text={assistantAnswer} typing />
        </div>
      </div>

      {/* Input */}
      <div style={{
        maxWidth: 720,
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <InputBar frame={frame} />
      </div>
    </div>
  );
};

/* ── Exported scene ── */
export const ChatBuddy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textDelay = 290;
  const textOpacity = fadeIn(frame, textDelay, 20);

  const words = [
    { text: 'Standalone Chat Buddy.', color: COLORS.textPrimary, delay: textDelay },
    { text: 'Context-Aware.', color: COLORS.accentSecondary, delay: textDelay + 10 },
    { text: 'Private by Design.', color: COLORS.success, delay: textDelay + 20 },
  ];

  const containerScale = interpolate(frame, [0, 25], [0.96, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: GPT_BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${COLORS.accentGlowStrong} 0%, transparent 60%)`,
        opacity: 0.2,
        filter: 'blur(80px)',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Chat interface mockup */}
      <div style={{
        width: 1080,
        height: 660,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        border: `1px solid ${GPT_BORDER}`,
        boxShadow: `0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,160,255,0.06)`,
        transform: `scale(${containerScale})`,
      }}>
        <Sidebar frame={frame} />
        <ChatArea frame={frame} fps={fps} />
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 55,
        display: 'flex',
        gap: 14,
        opacity: textOpacity,
      }}>
        {words.map((word, i) => {
          const wordScale = springScale(frame, fps, word.delay, { damping: 12, mass: 0.5 });
          return (
            <span
              key={i}
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: word.color,
                transform: `scale(${wordScale})`,
                display: 'inline-block',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
