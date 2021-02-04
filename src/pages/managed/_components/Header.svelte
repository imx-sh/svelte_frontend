<script>
  import { Nav, Badge, NavItem, NavLink, Collapse, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Navbar, Icon, NavbarBrand, Form, Input, InputGroup, InputGroupText, NavbarToggler } from "sveltestrap";
	import { _, locale, dir } from "../../../i18n";
	//import SelectLanguage from "./SelectLanguage.svelte";
	import signedin_user from "../_stores/signedin_user.js";
  import { isActive, url } from '@roxi/routify'
  import sections from "../_stores/sections.json";

  let section_path = $url();
</script>

<Navbar color="light" light="{true}" expand="md" class="py-0 px-2">
	<Nav tabs class="align-items-center w-100">
    {#each sections as section}
      <NavLink href="{$url(section.path)}" title="{section.title}" active="{$isActive(section.path)}">
        <Icon name="{section.icon}"/>
        {#if section.notifications > 0}
          <span class="badge rounded-pill bg-danger custom-badge">{section.notifications}</span>
        {/if}
      </NavLink>
    {/each}
    <NavLink href="#" title={$_("logout")} on:click={signedin_user.logout}>
      <Icon name="power" />
    </NavLink>
		<Form inline="true" class="ms-auto " >
		  <InputGroup size="sm"> 
				<Input placeholder={$_("searching_for_what")} /> 
				<InputGroupText><Icon name="search" /></InputGroupText> 
			</InputGroup>
		</Form>
    </Nav>
</Navbar>

<style>
.custom-badge {
	position: relative;
	right: 0.5rem;
	top: -0.5rem;
	border: 2px solid #fff;
	font-size: 0.6rem;
}
</style>
