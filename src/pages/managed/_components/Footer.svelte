<script>
  import { Navbar, NavbarBrand } from "sveltestrap";
  let classes = "";
  export { classes as class };
</script>

<Navbar {...$$restProps} class={classes} color="secondary" light >
<NavbarBrand href="/">my Navbar</NavbarBrand>
</Navbar>
