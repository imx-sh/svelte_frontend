<script>
  import { entries } from '../../_stores/entries.js';
  import { imx_entries } from '../../../imx.js';
  import active_section from "../_stores/active_section.js";
  import { _ } from "../../../i18n";
  import { ready } from "@roxi/routify";

	let title_height;

  let queryType = "subpath";
  let resourceTypes = ["folder", "post", "media"];
  let shortnames = [];
  let search = "";
  let subpath = "posts";
  let max_returned_items = 100;
  let imx_request;

  $: {
      imx_request = imx_entries(
          subpath, 
          resourceTypes, 
          shortnames,
          queryType,
          search,
          max_returned_items).then( (_entries) => {
              _entries.forEach( (entry) => {
                  let file = { data: entry };
                  if(entry.resource_type == "folder") {
                      file.files=[];
                      file.data.subpath=`${entry.subpath}/${entry.shortname}`
                      file.expande = false;
                      file.loaded = false;
                    }
                  entries.add(entry.subpath.split("/").filter(x => x!=""), file);
                  //console.log(file);

                });
              $ready();
            });
    }

</script>

<div bind:clientHeight="{title_height}">
  <h6 class="my-0"> 
    {#if "name" in $active_section}
      {$_($active_section.name)} 
    {/if}
  </h6>
	<hr class="my-0" />
</div>
<div style="height: calc(100% - {title_height + 4}px); overflow: hidden auto;">
	<p> some content here </p>
    <pre>{ JSON.stringify($entries, undefined, 2)}</pre>
</div>
