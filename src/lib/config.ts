export const CONFIG = {
  ease: {
    primary: 'power3.out',
    cinematic: 'power4.inOut',
    sharp: 'expo.out',
    organic: 'sine.inOut',
    snap: 'expo.inOut',
  },
  duration: {
    xs: 0.15,
    sm: 0.35,
    md: 0.6,
    lg: 1.0,
    xl: 1.4,
    xxl: 2.0,
  },
  stagger: {
    chars: 0.025,
    words: 0.06,
    lines: 0.1,
    items: 0.1,
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
  },
} as const
