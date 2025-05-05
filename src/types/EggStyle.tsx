export type EggStyleBase = {
  name: string;
  description: string;
  time: number;
  color: string;
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right';
};

export interface EggStyle extends EggStyleBase {
  bgClass: string;
  hoverClass: string;
  textClass: string;
  tooltipClass: string;
}

export function createEggStyle(base: EggStyleBase): EggStyle {
  return {
    ...base,
    bgClass: `bg-${base.color}-200`,
    hoverClass: `hover:bg-${base.color}-300`,
    textClass: `text-${base.color}-200`,
    tooltipClass: `tooltip tooltip-${base.tooltipPosition}`
  };
}