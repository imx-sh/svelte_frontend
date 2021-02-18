<script>
  import {Container, Row, Col} from "sveltestrap";
  import { createEventDispatcher } from "svelte";
  // import marked from 'marked';
  import MarkdownIt from 'markdown-it';
  import hljs from 'highlight.js';
  const dispatch = createEventDispatcher();

  export let content;

  const markdown = new MarkdownIt({
      highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Failed to highlight string')
        }
      }
      return '' // use external default escaping
    },
  });

  markdown.renderer.rules.table_open = function(/*tokens, idx*/) { return '<table class="table table-striped">'; };
</script>

<Container fluid={true} class="h-100">
  <Row class="h-100">
    <Col sm="6" class="h-100">
      <textarea maxlength="4096" class="h-100 w-100 font-monospace form-control form-control-sm" bind:value={content} on:input="{() => dispatch('changed')}" />
    </Col>
    <Col sm="6" class="h-100">
      <div class="h-100 w-100" style="overflow: hidden auto">{@html markdown.render(content)}</div>
    </Col>
  </Row>
</Container>

<style global>
  @import "highlight.js/styles/a11y-light.css";
</style>
