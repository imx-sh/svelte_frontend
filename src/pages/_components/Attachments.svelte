<script>
  import Attachment from "./Attachment.svelte";
  import { _, number } from "../../i18n";
  import Icon from "./Icon.svelte";
  import ReplyModal from "./ReplyModal.svelte";
  import signedin_user from "../managed/_stores/signedin_user.js";
  import ContentModal from "../managed/_components/ContentModal.svelte";
  import { Button, ListGroup, ListGroupItem, CardBody, CardFooter } from "sveltestrap";

  export let data;
  export let extended;

  let media;
  let replies;

  $: {
    replies = data?.attachments?.reply || []
    media   = data?.attachments?.media || []
  }

  let mediaModal = false;
  function createMedia() {
    mediaModal = !mediaModal;
  }

  let replyModal = false;
  function reply() {
    replyModal = !replyModal;
  }
</script>

{#if extended}
  <ContentModal subpath="{data.subpath}" parent_shortname="{data.shortname}" bind:open="{mediaModal}" fix_resource_type="media" />
  <ReplyModal subpath="{data.subpath}" parent_shortname="{data.shortname}" bind:open="{replyModal}" />

  <CardBody>
    <CardFooter class="py-2">
      {$_("attachments")} ({$number(media ? media.length : 0)})
      {#if $signedin_user}
        <div class="float-end mb-0 mt-n1">
          <Button href="#" title="Add" on:click="{createMedia}" size="sm" outline>
            <Icon name="plus-square-dotted" class="fs-6" />
          </Button>
        </div>
      {/if}
    </CardFooter>
    {#if media}
      <ListGroup>
        {#each media as attachment (attachment.uuid)}
          <ListGroupItem>
            <Attachment data="{attachment}" parent_shortname="{data.shortname}" />
          </ListGroupItem>
        {/each}
      </ListGroup>
    {/if}
  </CardBody>

  <CardBody class="pt-2">
    <CardFooter class="py-2">
      {$_("replies")} ({$number(replies ? replies.length : 0)})

      <div class="float-end mb-0 mt-n1">
        <Button href="#" title="Add" on:click="{reply}" size="sm" outline>
          <Icon name="plus-square-dotted" class="fs-6" />
        </Button>
      </div>
    </CardFooter>
    {#if replies}
      <ListGroup>
        {#each replies as attachment (attachment.uuid)}
          <ListGroupItem>
            <Attachment data="{attachment}" parent_shortname="{data.shortname}" />
          </ListGroupItem>
        {/each}
      </ListGroup>
    {/if}
  </CardBody>
{/if}
