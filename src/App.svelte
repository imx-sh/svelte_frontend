<script>
  import { setupI18n, dir } from "./i18n";
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  setupI18n(); 
  $: { 
		document.dir = $dir; 
		let head = document.getElementsByTagName('HEAD')[0];
		
		let old_bootstrap = document.getElementById("bootstrap");
		if(old_bootstrap) {
			head.removeChild(old_bootstrap);
		}
		let bootstrap = document.createElement('link');
		bootstrap.id = "bootstrap";
		bootstrap.rel = 'stylesheet';
		bootstrap.type = 'text/css';

		let old_fonts = document.getElementById("fonts");
		if(old_fonts) {
			head.removeChild(old_fonts);
		}
		let fonts = document.createElement('link');
		fonts.id = "fonts";
		fonts.rel = 'stylesheet';
		fonts.type = 'text/css';

		if($dir == "rtl") {
			bootstrap.href = '/bootstrap.rtl.min.css';
			fonts.href='/fonts/rtl_fonts.css';
		} else {
			bootstrap.href = '/bootstrap.min.css';
			fonts.href='/fonts/fonts.css';
		}

		head.appendChild(bootstrap);
		head.appendChild(fonts);
	}
</script>

<style  global>
  @import "../assets/global.css";
</style>

<Router {routes} />
