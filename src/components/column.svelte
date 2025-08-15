<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  import { Column } from "$src/types.svelte"
  import { data } from "$src/project.svelte.ts";
  import Part from "$src/components/part.svelte";

  function clickedColumn(e: Event) {
    e.stopPropagation();
    data.project.selectedColumnId = column.id;
  }

  let { column } : { column: Column } = $props();
</script>

<div
  class="w-auto h-full border border-black bg-linear-45 from-sky-50 hover:from-sky-100 to-sky-200 hover:to-sky-300"
  onclick={clickedColumn}
  data-isselected={data.project.selectedColumnId === column.id}
>
  {#each column.parts as part}
    <Part {part} />
  {/each}
</div>
