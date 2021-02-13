<script>
  import { FormFeedback, FormGroup, Label, Input, Row, Col } from "sveltestrap";

  export let id;
  export let type;
  export let title;
  export let placeholder = "";
  export let value = "";
  export let required = false;
	export let multiple = false;
	export let readonly = false;

  let valid = false;
  function handleInput(event) {
    if (type == "email") {
      valid = /^[^@]+@[^@]+$/.test(event.target.value) || !required;
    } else {
      valid = event.target.value.length > 0 || !required;
    }
  }
</script>

<!--Row form={true}>
	<Col class="md-{md}"-->
<FormGroup row={true}>
	<Label class="col-md-3 text-start" for={id} size="sm">{title}</Label>
  <Input
    class="col-md-6"
    {type}
    {id}
    name={id}
		on:change
    {placeholder}
    readonly={readonly}
    bsSize="sm"
    invalid={!valid && required}
		bind:value
    {valid}
    on:input={handleInput}
		{multiple}
    >
		<slot />
		</Input>
  <!--FormFeedback tooltip={true} {valid}> required </FormFeedback-->
  <!--div class="col-md-1 invalid-feedback text-right">required</div-->
  <!--div class="col-md-1 valid-feedback text-right">something</div-->
</FormGroup>
<!--/Col>
</Row-->
