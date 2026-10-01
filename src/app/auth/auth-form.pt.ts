/**
 * PrimeNG PassThrough dùng chung cho form auth (input + nút submit) — giá trị design token
 * áp thẳng vào DOM, cùng giao diện với trang đăng nhập.
 */
export const AUTH_INPUT_PT = {
  root: {
    style: `
      width: 100%;
      height: 50px;
      padding: 0 14px 0 44px;
      border: 1.5px solid var(--color-border-input);
      border-radius: 14px;
      background: var(--color-bg-input);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      color: var(--color-text);
      letter-spacing: var(--tracking-base);
      transition: all 0.2s;
      outline: none;
      box-shadow: none;
    `,
  },
};

export const AUTH_SUBMIT_PT = {
  root: {
    style: `
      width: 100%;
      height: 50px;
      border: none;
      border-radius: 14px;
      background: var(--color-primary);
      color: var(--color-bg);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: var(--tracking-base);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `,
  },
};
