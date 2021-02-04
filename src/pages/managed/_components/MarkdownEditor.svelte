<script>
	import { Editor } from 'bytemd'
	import highlight from '@bytemd/plugin-highlight';
	import mermaid from '@bytemd/plugin-mermaid';
  import { isChangingPage } from "@roxi/routify";

	export let modifiedValue;
	export let mode = 'split';
	function handleChange(e) {
		modifiedValue = e.detail.value
	}
</script>

{#if !$isChangingPage }
  <div class="mh-100 h-100 pt-1" >
    <Editor 
      value={modifiedValue} 
      {mode}
      plugins={[highlight(),  mermaid()]} 
      containerStyle="height:calc(100%);"
      on:change={handleChange} 
      />
  </div>
{/if}

<style global>
	@import 'bytemd/dist/index.css';
  @import 'github-markdown-css';
  @import 'highlight.js/styles/vs.css';
</style>
