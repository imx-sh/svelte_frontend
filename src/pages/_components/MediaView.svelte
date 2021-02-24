<script>
  import { onMount } from "svelte";

  export let content_type;
  export let url;
  export let displayname = undefined;
  //export let description = undefined;

  onMount(async () => {});

  /*
{#if description}
	{description}
{/if}*/
</script>
<pre> Content type : {content_type} </pre>
{#if content_type.startsWith("image")}
  <img src="{url}" alt="{displayname}" class="mw-100" />
{:else if content_type.startsWith("audio")}
  <audio controls src="{url}">
    <track kind="captions" />
  </audio>
{:else if content_type.startsWith("video")}
  <video controls src="{url}">
    <track kind="captions" />
  </video>
{:else if content_type.startsWith("application/pdf")}
  <div class="embed-responsive embed-responsive-16by9">
    <object
      title="{displayname}"
      class="embed-responsive-item"
      type="application/pdf"
      data="{url}"
    >
      <p>Insert your error message here, if the PDF cannot be displayed.</p>
    </object>
    <!--iframe src={url} title={displayname} class="embed-responsive-item" allowfullscreen ></iframe-->
  </div>
{:else}
  <a href="{url}" title="{displayname}">link {displayname}</a>
{/if}
