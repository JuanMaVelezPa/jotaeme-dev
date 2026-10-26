// Interface labels and anchors per language. Profile text lives in src/content/.
export const ui = {
	en: {
		about: { id: 'about', label: 'About' },
		experience: { id: 'experience', label: 'Experience and skills' },
		skills: 'Skills',
		services: { id: 'services', label: 'Services' },
		contact: { id: 'contact', label: 'Contact' },
		language: 'English version',
		nav: 'Main',
		skip: 'Skip to content',
		cv: { en: 'Download CV (English)', es: 'Download CV (Spanish)' },
	},
	es: {
		about: { id: 'sobre-mi', label: 'Sobre mí' },
		experience: { id: 'experiencia', label: 'Experiencia y habilidades' },
		skills: 'Habilidades',
		services: { id: 'servicios', label: 'Servicios' },
		contact: { id: 'contacto', label: 'Contacto' },
		language: 'Versión en español',
		nav: 'Principal',
		skip: 'Saltar al contenido',
		cv: { en: 'Descargar CV (inglés)', es: 'Descargar CV (español)' },
	},
} as const;
