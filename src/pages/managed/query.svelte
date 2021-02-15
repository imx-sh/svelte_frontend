<script>
  // import Code from "../../components/Code.svelte";
  import QueryForm from "./_components/QueryForm.svelte";
  import Table from "./_components/Table.svelte";
	import { _ } from "../../i18n";
  import { TabPane, TabContent, Nav, NavItem, NavLink, Button, Col, Container, Row } from 'sveltestrap';

	let results = {};
	let rows = [];

	function handleResponse(event) {
		//console.log("Response: ", event.detail);
		results = event.detail;
		rows = results.records;
	}

	let cols = {
		shortname: {
			path: "shortname",
			title: $_("shortname"),
			type: "string"
		},
		displayname: {
			path: "attributes.displayname",
			title: $_("displayname"),
			type: "string"
		},
		tags: {
			path: "attributes.tags",
			title: $_("tags"),
			type: "string"
		},
		tags: {
			path: "attributes.payload.embedded",
			title: $_("payload"),
			type: "string"
		},
		is_active: {
			path: "attributes.is_active",
			title: $_("is_active"),
			type: "string"
		}
	}

  let myactive = "original";

</script>
<!--Container fluid="true">
	<Row--> 
		<Col sm=2 > <QueryForm on:response={handleResponse}/> </Col>
		<Col sm=8 class="h-100" >
			<Nav tabs >
				<NavItem >
					<NavLink href="#" on:click={function () { myactive = "original"; }} active={myactive == "original"}>{$_("raw")}</NavLink>
				</NavItem>
				<NavItem >
					<NavLink href="#" on:click={function () {myactive = "tabular";}}  active={myactive == "tabular"} >{$_("tabular")}</NavLink>
				</NavItem>
			</Nav>
					
			<TabContent class="h-90" activeTab={myactive} >
				<TabPane class="h-100" tabId="tabular" >
					<Table {cols} {rows}/>
				</TabPane>
				<TabPane class="h-100" tabId="original" >
					<pre style="direction: ltr; text-align: left; white-space: pre-wrap; max-height: 95h; overflow-y: scroll; overflow-x: hidden;">
						<code>{JSON.stringify(results, null, 1)}</code> 
					</pre>
					<!--Code language="json" code={JSON.stringify(results, null, 1)} /-->
				</TabPane>
			</TabContent>

		</Col>
	<!--/Row>
</Container-->

<style>
/*
.container {
	display: flex;
}

.container div {
	float: left;
	margin: 10px;
	max-width: 50%;
}
*/
</style>
