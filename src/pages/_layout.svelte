<!-- routify:options preload="proximity" -->
<script>
	import { _, locale } from '../i18n';
  import { website } from "../space_config";
		import { Badge } from 'sveltestrap';
	function switchLocale(event) {
    event.preventDefault();
    ///dispatch('locale-changed', event.target.value);
		console.log(`Switching to locale : ${event.target.value}`);
		locale.set(event.target.value);
  }
</script>

<p>
{$_("language")}:
{#each Object.keys(website.languages) as key}
	<Badge href="#" color="info">{key}</Badge>
{/each}


</p>
<div class="choose-locale">
  <div class="select"> <select value={$locale} on:blur={switchLocale}>
      <option value="en">English</option>
      <option value="ar">عربي</option>
      <option value="fr">French</option>
    </select> </div>
</div>

<slot />

<style>
a {
	text-decoration: none;
}

</style>
