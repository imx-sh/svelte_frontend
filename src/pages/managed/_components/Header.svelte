<script>
  import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Navbar, Icon, NavbarBrand, Form, Input, InputGroup, InputGroupText } from "sveltestrap";
	import { _, locale } from "../../../i18n";
	import SelectLanguage from "./SelectLanguage.svelte";

</script>

<Navbar color="light" light="{true}" expand="md" class="py-0 px-2">
	<NavbarBrand href="/managed">{$_("admin")}</NavbarBrand>

	<Form inline={true} class="ms-auto ps-1 align-middle" position-relative >
		<InputGroup size="sm"  > 
			<Input type="search" />
			<InputGroupText><Icon name="search" /></InputGroupText>
		</InputGroup>
	</Form>
	<Nav class="ms-auto" navbar>
		<SelectLanguage />
		<NavItem><NavLink href="/">
			<Icon name="envelope" /><span class="badge rounded-pill bg-danger custom-badge">19</span>
		</NavLink></NavItem>
		<NavItem><NavLink href="/">
			<Icon name="bell" /><span class="badge rounded-pill bg-danger custom-badge">3</span>
		</NavLink></NavItem>
		<UncontrolledDropdown>
			<DropdownToggle nav caret title="my dropdown">Hello someone</DropdownToggle>
			<DropdownMenu start={true}>
				<DropdownItem> one </DropdownItem>
				<DropdownItem> two </DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>

	</Nav>

</Navbar>


<style>
/*
.custom-badge {
	position: relative;
	right: 0.5rem;
	top: -0.5rem;
	border: 2px solid #fff;
	font-size: 0.6rem;
}*/
</style>
