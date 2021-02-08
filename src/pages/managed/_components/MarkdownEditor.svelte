<script>
  import {Container, Row, Col} from "sveltestrap";
  import marked from 'marked';
  import { createEventDispatcher } from "svelte";
  export let content;
  const dispatch = createEventDispatcher();
</script>

<Container fluid={true} class="h-100">
  <Row class="h-100">
    <Col sm="6" class="h-100">
      <textarea maxlength="4096" class="h-100 w-100 font-monospace" bind:value={content} on:input="{() => dispatch('changed')}" />
    </Col>
    <Col sm="6" class="h-100">
      <div class="h-100 w-100" style="overflow: hidden auto">{@html marked(content)}</div>
    </Col>
  </Row>
</Container>
