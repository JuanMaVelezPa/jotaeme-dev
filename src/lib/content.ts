import es from '../content/es.json';
import en from '../content/en.json';
import copy from '../content/copy.json';
import labsData from '../content/labs.json';
import codeData from '../content/code.json';
import appsData from '../content/apps.json';
import privacyData from '../content/privacy.json';

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

// code.json and apps.json share this shape and are owned by this repo, like labs.json.
// 'soon': listed in the Projects menu with a Soon tag, not shown on the category page.
export type Project = {
	id: string;
	order: number;
	status: 'active' | 'soon';
	tags?: ('client' | 'free' | 'paid' | 'production')[];
	stack: string[];
	links?: { kind: 'live' | 'repo' | 'docs' | 'metrics'; href: string }[];
	images?: { src: string; width: number; height: number }[];
	diagram?: 'mcp';
	facts?: string[];
	es: ProjectText;
	en: ProjectText;
};

type ProjectText = {
	title: string;
	summary: string;
	highlights: string[];
	note?: string;
	alts?: string[];
	factLabels?: string[];
	// Client-facing case (apps): when `asks` is present, the card leads with the outcome and
	// keeps highlights, facts, stack and diagram under "Technical details".
	how?: string;
	asks?: string[];
	trust?: string[];
};

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

export const code: Project[] = (codeData as Project[]).slice().sort(byOrder);
export const apps: Project[] = (appsData as Project[]).slice().sort(byOrder);

type PrivacySection = { title: string; paragraphs: string[]; links?: { label: string; href: string }[] };
type PrivacyText = { intro: string; sections: PrivacySection[] };

// Privacy policy text, owned by this repo. "{email}" is replaced with the contact address.
export const privacy = privacyData as { updated: string; es: PrivacyText; en: PrivacyText };
