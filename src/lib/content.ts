import es from '../content/es.json';
import en from '../content/en.json';

export const content = { es, en } as const;

export function getLocale(locale: string | undefined): 'es' | 'en' {
	return locale === 'es' ? 'es' : 'en';
}
