<script>
  import { setupI18n, dir } from "./i18n";
  import { website } from "./space_config";
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<style  global>
  @import "../assets/global.css";
</style>

<Router {routes} />
