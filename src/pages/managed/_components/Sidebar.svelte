<script>
  //import { entries } from '../../_stores/entries.js';
  import { imx_entries } from '../../../imx.js';
  import {active_section} from "../_stores/active_section.js";
  import { active_entry } from "../_stores/active_entry.js";
  import Folder from "./Folder.svelte";
  import { _ } from "../../../i18n";
  import { onDestroy } from "svelte";
  import { url, isActive } from "@roxi/routify";
  import { entries } from "./../_stores/entries.js";
  import { ListGroup, ListGroupItem, Card } from "sveltestrap";



  // Section components
  // import QueryForm from "./QueryForm.svelte";

  const components = {
    // "queryform": QueryForm
  };

  let queryType = "subpath";
  let resourceTypes = ["folder", "post", "media"];
  let shortnames = [];
  let search = "";
  let max_returned_items = 100;
  //let entries = {};
  //let subpaths = [];

  let children = [];
  let name = "";

  const unsubscribe = active_section.subscribe(value => {
    name = value.name;
    children = value.children;
    //console.log("Active section has changed to ", name, children);
    for(let child of children) {
      if(child.type && child.type == "folder" && child.imx_path && !(child.imx_path in $entries ))  {
        let subpath = child.imx_path;
        imx_entries(subpath, resourceTypes, shortnames, queryType, search, max_returned_items).then( (_entries) => {
          $entries[subpath] = []; // Empty the list of entries for the subpath
          //console.log("Loading entries for ", subpath);
          _entries.forEach((_entry) => { $entries[subpath].push({data: _entry}); });
        });
      }
    }
  });

  onDestroy(unsubscribe);

	let title_height;
  let footer_height;

</script>
<div bind:clientHeight="{title_height}">
  <h5 class="my-0"> 
    {#if name}
      {$_(name)} 
    {/if}
  </h5>
	<hr class="w-100 mt-1 mb-0" />
</div>
<div class="scroller pe-0" style="height: calc(100% - {title_height + footer_height}px); overflow: hidden auto;">
  <ListGroup flush>
  {#each children as child}
    {#if child.type == "link"}
      <!--p class="my-0 font-monospace"><small>{JSON.stringify(child, undefined,1)}</small></p-->
    <ListGroupItem color="light" action href="{$url('/managed/'+name+'/'+child.name)}" active={$isActive('/managed/'+name+'/'+child.name)}> {$_(child.name)} </ListGroupItem>
    {:else if child.type == "component" && child.name in components}
      <svelte:component this={components[child.name]}/>
    {:else if child.type == "folder" && $entries[child.imx_path] && $entries[child.imx_path].length > 0}
      <ListGroupItem> 
        <!--b> {child.name}</b> <br/--> 
      {#each $entries[child.imx_path] as entry}
      <Folder data={entry.data} />
      {/each}
      </ListGroupItem>
    {/if}
  {/each}
  </ListGroup>
</div>
<div bind:clientHeight="{footer_height}">
  {#if $active_entry.data}
	<hr class="my-0" />
    <p class="lh-1 my-0">
    <small >
      <span class="text-muted">Shortname:</span> {$active_entry.data.shortname} <br/>
      <span class="text-muted">Displayname:</span> {$active_entry.data.displayname} <br/>
      <span class="text-muted">Content type:</span> {$active_entry.data.attributes.payload.content_type}
    </small>
    </p>
  {/if}
</div>

