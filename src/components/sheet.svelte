<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  import { Sheet } from "$src/types.svelte"
  import { project } from "$src/project.svelte.ts";
  import Column from "$src/components/column.svelte";

  function clickedSheet(e: Event) {
    e.stopPropagation();
    project.selectedSheetId = sheet.id;
  }

  let { sheet } : { sheet: Sheet } = $props();
</script>


<div
  class="flex w-[var(--w)] h-[var(--h)] border border-black bg-linear-135 from-slate-50 to-slate-200 hover:from-slate-100 hover:to-slate-300 z-0"
  style="--w: {sheet.width}px; --h: {sheet.height}px;"
  onclick={clickedSheet}
>
  {#each sheet.columns as column}
    <Column {column} />
  {/each}
</div>
