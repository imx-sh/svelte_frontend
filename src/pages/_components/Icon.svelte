<script>
  import classnames from './utils';

  let className = '';
  export { className as class };
  export let name;

  $: classes = classnames( className, `bi-${name} icon` );
</script>

<i {...$$restProps} class={classes} />

<style>
  .icon {
    position: relative;
    top: -0.1rem;
  }
</style>
