declare module "@toon.rombaut/magnetic-elements" {
  interface MagneticOptions {
    distance?: number;
    duration?: number;
    ease?: string;
  }

  interface MagneticButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    options?: MagneticOptions;
  }

  export const MagneticButton: React.FC<MagneticButtonProps>;
}
