import {locale} from 'svelte-i18n';
import {website} from "./src/space_config";

function switchLocale(_locale) {
	if ( !(_locale in website.languages) ) {
		_locale = "en";
	}

	console.log ("Setting locale backend");
	locale.set(_locale);
}

function getPreferredLocale() {
	console.log("Getting locale backend");
	// Return the first locale in space config
	for (const key in website.languages) {
		return key; 
	}
	return "en";
}

export { switchLocale, getPreferredLocale };
