<!-- routify:options preload="proximity" -->
<script>
	import { _, locale } from '../i18n';
  import { website } from "../space_config";
	import { ButtonGroup, Button} from 'sveltestrap';

	function switchLocale(_locale) {
    event.preventDefault();
		//console.log(`Switching to locale : ${_locale}`);
		locale.set(_locale);
  }
</script>

<p>
<ButtonGroup>
{#each Object.keys(website.languages) as key}
	<Button outline color="info" active={key == $locale} on:click={() => switchLocale(key) }>{key}</Button>
{/each}
</ButtonGroup>


</p>
<span>
{$_("language")}: {$locale}
</span>

<!--div class="choose-locale">
  <div class="select"> <select value={$locale} on:blur={switchLocale}>
      <option value="en">English</option>
      <option value="ar">عربي</option>
      <option value="fr">French</option>
    </select> </div>
</div-->

<slot />

<style>
/*a {
	text-decoration: none;
}*/

</style>
