<script>
  import MarkdownEditor from "./MarkdownEditor.svelte";
  import HtmlEditor from "./HtmlEditor.svelte";
  import EntryHeader from './EntryHeader.svelte';
  import active_entry from "../_stores/active_entry.js";
  import MediaView from "../../_components/MediaView.svelte";
  import { JSONEditor } from 'svelte-jsoneditor';

	let header_height;
  //console.log("loading active entry ");
  //console.log($active_entry);
	let modifiedValue;
	let displayname;
	let description;
	let entryurl;
	let content_type;
	let embedded;
  let uid;
  let title = "";
  //console.log($active_entry.data);
  $: {
	uid = $active_entry.data.subpath + "/" + $active_entry.data.shortname;
  if ($active_entry.data.attributes) {
    if ($active_entry.data.attributes.description) description = $active_entry.data.attributes.description;
    if ($active_entry.data.attributes.displayname) displayname = $active_entry.data.attributes.displayname;
    if ($active_entry.data.attributes.payload && $active_entry.data.attributes.payload.embedded)
      embedded = $active_entry.data.attributes.payload.embedded;
		if($active_entry.data.attributes.payload && $active_entry.data.attributes.payload.content_type)
			content_type = $active_entry.data.attributes.payload.content_type;
		if($active_entry.data.attributes.payload && $active_entry.data.attributes.payload.filepath)
			entryurl = `${website.backend}/media/${website.space_name}/${$active_entry.data.subpath}/entry/${$active_entry.data.attributes.payload.filepath}`;
    title = displayname;
  }
  }
  let tab_option = "edit";
  let status = "";

</script>
<div bind:clientHeight="{header_height}">
  <EntryHeader bind:tab_option {title} {status} />
<hr class="my-0" />
</div>
<div class="px-1 pb-1 tab-content" style="height: calc(100% - {header_height}px); overflow: hidden auto;">
  <div class="h-100 tab-pane" class:active={tab_option === 'source'}>
    <JSONEditor json={$active_entry.data} />
  </div>
  <div class="h-100 tab-pane" class:active={tab_option === 'edit'}>
  {#if content_type.startsWith("text/html;")}
    <!--HtmlEditor {uid} bind:modifiedValue /-->
    <HtmlEditor bind:content={embedded}/>
  {:else if content_type.startsWith("text/markdown;")}
    <MarkdownEditor bind:content={embedded}/>
  {:else}
    <h5> Can't edit this content type </h5> 
    <MediaView url={entryurl} {displayname} {content_type} />
  {/if}
  </div>
</div>
