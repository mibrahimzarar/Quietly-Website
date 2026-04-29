import React from 'react';
import { Composition } from 'remotion';
import { QuietlySovereignty } from './QuietlySovereignty';
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="QuietlySovereignty"
        component={QuietlySovereignty}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
