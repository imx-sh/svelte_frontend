<script>
	let title_height;
</script>

<div bind:clientHeight="{title_height}">
	<h6 class="text-info p-1 my-0"> Managed Layout </h6>
	<hr class="my-0" />
</div>
<div style="height: calc(100% - {title_height + 4}px); overflow: hidden auto;">
	<p> some content here </p>
</div>
