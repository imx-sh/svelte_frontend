<!-- routify:options preload="proximity" -->
<script>
  import { _, locale, available_locales } from "../i18n";
  import { website } from "../space_config";
  import { switchLocale } from "../../locale-preference-browser.js";
  import { ButtonGroup, Button } from "sveltestrap";

  function selectLocale(_locale) {
    event.preventDefault();
    switchLocale(_locale);
  }
</script>

<p>
  <ButtonGroup>
    {#each Object.keys(website.languages) as key}
      <Button
        outline
        color="info"
        active={key == $locale}
        on:click={() => selectLocale(key)}>{key}</Button
      >
    {/each}
  </ButtonGroup>
</p>
<p>
  {$_("language")}: {$locale}
  <br />
  {available_locales.join()}
</p>

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
