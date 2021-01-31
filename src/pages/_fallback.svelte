<script>
  import { url, leftover, goto } from "@roxi/routify";
  import { actual_locales, switchLocale } from "../i18n";

  const [language, ...fragments] = $leftover.split("/");
  if (actual_locales.includes(language)) {
    console.log(`Switching to language ${language}`);
    switchLocale(language);
  }

  const path = fragments.join("/");
  $goto(`/${path}`);
</script>

<!--
<div class="e404">
  <div class="huge">404</div>
  <div class="big">
    Page not found.
    <a href="{$url('../')}">Go back</a>
  </div>
</div><style>
  .huge {
    font-size: 12rem;
  }
  .e404 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>-->
