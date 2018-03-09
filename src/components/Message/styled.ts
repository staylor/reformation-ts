import { css } from 'emotion';
import themeUtils from 'styles/theme';

export const messageWrapClass = css`
  background: ${themeUtils.color.background};
  border-left: 4px solid ${themeUtils.color.pink};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  display: block;
  margin: 5px 0 15px;
  padding: 1px 38px 1px 12px;
  position: relative;
`;

export const messageTextClass = css`
  color: ${themeUtils.color.dark};
  font-size: 13px;
  line-height: 1.5;
  margin: 0.5em 0;
  padding: 2px;
`;

export const dismissButtonClass = css`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 9px;
  position: absolute;
  right: 1px;
  top: 0;

  &::before {
    background: none;
    color: ${themeUtils.color.text};
    content: '✕';
    display: block;
    font: normal 16px/20px sans-serif;
    height: 20px;
    speak: none;
    text-align: center;
    width: 20px;
  }
`;
