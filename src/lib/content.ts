import es from '../content/es.json';
import en from '../content/en.json';
import labsData from '../content/labs.json';

export const content = { es, en } as const;

export function getLocale(locale: string | undefined): 'es' | 'en' {
	return locale === 'es' ? 'es' : 'en';
}

export type Lab = {
	id: string;
	icon?: string;
	order: number;
	status: 'active' | 'paused' | 'archived';
	access: 'public' | 'private';
	stack: string[];
	live?: string;
	repo?: string;
	es: LabText;
	en: LabText;
};

type LabText = { title: string; summary: string; highlights: string[] };

export const labs: Lab[] = (labsData as Lab[]).slice().sort((a, b) => a.order - b.order);
