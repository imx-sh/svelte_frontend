<script>
  import Icon from "./Icon.svelte";
  import MediaView from "./MediaView.svelte";
  import { Button } from "sveltestrap";
  import { date } from "../../i18n";
  import { imx_delete_content } from "../../imx";
  import signedin_user from "../managed/_stores/signedin_user.js";
  export let data;
  export let parent_shortname;
  // console.log("Attachment details: ", data);
  let author = "";
  if ("author" in data.attributes) author = data.attributes.author.shortname;

  let datetime = "";
  if ("created_at" in data.attributes && data.attributes.created_at) {
    //console.log( "x[", data.shortname, "]x >> y[", data.attributes.created_at, "]y");
    datetime = $date(
      Date.parse(
        data.attributes.created_at
          .replace(" ", "T")
          .replace(" UTC", "")
          .replace(" ", "")
      ),
      { format: "short" }
    );
  }

  async function deleteAttachment() {
    if (
      confirm(
        `Are you sure you want to delete the attachment "${data.displayname}|${data.shortname}"?`
      )
    ) {
      console.log(
        "User requested to delete: ",
        data.shortname,
        " childof: ",
        data.subpath
      );
      let resp = await imx_delete_content(
        data.resource_type,
        data.subpath,
        data.shortname,
        parent_shortname
      );
      console.log("Result: ", resp);
    }
  }
</script>

{#if $signedin_user}
  <div class="float-start mb-0">
    <Button
      href="/managed/{data.subpath}/{data.shortname}"
      title="Manage"
      size="sm"
      outline
    >
      <Icon name="pencil" />
    </Button>
    <Button
      href="#"
      title="Delete"
      on:click="{deleteAttachment}"
      size="sm"
      outline
    >
      <Icon name="trash" />
    </Button>
  </div>
{/if}
<Icon name="person" />
{author}
<Icon name="clock" />
{datetime} <br />
{#if data.resource_type == "reply"}
  {#if data.attributes.displayname}
    {data.attributes.displayname} -
  {/if}
  {data.attributes.payload.embedded}
{:else if data.resource_type == "media"}
  <MediaView
    content_type="{data.attributes.payload.content_type}"
    url="{data.url}"
    displayname="{data.displayname}"
  />
{/if}

<style>
  /*
  img {
    max-width: 100%;
    height: auto;
  }*/
</style>
