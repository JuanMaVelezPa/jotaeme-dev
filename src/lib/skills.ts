import site from '../content/site.json';
import es from '../content/es.json';
import en from '../content/en.json';

const content = { es, en } as const;
type Locale = keyof typeof content;

const flat = (locale: Locale) => content[locale].habilidades.flatMap((group) => group.items);

// Extra marquee labels, given in Spanish as written in profile.md. Each must exist in habilidades.
const extra = ['Kafka', 'PostgreSQL', 'Docker', 'Python', 'Maven'];

// Labels come from the real skills. A label found in the Spanish list is translated by position.
function localize(label: string, locale: Locale): string {
	const index = flat('es').indexOf(label);
	return index === -1 ? label : flat(locale)[index];
}

const mainLabels = (locale: Locale) => site.habilidades_principales.map((label) => localize(label, locale));

// The hero talks about backend, so the globe swaps Angular (frontend) for Kafka.
export function globeLabels(locale: Locale): string[] {
	if (!flat('es').includes('Kafka')) throw new Error('Globe label Kafka not in habilidades');
	return site.habilidades_principales.map((label) => localize(label === 'Angular' ? 'Kafka' : label, locale));
}

export function marqueeLabels(locale: Locale): string[] {
	const missing = extra.filter((label) => !flat('es').includes(label));
	if (missing.length > 0) throw new Error(`Marquee labels not in habilidades: ${missing.join(', ')}`);
	return [...mainLabels(locale), ...extra.map((label) => localize(label, locale))];
}
