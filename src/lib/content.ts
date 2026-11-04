import es from '../content/es.json';
import en from '../content/en.json';
import copy from '../content/copy.json';
import labsData from '../content/labs.json';
import projectsData from '../content/projects.json';

// es.json / en.json hold career facts (copied by hand from the branding repo).
// copy.json holds the site copy (owned by this repo). A key must not exist in both.
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
	locale: string,
	facts: T,
	siteCopy: U,
): T & U {
	const merged: Record<string, unknown> = { ...facts };
	for (const [key, value] of Object.entries(siteCopy)) {
		const existing = merged[key];
		if (key in merged) {
			const bothObjects =
				typeof existing === 'object' && existing !== null && !Array.isArray(existing) &&
				typeof value === 'object' && value !== null && !Array.isArray(value);
			if (!bothObjects) throw new Error(`content: key "${key}" exists in both ${locale}.json and copy.json`);
			for (const sub of Object.keys(value as object)) {
				if (sub in (existing as object)) {
					throw new Error(`content: key "${key}.${sub}" exists in both ${locale}.json and copy.json`);
				}
			}
			merged[key] = { ...(existing as object), ...(value as object) };
		} else {
			merged[key] = value;
		}
	}
	return merged as T & U;
}

export const content = {
	es: merge('es', es, copy.es),
	en: merge('en', en, copy.en),
};

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

export type ProjectItem = {
	id: string;
	category: 'code' | 'apps';
	name: string;
	order: number;
	// Empty for now: no links until the category page exists.
	href?: string;
};

export const projects: ProjectItem[] = (projectsData as ProjectItem[]).slice().sort((a, b) => a.order - b.order);
