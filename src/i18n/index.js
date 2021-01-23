// import { dictionary, locale, _ } from 'svelte-i18n';
import { addMessages, getLocaleFromNavigator , locale, init, _, time, date, number } from 'svelte-i18n';
import { derived } from 'svelte/store';
import ar from './ar.json';
import en from './en.json';

function setupI18n(spaceLocales = {"en" : "English"}) {
	let fallback_locale = null;
	for (const key in spaceLocales) {
		if (fallback_locale == null) {
			fallback_locale = key; // Assign first locale as fallback
			if(key == 'en') addMessages('en', en);
			if(key == 'ar') addMessages('ar', ar);
		}
	}
	
	init({
		fallbackLocale: fallback_locale,
		initialLocale: getLocaleFromNavigator(),
	});
}

const rtl = ["ar","fa","ur"]; // Arabic, Farsi, Urdu

const dir = derived(locale, $locale => rtl.indexOf($locale) >= 0  ? 'rtl' : 'ltr');

export { _, dir, setupI18n, time, date, number, locale };
