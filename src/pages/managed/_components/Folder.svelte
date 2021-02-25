<script>
  import { imx_entries, imx_folder } from "../../../imx.js";
  import { entries } from "../_stores/entries.js";
  import Icon from "../../_components/Icon.svelte";
  import File from "./File.svelte";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  let expanded = false;
  //let children_loaded = false;
  export let data;

  let children_subpath = data.subpath + "/" + data.shortname;
  let displayname =
    data.displayname.length < 20
      ? data.displayname
      : data.displayname.substring(0, 20) + " ...";

  async function toggle() {
    expanded = !expanded;
    if (!$entries[children_subpath]) {
      const _entries = await imx_entries(children_subpath, []);
      $entries[children_subpath] = [];
      _entries.forEach((_entry) => {
        $entries[children_subpath].push({ data: _entry });
      });
    }
  }

  async function newFolder() {
    let _name = prompt("Enter the new folder shortname", "");
    if (_name && _name.length > 0) {
      let result = await imx_folder("create", children_subpath, _name);
      addNotification({
        text: `Created new folder ${_name} under ${children_subpath} (${result.status})`,
        position: "bottom-center",
        type: result.status == "success" ? "success" : "warning",
        removeAfter: 5000,
      });
      if (result.status == "success") {
        let entry = {
          data: {
            subpath: children_subpath,
            shortname: _name,
            displayname: _name,
            resource_type: "folder",
          },
        };
        entries.add(children_subpath, entry);
      }
    }
  }

  let info_modal;
  function infoModal() {
    info_modal = true;
  }

  async function deleteFolder() {
    if (
      confirm(
        `Are you sure you want to delete the folder "${data.displayname}" under ${data.subpath}?`
      )
    ) {
      let result = await imx_folder("delete", data.subpath, data.shortname);
      addNotification({
        text: `Deleted folder ${data.shortname} under ${data.subpath}  (${result.status})`,
        position: "bottom-center",
        type: result.status == "success" ? "success" : "warning",
        removeAfter: 5000,
      });
      if (result.status == "success") {
        entries.del(data.subpath, data.shortname);
      }
    }
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
      title="Create folder"
      on:click|stopPropagation="{newFolder}"
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

{#if expanded && $entries[children_subpath]}
  <ul class="py-1 ps-1 ms-2 border-start">
    {#each $entries[children_subpath] as child (children_subpath + child.data.shortname)}
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
