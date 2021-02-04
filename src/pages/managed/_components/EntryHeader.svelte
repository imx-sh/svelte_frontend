<script>
	import { Badge, Nav, Button, ButtonToolbar, ButtonGroup } from "sveltestrap";
  import Icon from "../../_components/Icon.svelte";
	import { _ } from "../../../i18n";
  import active_entry from "../_stores/active_entry.js";
	let tab_option = 'edit';
	//export let shortname = 'placeholder';
	let status_message = '';
</script>

<Nav class="w-100">
	<ButtonGroup size="sm" class="align-items-center">
		<!--span class="ps-2 pe-1"> {$_("shortname")} </span-->
		<span class="font-monospace" ><small>{$active_entry.data.displayname}</small></span>
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
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="arrow-bar-up" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="arrow-bar-up" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="file-check" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="trash" /></Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="align-items-center">
		<span class="ps-2 pe-1"> {$_("status")} </span>
		<span class="font-monospace" ><small>{status_message}</small></span>
	</ButtonGroup>
</Nav>

<style>
	span {
		color: dimgrey;
	}
</style>
