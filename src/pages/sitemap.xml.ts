import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

const locales = ['en', 'es'] as const;
// '' is the home; other pages use the same trailing-slash form as their canonical.
const pages = ['', 'lab/'];

export const GET: APIRoute = ({ site }) => {
	const lastmod = new Date().toISOString().slice(0, 10);
	const entries = pages
		.map((path) => {
			const url = (lang: string) => new URL(getRelativeLocaleUrl(lang, path), site).href;
			const alternates = [
				...locales.map(
					(lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang)}"/>`,
				),
				`<xhtml:link rel="alternate" hreflang="x-default" href="${url('en')}"/>`,
			].join('');
			return locales
				.map((lang) => `<url><loc>${url(lang)}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`)
				.join('');
		})
		.join('');
	const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
