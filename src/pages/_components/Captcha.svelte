<script>
  import { onMount } from "svelte";
  import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
  } from "sveltestrap";
  import { _, dir } from "../../i18n";

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; i = i - 1) {
      result += chars[Math.floor(Math.random() * chars.length)];
      // result += ' ';
    }
    return result;
  }

  let canvas;
  let image;
  let random;
  onMount(() => {
    random = randomString(4, $_("captcha_chars"));
    //random = randomString(4, "2346789أبتثجحخدذرزسشصضطظعغفقلنو");
    var x = Math.floor(Math.random() * 50); 
		if($dir == "rtl") x += 90;
    var y = Math.floor(Math.random() * 20) + 30;
		if($dir == "rtl") y -= 5;
    const ctx = canvas.getContext("2d");
    ctx.strokeRect(1, 1, 149, 59);
    ctx.font = "36px serif";
    //ctx.fillText(random, x, y);
    ctx.strokeText(random, x, y);
    image.src = ctx.canvas.toDataURL();
  });

  export let valid;
  let invalid;
  function handleInput(event) {
    //console.log("Random: ", random, "Input: ", event.target.value);
    if (event.target.value.length < 4) {
      invalid = valid = undefined;
      return;
    }
    if (event.target.value == random) {
      valid = true;
      invalid = false;
    } else {
      invalid = true;
      valid = false;
    }
  }
</script>

<FormGroup row={true}>
  <canvas bind:this={canvas} width="150" height="60" />
	<Label class="col-md-3 text-start" for="captcha" size="sm">
    {$_('verfication')}
  </Label>
  <img class="col-md-2" bind:this={image} alt="check me out" />
  <Input
    class="col-md-3"
    id="captcha"
    type="text"
    placeholder={$_('enter_code_here')}
    readonly={false}
    bsSize="md"
    {invalid}
    {valid}
    on:input={handleInput} />
</FormGroup>

<style>
  canvas {
    border: 1px black solid;
    display: none;
    padding: 20px;
  }
</style>
