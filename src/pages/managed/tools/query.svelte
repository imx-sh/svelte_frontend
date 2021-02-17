<script>
  // import Code from "../../../components/Code.svelte";
  import Table from "../_components/Table.svelte";
  import { _ } from "../../../i18n";
  import { TabPane, TabContent, Nav, NavItem, NavLink } from 'sveltestrap';
  import { query_response } from "../_stores/query_response.js";
  import {Container, Row, Col} from "sveltestrap";
  import QueryForm from "../_components/QueryForm.svelte"; 

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

<Container fluid={true} class="h-100">
  <Row class="h-100">
    <Col sm="2" class="h-100">
		 <QueryForm on:response={handleResponse}/>
    </Col>
    <Col sm="10" class="h-100">
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
          <pre class="h-100 mx-2" style="direction: ltr; text-align: left; white-space: pre-wrap; overflow-y: scroll; overflow-x: hidden; font-size: 10px;">
            <code>{JSON.stringify(results, null, 1)}</code> 
          </pre>
          <!--Code language="json" code={JSON.stringify(results, null, 1)} /-->
        </TabPane>
      </TabContent>
    </Col>
  </Row>
</Container>
