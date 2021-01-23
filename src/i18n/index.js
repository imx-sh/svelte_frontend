// import { dictionary, locale, _ } from 'svelte-i18n';
import { addMessages, getLocaleFromNavigator , locale, init, _, time, date, number } from 'svelte-i18n';
import { derived } from 'svelte/store';
import ar from './ar.json';
import en from './en.json';

function setupI18n(spaceLocales = {"en" : "English"}) {
	let fallback_locale = null;
	let initial_locale = getLocaleFromNavigator();
	let initial_locale_match_found = false;
	for (const key in spaceLocales) {
		// Assign first locale as fallback
		if (fallback_locale == null) {
			fallback_locale = key; 
		}
		// Match User locale from browser to existing locale.
		if (!initial_locale_match_found && initial_locale.startsWith(key)) {
			initial_locale = key;
			initial_locale_match_found = true;
		}
		if(key == 'en') addMessages('en', en);
		if(key == 'ar') addMessages('ar', ar);
	}

	if (!initial_locale_match_found) {
		initial_locale = fallback_locale;
	}
	
	init({
		fallbackLocale: fallback_locale,
		initialLocale: initial_locale,
	});
}

const rtl = ["ar","fa","ur"]; // Arabic, Farsi, Urdu

const dir = derived(locale, $locale => rtl.indexOf($locale) >= 0  ? 'rtl' : 'ltr');
const isLocaleLoaded = derived(locale, $locale => typeof $locale === 'string');

export { _, dir, setupI18n, time, date, number, locale, isLocaleLoaded };
