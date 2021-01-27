<!-- routify:options preload="proximity" -->
<script>
  import { _, switchLocale, locale, actual_locales } from "../i18n";
  import { website } from "../space_config";
  import { ButtonGroup, Button } from "sveltestrap";

  //let locales = available_locales.filter((x) => x in website.languages);
  //console.log(locales);

  function selectLocale(_locale) {
    event.preventDefault();
    switchLocale(_locale);
  }
</script>

<p>
  <ButtonGroup>
    {#each actual_locales as key}
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
  {actual_locales.join()}
</p>

<slot scoped="" />

<style>
</style>
