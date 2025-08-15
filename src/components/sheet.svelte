<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  import { Sheet } from "$src/types.svelte"
  import { data } from "$src/project.svelte.ts";
  import Column from "$src/components/column.svelte";

  function clickedSheet(e: Event) {
    e.stopPropagation();
    data.project.selectedSheetId = sheet.id;
  }

  let { sheet } : { sheet: Sheet } = $props();
  let sheetElement: HTMLDivElement;

  // Scroll into view when this sheet becomes selected
  $effect(() => {
    if (data.project.selectedSheetId === sheet.id && sheetElement) {
      // Check if element is already in viewport before scrolling
      const rect = sheetElement.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                          rect.bottom <= window.innerHeight && 
                          rect.right <= window.innerWidth;
      
      if (!isInViewport) {
        sheetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  });
</script>


<div
  bind:this={sheetElement}
  class="flex w-[var(--w)] h-[var(--h)] border border-black bg-linear-135 from-slate-50 to-slate-200 hover:from-slate-100 hover:to-slate-300 z-0 data-[isselected=true]:border-2 data-[isselected=true]:border-slate-400 data-[isselected=true]:from-slate-100 data-[isselected=true]:to-slate-300"
  style="--w: {sheet.width}px; --h: {sheet.height}px;"
  data-isselected={data.project.selectedSheetId === sheet.id}
  onclick={clickedSheet}
>
  {#each sheet.columns as column}
    <Column {column} />
  {/each}
</div>
