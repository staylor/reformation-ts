import { css } from 'emotion';
import themeUtils from 'styles/theme';

export const wrapperClass = css`
  background: ${themeUtils.color.white};
  display: block;
  min-height: 100vh;
`;

export const contentClass = css`
  margin: auto;
  padding: 8% 0 0;
  width: 320px;
`;

export const titleClass = css`
  color: ${themeUtils.color.dark};
  display: block;
  font-size: 54px;
  font-weight: ${themeUtils.font.weight.bold};
  letter-spacing: 0.3px;
  line-height: 54px;
  margin: 0 0 12px;
`;

export const formClass = css`
  background: ${themeUtils.color.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
  display: block;
  font-size: 14px;
  margin-top: 20px;
  padding: 26px 24px 46px;
`;

export const labelClass = css`
  letter-spacing: 0.2px;
`;

export const inputClass = css`
  background: #fbfbfb;
  border: 1px solid #ddd;
  border-radius: 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
  color: ${themeUtils.color.dark};
  font-size: 24px;
  margin: 2px 6px 16px 0;
  outline: none;
  padding: 3px;
  transition: 0.05s border-color ease-in-out;
  width: 100%;

  &:focus {
    border-color: ${themeUtils.color.dark};
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const buttonClass = css`
  apperance: none;
  background: ${themeUtils.color.white};
  border: 1px solid ${themeUtils.color.detail};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${themeUtils.color.text};
  cursor: pointer;
  font-size: 13px;
  height: 30px;
  line-height: 28px;
  padding: 0 12px 2px;
  vertical-align: baseline;
`;
