<script>
  import { imx_entries } from "../../../imx.js";
  //import { entries } from '../../_stores/entries.js';
  import active_entry from "../_stores/active_entry.js";
  import Icon from "../../_components/Icon.svelte";
  import File from "./File.svelte";
  
  let expanded = false;
  let children_loaded = false;
  export let data;
  
  
  let displayname =(data.displayname.length < 20) ? data.displayname : data.displayname.substring(0,20) + " ...";
  let children = [];

  async function toggle() {
    expanded = !expanded;
    if(!children_loaded) {
      const children_subpath = data.subpath + "/" + data.shortname;
      const _entries = await imx_entries(children_subpath, [
        "folder",
        "post",
        /*"share",
        "reaction",
        "reply",
        "media",*/
      ]);
      while (children.length) { children.pop(); } // Make sure we empty the array before loading from api
      _entries.forEach((_entry) => {
        children.push({data: _entry});
      });
      children = children; // A trick to trigger svelte update
      children_loaded = true;
    }
  }
</script>

<span class:expanded class="folder ps-2" on:click="{toggle}">
  <Icon class="text-start" name="folder{expanded ? '2-open' : ''}" /> {displayname}
</span>

{#if expanded}
	<ul class="pt-1 px-1 ms-2 border-start">
    {#each children as child (child.data.shortname)}
      <li>
        {#if child.data.resource_type === 'folder'}
          <svelte:self data={child.data}/>
        {:else}
					<File data={child.data} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .folder {
    font-weight: bold;
    cursor: pointer;
    display: list-item;
    border-top: thin dotted grey;
  }

  .folder:hover {
    z-index: 2;
    color: #495057;
    text-decoration: none;
    background-color: #e8e9ea;
  }

  .expanded {
    background-color: #e8e9ea;
    border-bottom: thin dotted green;
  }

  ul {
    list-style: none;
  }

  li {
    padding: 0;
  }
</style>


