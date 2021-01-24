import {getLocaleFromNavigator, locale} from 'svelte-i18n';
import {website} from "./src/space_config";

function switchLocale(_locale) {
	if ( !(_locale in website.languages) ) {
		_locale = "en";
	}

	localStorage.setItem("preferred_locale", JSON.stringify(_locale));
	//console.log (`Setting locale to: ${JSON.parse(localStorage.getItem("preferred_locale"))}`);
	locale.set(_locale);
}

function getPreferredLocale() {
	if(localStorage.getItem("preferred_locale")) {
		//console.log(`Preferred language: ${JSON.parse(localStorage.getItem("preferred_locale"))}`);
		return JSON.parse(localStorage.getItem("preferred_locale"));
	}

	let fallback = null;
	let _locale = getLocaleFromNavigator();
	let _locale_found =  false;

	for (const key in website.languages) {
		// Assign first locale as fallback
		if (fallback == null) {
			fallback = key; 
		}
		// Match User locale from browser to existing locale.
		if (!_locale_found && _locale.startsWith(key)) {
			_locale = key;
			_locale_found = true;
		}
	}

	if (!_locale_found) {
		_locale = fallback;
	}

	if (!_locale) {
		_locale = "en";
	}

	localStorage.setItem("preferred_locale", JSON.stringify(_locale));
	return _locale;
}

export { switchLocale, getPreferredLocale };

