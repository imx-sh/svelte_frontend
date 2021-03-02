<script>
  import { Navbar, NavbarBrand } from "sveltestrap";
  import SelectLanguage from "../managed/_components/SelectLanguage.svelte";
  import { website } from "../../space_config";
</script>

<Navbar class=" px-3 mt-3 " color="light" light >
<SelectLanguage />
{website.footer}
<NavbarBrand href="/">{website.display_name}</NavbarBrand>
<!--ButtonGroup>
  {#each actual_locales as key}
    <Button
      outline
      color="info"
      active="{key == $locale}"
      on:click="{() => selectLocale(key)}">{key}</Button
    >
  {/each}
</ButtonGroup-->
</Navbar>
