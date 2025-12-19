export interface Spark {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

export enum IntroState {
  INIT = 'INIT', // Black screen
  SPARK_TEXT = 'SPARK_TEXT', // "It just takes a spark"
  LOGO_RISE = 'LOGO_RISE', // Motiflux Logo
  MANTRA = 'MANTRA', // "Possess the power..."
  COMPLETE = 'COMPLETE' // Show website
}
