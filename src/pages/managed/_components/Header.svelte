<script>
  import { Nav, Badge, NavItem, NavLink, Collapse, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Navbar, Icon, NavbarBrand, Form, Input, InputGroup, InputGroupText, NavbarToggler } from "sveltestrap";
	import { _, locale, dir } from "../../../i18n";
	import SelectLanguage from "./SelectLanguage.svelte";

	/*let isOpen = false; // Collapse status
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }*/

	function logout(event) {
		// TBD are you sure?
		console.log("logout ...");
	}

</script>

<Navbar color="light" light="{true}" expand="md" class="py-0 px-2">
	<!--NavbarBrand href="/managed"><Icon name="person-circle" /></NavbarBrand-->
  <!--NavbarToggler on:click={() => (isOpen = !isOpen)} /-->
	<Nav tabs class="align-items-center w-100">
		<!--UncontrolledDropdown>
			<DropdownToggle nav caret title={$_("user_profile")}><Icon name="person-circle" /></DropdownToggle>
			<DropdownMenu right={"rtl" == $dir} >
				<DropdownItem header>{$_("hey")} </DropdownItem>
				<DropdownItem divider />
				<DropdownItem>{$_("settings")}</DropdownItem>
				<DropdownItem>{$_("activity_logs")}</DropdownItem>
				<DropdownItem on:click={logout}><Icon name="power" /> {$_("logout")} </DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown-->
		<NavLink href="#" title="{$_("user_profile")}"><Icon name="person-circle" /></NavLink>
		<NavLink href="#" title="Dashboard"><Icon name="house-door"></Icon></NavLink>
		<NavLink href="#" title="Content" active><Icon name="journals"></Icon></NavLink>
		<NavLink href="#" title="Tickets and tasks"><Icon name="calendar2-check"></Icon></NavLink>
		<NavLink href="#" title="Messages"><Icon name="envelope"><span class="badge rounded-pill bg-danger custom-badge">19</span></Icon></NavLink>
		<NavLink href="#" title="Notifications"><Icon name="bell"><span class="badge rounded-pill bg-danger custom-badge">3</span></Icon></NavLink>
		<NavLink href="#" title="Contacts"><Icon name="people"></Icon></NavLink>
		<NavLink href="#" title="System admin"><Icon name="wrench"></Icon></NavLink>
		<NavLink href="/managed/query" title={$_("query")}><Icon name="question-circle" /></NavLink>
		<NavLink href="#" title={$_("published")}><Icon name="globe" /></NavLink>
		<!--UncontrolledDropdown>
			<DropdownToggle nav caret title="my dropdown">More</DropdownToggle>
			<DropdownMenu start={true}>
				<DropdownItem> Tickets </DropdownItem>
				<DropdownItem> Calendar </DropdownItem>
				<DropdownItem> Contacts </DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown-->
		<!--NavLink href="#" class="ms-auto"-->
		<Form inline="true" class="ms-auto " >
		  <InputGroup size="sm"> 
				<Input placeholder={$_("searching_for_what")} /> 
				<InputGroupText><Icon name="search" /></InputGroupText> 
			</InputGroup>
		</Form>
		<!--/NavLink-->
    </Nav>
  <!--Collapse {isOpen} navbar on:update={handleUpdate}-->
  <!--/Collapse-->
	<!--Form inline={true} class="ms-auto ps-1 align-middle" position-relative >
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
		</UncontrolledDropdown-->

	<!--/Nav


	-->

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
