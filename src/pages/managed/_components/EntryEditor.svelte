<script>
  import { active_entry, has_changed } from "../_stores/active_entry.js";
  import MarkdownEditor from "./MarkdownEditor.svelte";
  import HtmlEditor from "./HtmlEditor.svelte";
  import MediaView from "../../_components/MediaView.svelte";
  //import { JSONEditor } from 'svelte-jsoneditor';
	import { Modal, ModalHeader, ModalBody, ModalFooter, Badge, Nav, Button, ButtonToolbar, ButtonGroup } from "sveltestrap";
  import Icon from "../../_components/Icon.svelte";
	import { _ } from "../../../i18n";
  import { website } from "../../../space_config";
  import { onDestroy } from "svelte";

	let header_height;
  let content;
  let url;
  let uid;
  let content_type;
  let displayname;

  const unsubscribe = active_entry.subscribe(value => {
    if(value.data) {
      uid = value.data.subpath + '/' + value.data.shortname;
      content = value.data.attributes.payload.embedded;
      content_type = value.data.attributes.payload.content_type;
      displayname = value.data.attributes.displayname;
      url = (value.data.attributes.payload.filepath) ? `${website.backend}/media/${website.space_name}/entry/${value.data.attributes.payload.filepath}` : null;
    } else {
      uid = content = content_type = displayname = url = "";
    }

    //console.log("updated from subscription");
  });

  onDestroy(unsubscribe);

  function hasChanged() {
    let _has_changed = !(content === $active_entry.data.attributes.payload.embedded);
    //console.log("Entry", $active_entry);
    //console.log("hasChanged called: ", _has_changed, $has_changed);
    //console.log("content vs embedded", content, "|", $active_entry.data.attributes.payload.embedded);
    if(_has_changed != $has_changed) { 
      $has_changed = _has_changed;
      //console.log("Has *actually* changed: ", $has_changed);
    }
  }

  let tab_option = "edit";
  $: status = $has_changed ? "Modified" : "Uptodate";

  function beforeUnload() {
    // Cancel the event as stated by the standard.
    if($has_changed) {
      event.preventDefault();
      let message = 'There are unsaved modifications. Are you sure you want to leave page?';
      event.returnValue = message; // Chrome requires returnValue to be set.
      return message; // more compatibility
    }
  }

</script>

<svelte:window on:beforeunload={beforeUnload}/>
<div bind:clientHeight="{header_height}">
<Nav class="w-100">
	<ButtonGroup size="sm" class="align-items-center">
		<!--span class="ps-2 pe-1"> {$_("shortname")} </span-->
		<span class="font-monospace" ><small>{displayname}</small></span>
	</ButtonGroup>
	<ButtonGroup size="sm" class="ms-auto align-items-center">
		<span class="ps-2 pe-1"> {$_("views")} </span>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'edit' == tab_option}" on:click="{() => (tab_option = 'edit')}"><Icon name="pencil" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'source' == tab_option}" on:click="{() => (tab_option = 'source')}"><Icon name="code-slash" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'details' == tab_option}" on:click="{() => (tab_option = 'details')}"><Icon name="info" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'attachments' == tab_option}" on:click="{() => (tab_option = 'attachments')}"><Icon name="paperclip" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'history' == tab_option}" on:click="{() => (tab_option = 'history')}"><Icon name="clock-history" /></Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="align-items-center">
		<span class="ps-2 pe-1"> {$_("actions")} </span>
    <Button outline color="{$has_changed ? 'danger':'success'}" class="justify-content-center text-center" size="sm"><Icon name="upload" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="file-check" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="trash" /></Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="align-items-center">
		<span class="ps-2 pe-1"> {$_("status")} </span>
		<span class="font-monospace" ><small>{status}</small></span>
	</ButtonGroup>
  <ButtonGroup>
    <Button outline color="success" class="justify-contnet-center text-center" size="sm" on:click="{() => {active_entry.reset() }}"><Icon name="x-circle" /></Button>
  </ButtonGroup>
</Nav>
<hr class="my-0" />
</div>
<div class="px-1 pb-1 tab-content" style="height: calc(100% - {header_height}px); overflow: hidden auto;">
  <div class="h-100 tab-pane" class:active={tab_option === 'source'}>
    <!--JSONEditor json={data} /-->
    <div class="px-1 pb-1 h-100" style="text-align: left; direction: ltr; overflow: hidden auto;">
      <pre>
        {JSON.stringify($active_entry.data, undefined, 1)}
      </pre>
    </div>
  </div>
  <div class="h-100 tab-pane" class:active={tab_option === 'edit'}>
  {#if url}
    <h5> You can only preview this content type {content_type} </h5> 
    <MediaView {url} {displayname} {content_type} />
  {:else if content_type.startsWith("text/html;")}
    <HtmlEditor bind:content on:changed={hasChanged} />
  {:else if content_type.startsWith("text/markdown;")}
    <MarkdownEditor bind:content on:changed={hasChanged} />
  {:else}
    <h4> Unrecognized conent type {content_type} </h4>
    <div class="px-1 pb-1 h-100" style="text-align: left; direction: ltr; overflow: hidden auto;">
      <pre> {content} </pre>
    </div>
  {/if}
  </div>
</div>

<style>
	span {
		color: dimgrey;
	}
</style>
