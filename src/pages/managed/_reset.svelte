<script>

	import { Container, Row, Col } from "sveltestrap";
	import Header from "./_components/Header.svelte";
	import Footer from "./_components/Footer.svelte";

	let window_height;
	let header_height;
  let footer_height;
	let title_height;
	$: calced_body_height =  window_height - header_height - footer_height - 8;

</script>

<svelte:window bind:innerHeight={window_height} />

<div bind:clientHeight={header_height} class="fixed-top" ><Header /></div>

<Container fluid={true} id="mymain" class="border border-secondary position-relative p-0" style="top: {header_height}px; height: {calced_body_height}px;">
	<Row class="h-100" noGutters> 
		<Col sm="2" class="h-100 border border-success">
			<div bind:clientHeight="{title_height}" class="pe-1">
			<h6 class="text-info p-1 ms-2 my-0"> Managed Layout </h6>
			<hr class="my-0" />
			</div>
			<div style="height: calc(100% - {title_height + 4}px); overflow: hidden auto;">
			 <h1> some content here </h1>
		 </div>

		</Col>

		<Col class="border border-primary" >
			<slot scoped="" />
		</Col>
	</Row>
</Container>

<div bind:clientHeight={footer_height} class="fixed-bottom" ><Footer /></div> 
