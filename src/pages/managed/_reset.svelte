<script>

	import { Container, Row } from "sveltestrap";
	import Header from "./_components/Header.svelte";
	import Footer from "./_components/Footer.svelte";

	let window_height;
	let header_height;
  let footer_height;
	$: calced_body_height =  window_height - header_height - footer_height - 8;

</script>

<svelte:window bind:innerHeight={window_height} />

<div bind:clientHeight={header_height} class="fixed-top" ><Header /></div>

<Container fluid={true} id="mymain" class="border border-secondary position-relative p-0" style="top: {header_height}px; height: {calced_body_height}px;">
	<Row class="h-100" noGutters> 
		<h2> managed layout </h2>
		<slot scoped="" />
	</Row>
</Container>

<div bind:clientHeight={footer_height} class="fixed-bottom" ><Footer /></div> 
