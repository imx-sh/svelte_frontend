<script>
	import { Nav, Icon, Button, ButtonToolbar, ButtonGroup } from "sveltestrap";
	import { _ } from "../../../i18n";
	export let tab_option = 'edit';
	export let shortname = 'placeholder';
	export let status_message = 'placeholder';
</script>

<Nav class="w-100">
	<ButtonGroup size="sm" class="align-items-end">
		<span> {$_("shortname")} </span>
		<Button disabled="{true}" color="secondary" outline>
			<small class="text-info">{shortname}</small>
		</Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="ms-auto align-items-end">
		<span> {$_("views")} </span>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'edit' == tab_option}" on:click="{() => (tab_option = 'edit')}"><Icon name="pencil" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'source' == tab_option}" on:click="{() => (tab_option = 'source')}"><Icon name="code-slash" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'details' == tab_option}" on:click="{() => (tab_option = 'details')}"><Icon name="info" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'attachments' == tab_option}" on:click="{() => (tab_option = 'attachments')}"><Icon name="paperclip" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm" active="{'history' == tab_option}" on:click="{() => (tab_option = 'history')}"><Icon name="clock-history" /></Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="align-items-end">
		<span> {$_("actions")} </span>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="arrow-bar-up" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="arrow-bar-up" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="file-check" /></Button>
		<Button outline color="success" class="justify-content-center text-center" size="sm"><Icon name="trash" /></Button>
	</ButtonGroup>
	<ButtonGroup size="sm" class="align-items-end">
		<span> {$_("status")} </span>
		<Button disabled="{true}" outline>
			<small class="text-info">{status_message}</small>
		</Button>
	</ButtonGroup>
</Nav>

<style>
	span {
		margin-right: 0.5rem;
		margin-left: 0.5rem;
		color: dimgrey;
	}
</style>
