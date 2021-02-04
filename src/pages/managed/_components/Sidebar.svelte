<script>
  //import { entries } from '../../_stores/entries.js';
  import { imx_entries } from '../../../imx.js';
  import active_section from "../_stores/active_section.js";
  import active_entry from "../_stores/active_section.js";
  import Folder from "./Folder.svelte";
  import { _ } from "../../../i18n";
  import { ready } from "@roxi/routify";

  let queryType = "subpath";
  let resourceTypes = ["folder", "post", "media"];
  let shortnames = [];
  let search = "";
  let subpath = "posts";
  let max_returned_items = 100;
  let imx_request;
  let entries = [];

  imx_request = imx_entries(subpath, resourceTypes, shortnames, queryType, search, max_returned_items).then( (_entries) => {
     while (entries.length) { entries.pop(); } // Make sure we empty the array before loading from api
    _entries.forEach((_entry) => { entries.push({data: _entry}); });
    entries = entries; // A trick to triger update on svelte
    //console.log(entries);
    $ready();
  });

	let title_height;
  let footer_height;
</script>

<div bind:clientHeight="{title_height}">
  <h5 class="my-0"> 
    {#if "name" in $active_section}
      {$_($active_section.name)} 
    {/if}
  </h5>
	<hr class="my-0" />
</div>
<div style="height: calc(100% - {title_height + footer_height + 4}px); overflow: hidden auto;">
	<p> Entries </p>
    {#each entries as entry}
      <Folder data={entry.data} />
    {/each}
</div>
<div bind:clientHeight="{footer_height}">
	<hr class="my-0" />
  Hello world ... this is the footer
</div>
