<!-- routify:options preload="proximity" -->
<script>
  import { _, locale, available_locales } from "../i18n";
  import { website } from "../space_config";
  import { switchLocale } from "../../locale-preference-browser.js";
  import { ButtonGroup, Button } from "sveltestrap";

	let locales = available_locales.filter(x => x in website.languages);
	console.log(locales);

  function selectLocale(_locale) {
    event.preventDefault();
    switchLocale(_locale);
  }
</script>

<p>
  <ButtonGroup>
    {#each locales as key}
      <Button
        outline
        color="info"
        active="{key == $locale}"
        on:click="{() => selectLocale(key)}">{key}</Button
      >
    {/each}
  </ButtonGroup>
</p>
<p>
  {$_("language")}: {$locale}
  <br />
  {available_locales.join()}
</p>

<slot />

<style>
</style>
