<script>
  import Attachment from "./Attachment.svelte";
  import { _, number } from "../../i18n";
  import Icon from "./Icon.svelte";
  import ReplyModal from "./ReplyModal.svelte";
  import signedin_user from "../managed/_stores/signedin_user.js";
  import ContentModal from "./ContentModal.svelte";
  import {
    Button,
    ListGroup,
    ListGroupItem,
    CardBody,
    CardFooter,
  } from "sveltestrap";

  export let subpath;
  export let parent_shortname;
  export let attachments;
  export let extended;

  let media;
  let replies;

  if (attachments.reply) replies = attachments.reply;
  if (attachments.media) media = attachments.media;

  function handle(type) {
    console.log(subpath, parent_shortname);
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
  <ContentModal
    subpath="{subpath}"
    parent_shortname="{parent_shortname}"
    bind:open="{mediaModal}"
    fix_resource_type="media"
  />
  <ReplyModal
    subpath="{subpath}"
    parent_shortname="{parent_shortname}"
    bind:open="{replyModal}"
  />
{/if}

{#if extended}
  <CardBody>
    <CardFooter class="py-2">
      {$_("attachments")} ({$number(media ? media.length : 0)})
      {#if $signedin_user}
        <div class="float-start mb-0 mt-n1">
          <Button
            href="#"
            title="Add"
            on:click="{createMedia}"
            size="sm"
            outline
          >
            <Icon name="plus" />
          </Button>
        </div>
      {/if}
    </CardFooter>
    {#if media}
      <ListGroup>
        {#each media as attachment}
          <ListGroupItem>
            <Attachment
              data="{attachment}"
              parent_shortname="{parent_shortname}"
            />
          </ListGroupItem>
        {/each}
      </ListGroup>
    {/if}
  </CardBody>
{/if}
{#if extended}
  <CardBody class="pt-2">
    <CardFooter class="py-2">
      {$_("replies")} ({$number(replies ? replies.length : 0)})

      <div class="float-start mb-0 mt-n1">
        <Button href="#" title="Add" on:click="{reply}" size="sm" outline>
          <Icon name="plus" />
        </Button>
      </div>
    </CardFooter>
    {#if replies}
      <ListGroup>
        {#each replies as attachment}
          <ListGroupItem>
            <Attachment
              data="{attachment}"
              parent_shortname="{parent_shortname}"
            />
          </ListGroupItem>
        {/each}
      </ListGroup>
    {/if}
  </CardBody>
{/if}
