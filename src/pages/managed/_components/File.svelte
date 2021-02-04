<script context="module">
  const type_icon_map = {
    post: "file-text",
  };
</script>

<script>
  import { Icon } from "sveltestrap";
  import active_entry from "../_stores/active_entry.js";

  export let data;

  let icon = "file-text";
  if(data.resource_type in type_icon_map)
    icon = type_icon_map[data.resource_type];

  let displayname =(data.displayname.length < 15) ? data.displayname : data.displayname.substring(0,14) + " ...";

  function show_file() {
      $active_entry = {data: data};
      //console.log("switching active_entry to " + data.subpath + "/" + data.shortname);
  }
</script>

<span on:click={show_file} class="file ps-2">
  <Icon name={icon} /> {displayname}
</span>

<style>
  .file {
    cursor: pointer;
    display: list-item;
  }

  .file:hover {
    z-index: 2;
    color: #495057;
    text-decoration: none;
    background-color: #e8e9ea;
  }
</style>
