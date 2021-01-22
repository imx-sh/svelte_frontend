// import { dictionary, locale, _ } from 'svelte-i18n';
import { register, getLocaleFromNavigator , locale, init, _, time, date, number } from 'svelte-i18n';
import { derived } from 'svelte/store';
import ar from './ar.json';
import en from './en.json';


function setupI18n(spaceLocales = []) {

	register('ar', () => import('./ar.json'));
	register('en', () => import('./en.json'));
	/*spaceLocales.forEach(
		value => register(value, () => import("./en.json"));
	 );*/
	
	init({
		fallbackLocale: spaceLocales[0],
		initialLocale: _locale,
	});
}

const rtl = ["ar","fa","ur"]; // Arabic, Farsi, Urdu

const dir = derived(locale, $locale => rtl.indexOf($locale) >= 0  ? 'rtl' : 'ltr');

export { _, dir, setupI18n, time, date, number, locale };
