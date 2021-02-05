<script>
  import {Container, Row, Col} from "sveltestrap";
  export let content; // = "<h2> Example title</h2>\n<p> Paragraph <small> small </small></p>";
</script>

<Container fluid={true} class="h-100">
  <Row class="h-100">
    <Col sm="6" class="h-100">
      <textarea maxlength="4096" class="h-100 w-100 font-monospace" bind:value={content} />
    </Col>
    <Col sm="6" class="h-100">
      <div class="h-100 w-100">{@html content}</div>
    </Col>
  </Row>
</Container>


