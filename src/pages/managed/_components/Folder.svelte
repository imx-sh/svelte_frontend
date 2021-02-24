<script>
  import { imx_entries } from "../../../imx.js";
  //import { entries } from '../../_stores/entries.js';
  import Icon from "../../_components/Icon.svelte";
  import File from "./File.svelte";

  let expanded = false;
  let children_loaded = false;
  export let data;

  let displayname =
    data.displayname.length < 20
      ? data.displayname
      : data.displayname.substring(0, 20) + " ...";
  let children = [];

  async function toggle() {
    expanded = !expanded;
    if (!children_loaded) {
      const children_subpath = data.subpath + "/" + data.shortname;
      const _entries = await imx_entries(children_subpath, [
        /*"folder",
        "post",
        "share",
        "reaction",
        "reply",
        "media",
  "feedback"*/ // Empty, means all.
      ]);
      while (children.length) {
        children.pop();
      } // Make sure we empty the array before loading from api
      _entries.forEach((_entry) => {
        children.push({ data: _entry });
      });
      children = children; // A trick to trigger svelte update
      children_loaded = true;
    }
  }

  async function newSubfolder() {
		name = prompt("Enter the new folder shortname", "");
		if(name) {
      let resp = await imx_folder("create", data.subpath + "/" + data.shortname, name);
			console.log("Result: ", resp);
    }
  }

  let info_modal;
  function infoModal() {
    info_modal = true;
  }

  function deleteFolder() {

  }
</script>

<span
  class:expanded
  class="folder position-relative mt-1 ps-2"
  on:click="{toggle}"
>
  <span style="overflow: hidden;">
    <Icon class="text-start" name="folder{expanded ? '2-open' : ''}" />
    {displayname}
  </span>
  <span class="toolbar top-0 end-0 position-absolute px-0">
    <span
      class="px-0"
      title="Create Subfolder"
      on:click|stopPropagation="{newSubfolder}"
    >
      <Icon name="folder-plus" />
    </span>
    <span class="px-0" title="details" on:click|stopPropagation="{infoModal}">
      <Icon name="pencil" />
    </span>
    <span
      class="px-0"
      title="Delete Folder"
      on:click|stopPropagation="{deleteFolder}"
    >
      <Icon name="trash" />
    </span>

  </span>
</span>

{#if expanded}
  <ul class="py-1 ps-1 ms-2 border-start">
    {#each children as child (child.data.shortname)}
      <li>
        {#if child.data.resource_type === "folder"}
          <svelte:self data="{child.data}" />
        {:else}
          <File data="{child.data}" />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .folder {
    /*font-weight: bold;*/
    cursor: pointer;
    display: list-item;
    list-style: none;
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

  .toolbar {
    display: none;
    color: brown;
  }

  .toolbar span:hover {
    color: green;
  }

  .folder:hover .toolbar {
    display: flex;
  }
</style>
