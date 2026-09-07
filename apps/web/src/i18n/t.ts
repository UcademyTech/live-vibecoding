import { es } from './es';

export type TTranslationKey = keyof typeof es;

export const t = (key: TTranslationKey): string => es[key];
