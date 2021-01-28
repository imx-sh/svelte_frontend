<script>

	import { Container, Row, Col } from "sveltestrap";
	import Header from "./_components/Header.svelte";
	import Sidebar from "./_components/Sidebar.svelte";
	import signedin_user from "./_stores/signedin_user.js";
	import Login from "./_components/Login.svelte";

	let window_height;
	let header_height;
	$: calced_body_height =  window_height - header_height - 8 ; //- footer_height;

</script>

<svelte:window bind:innerHeight={window_height} />
{#if !$signedin_user}
<div class="container-fluid d-flex align-items-center" id="login-container" style="height: {window_height-8}px; ">
	<Login />
</div>
{:else}
<div bind:clientHeight={header_height} class="fixed-top" ><Header /></div>
<Container fluid={true} id="mymain" class="border border-secondary position-relative p-0" style="top: {header_height}px; height: {calced_body_height}px;">
	<Row class="h-100" noGutters> 
		<Col sm="2" class="h-100 border border-success">
			<Sidebar />
		</Col>
		<Col class="border border-primary" >
			<slot scoped="" />
		</Col>
	</Row>
</Container>
{/if}

<!--div bind:clientHeight={footer_height} class="fixed-bottom" ><Footer /></div--> 

<style>
#login-container {
	background-color: #fafaf6;
}
</style>
