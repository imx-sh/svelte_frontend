<script>
  import { setupI18n, dir } from "./i18n";
  import { website } from "./space_config";
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  setupI18n(website.languages);
  $: { 
		document.dir = $dir; 
		let head = document.getElementsByTagName('HEAD')[0];
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		if($dir == "rtl") {
			link.href = '/bootstrap-rtl.min.css';
			let rtl_fonts = document.createElement('link');
			rtl_fonts.href='/fonts/rtl_fonts.css';
			rtl_fonts.rel='stylesheet';
			rtl_fonts.type='text/css';
			head.appendChild(rtl_fonts);
		} else {
			link.href = '/bootstrap.min.css';
		}

		head.appendChild(link);
	}
</script>

<style  global>
  @import "../assets/global.css";
</style>

<Router {routes} />
