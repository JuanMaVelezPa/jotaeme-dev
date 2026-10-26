import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

const locales = ['en', 'es'] as const;

export const GET: APIRoute = ({ site }) => {
	const url = (lang: string) => new URL(getRelativeLocaleUrl(lang), site).href;
	const alternates = [
		...locales.map(
			(lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang)}"/>`,
		),
		`<xhtml:link rel="alternate" hreflang="x-default" href="${url('en')}"/>`,
	].join('');
	const entries = locales
		.map((lang) => `<url><loc>${url(lang)}</loc>${alternates}</url>`)
		.join('');
	const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
