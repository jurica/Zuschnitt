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
  let columnElement: HTMLDivElement;

  // Scroll into view when this column becomes selected
  $effect(() => {
    if (data.project.selectedColumnId === column.id && columnElement) {
      // Check if element is already in viewport before scrolling
      const rect = columnElement.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                          rect.bottom <= window.innerHeight && 
                          rect.right <= window.innerWidth;
      
      if (!isInViewport) {
        columnElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  });
</script>

<div
  bind:this={columnElement}
  class="w-auto h-full border border-black bg-linear-45 from-sky-50 hover:from-sky-100 to-sky-200 hover:to-sky-300 data-[isselected=true]:border-2 data-[isselected=true]:border-sky-400 data-[isselected=true]:from-sky-100 data-[isselected=true]:to-sky-300"
  onclick={clickedColumn}
  data-isselected={data.project.selectedColumnId === column.id}
>
  {#each column.parts as part}
    <Part {part} />
  {/each}
</div>
