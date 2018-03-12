import { css, keyframes } from 'emotion';
import styled from 'react-emotion';
import themeUtils from 'styles/theme';

export type LoadingProps = {
  compact: boolean;
};

export const Container = styled.div<LoadingProps>(({ compact }) => ({
  background: themeUtils.color.white,
  minHeight: compact ? '100px' : '300px',
  padding: compact ? '50px 0 0' : '100px 0 0',
}));

export const Wrap = styled.div<LoadingProps>(({ compact }) => ({
  height: '40px',
  margin: compact ? '0 0 0 40px' : '0 auto',
  position: 'relative',
  width: '40px',
}));

const bounce = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`;

const bouncing = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${themeUtils.color.dark};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;
`;

export const bounce1 = css`
  ${bouncing};
`;
export const bounce2 = css`
  ${bouncing};
  animation-delay: -1s;
`;
