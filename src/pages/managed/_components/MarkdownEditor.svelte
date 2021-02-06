<script>
  import {Container, Row, Col} from "sveltestrap";
  import marked from 'marked';
  export let content; // = "# Example Title\n\n- this\n- is\n- a list";
</script>

<Container fluid={true} class="h-100">
  <Row class="h-100">
    <Col sm="6" class="h-100">
      <textarea maxlength="4096" class="h-100 w-100 font-monospace" bind:value={content} />
    </Col>
    <Col sm="6" class="h-100">
      <div class="h-100 w-100" style="overflow: hidden auto">{@html marked(content)}</div>
    </Col>
  </Row>
</Container>
