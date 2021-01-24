// import { dictionary, locale, _ } from 'svelte-i18n';
import { addMessages, locale, init, _, time, date, number } from 'svelte-i18n';
import { derived } from 'svelte/store';
import { getPreferredLocale } from "../../locale-preference-browser.js";

// Add all ./xx.json localizations here
import ar from './ar.json';
import en from './en.json';
addMessages('ar', ar);
addMessages('en', en);
let l17ns = {"ar": ar, "en": en};
let available_locales = ["ar", "en"];

function setupI18n() {

	let _locale = getPreferredLocale();

	if (!(_locale in l17ns)) {
		_locale = "en";
	}

	init({
		initialLocale: _locale,
		fallbackLocale: "en"
	});
}

const rtl = ["ar","fa","ur"]; // Arabic, Farsi, Urdu

const dir = derived(locale, $locale => rtl.indexOf($locale) >= 0  ? 'rtl' : 'ltr');
const isLocaleLoaded = derived(locale, $locale => typeof $locale === 'string');

export { _, dir, setupI18n, time, date, number, locale, isLocaleLoaded, available_locales };
