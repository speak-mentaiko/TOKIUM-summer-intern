/** @type {import('tailwindcss').Config} */


module.exports = {
  mode: 'jit',
  // 以下コンフィグコピペ
  content: ['./src/**/*.{js,ts,jsx,tsx}','./index.html'],
  theme: {
    extend: {
      fontFamily: {
        'body': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      scale: {
        flip: '-1',
      },
      minHeight: {
        '100vh': '100vh',
      },
      borderWidth: {
        3: '3px',
        5: '5px',
      },
    },
    screens: {
      xs: '375px',
      sm: '600px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1360px',
    },
    maxWidth: {
      ...[...Array(1201)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      xs: '375px',
      sm: '600px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1360px',
      none: 'none',
    },
    minWidth: {
      ...[...Array(1201)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      xs: '375px',
      sm: '600px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1360px',
      none: 'none',
    },
    maxHeight: {
      ...[...Array(1201)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
    },
    minHeight: {
      ...[...Array(1201)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
    },
    borderRadius: {
      ...[...Array(32)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      '100vh': '100vh',
    },
    fontSize: {
      ...[...Array(101)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}vw`] = `${i}vw`;
        return m;
      }, {}),
    },
    padding: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      ...[...Array(5)].reduce((m, _, i) => {
        m[`${i}em`] = `${i}em`;
        return m;
      }, {}),
    },
    margin: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(1001)].reduce((m, _, i) => {
        m[`minus-${i}`] = `-${i}px`;
        return m;
      }, {}),
      auto: 'auto',
    },
    width: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      auto: 'auto',
      fit: 'fit-content',
    },
    height: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}vh`] = `${i}vh`;
        return m;
      }, {}),
      fit: 'fit-content',
    },
    lineHeight: {
      ...[...Array(101)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      '1em': '1em',
    },
    zIndex: {
      ...[...Array(10001)].reduce((m, _, i) => {
        m[i] = `${i}`;
        return m;
      }, {}),
      'minus-1': '-1',
      auto: 'auto',
    },
    translate: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(1001)].reduce((m, _, i) => {
        m[`minus-${i}`] = `-${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`minus-${i}p`] = `-${i}%`;
        return m;
      }, {}),
    },
    inset: {
      ...[...Array(1001)].reduce((m, _, i) => {
        m[i] = `${i}px`;
        return m;
      }, {}),
      ...[...Array(1001)].reduce((m, _, i) => {
        m[`minus-${i}`] = `-${i}px`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`${i}p`] = `${i}%`;
        return m;
      }, {}),
      ...[...Array(101)].reduce((m, _, i) => {
        m[`minus-${i}p`] = `-${i}%`;
        return m;
      }, {}),
      auto: 'auto',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};