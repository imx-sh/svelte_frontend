<!-- routify:options preload="proximity" -->
<script>
	import { _, locale } from '../i18n';
  import { website } from "../space_config";
	function switchLocale(event) {
    event.preventDefault();
    ///dispatch('locale-changed', event.target.value);
		console.log(`Switching to locale : ${event.target.value}`);
		locale.set(event.target.value);
  }
</script>

<p>
{$_("language")} | {website.languages[$locale]}
</p>
<div class="choose-locale">
  <div class="select"> <select value={$locale} on:blur={switchLocale}>
      <option value="en">English</option>
      <option value="ar">عربي</option>
      <option value="fr">French</option>
    </select> </div>
</div>

<slot />
