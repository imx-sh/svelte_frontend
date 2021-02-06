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

  let data;


  //console.log($active_entry.data);
  $: {
  data = $active_entry.data
  if(data) {
	uid = data.subpath + "/" + data.shortname;
  if (data.attributes) {
    if (data.attributes.description) description = data.attributes.description;
    if (data.attributes.displayname) displayname = data.attributes.displayname;
    if (data.attributes.payload && data.attributes.payload.embedded)
      embedded = data.attributes.payload.embedded;
		if(data.attributes.payload && data.attributes.payload.content_type)
			content_type = data.attributes.payload.content_type;
		if(data.attributes.payload && data.attributes.payload.filepath)
			entryurl = `${website.backend}/media/${website.space_name}/${data.subpath}/entry/${data.attributes.payload.filepath}`;
      title = ` Title: ${displayname} `;
  }
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
    <JSONEditor json={data} />
  </div>
  <div class="h-100 tab-pane" class:active={tab_option === 'edit'}>
  {#if content_type.startsWith("text/html;")}
    <!--HtmlEditor {uid} bind:modifiedValue /-->
    <HtmlEditor content={embedded}/>
  {:else if content_type.startsWith("text/markdown;")}
    <MarkdownEditor content={embedded}/>
  {:else}
    <h5> Can't edit this content type </h5> 
    <MediaView url={entryurl} {displayname} {content_type} />
  {/if}
  </div>
</div>
