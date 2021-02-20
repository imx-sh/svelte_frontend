<!-- routify:options preload="proximity" -->
<script>
  import { Col, Container, Row, Navbar } from "sveltestrap";
  import Header from "./_components/Header.svelte";
  import Sidebar from "./_components/Sidebar.svelte";

  /*
  import { _, switchLocale, locale, actual_locales } from "../i18n";
  import { website } from "../space_config";
  import { ButtonGroup, Button } from "sveltestrap";

  //let locales = available_locales.filter((x) => x in website.languages);
  //console.log(locales);

  function selectLocale(_locale) {
    event.preventDefault();
    switchLocale(_locale);
  }*/
</script>

<!--p>
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
</p-->
<Container
  fluid="{false}"
  class="d-flex flex-column border border-secondary position-relative p-0 h-100"
>
  <Row class="align-items-start w-100 " noGutters>
    <Col sm="12"><Header /></Col>
  </Row>
  <Row class="flex-grow-1 w-100 " noGutters>
    <Col sm="2" class="border border-success"><Sidebar /></Col>
    <Col sm="10" class="border border-primary"><slot /></Col>
  </Row>
  <Row class="align-items-end w-100  " noGutters>
    <Col sm="12" class="border border-warning"
      ><Navbar color="light" light>footer</Navbar></Col
    >
  </Row>
</Container>

<!--p>
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
</p-->
<style>
</style>
