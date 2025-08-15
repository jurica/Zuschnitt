<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  import { Part } from "$src/types.svelte"
  import { data } from "$src/project.svelte.ts";

  function clickedPart(e: Event) {
    e.stopPropagation();
    data.project.selectedPartId = part.id;
  }

  let { part }: { part: Part } = $props();
  let partElement: HTMLDivElement;

  // Scroll into view when this part becomes selected
  $effect(() => {
    if (data.project.selectedPartId === part.id && partElement) {
      // Check if element is already in viewport before scrolling
      const rect = partElement.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                          rect.bottom <= window.innerHeight && 
                          rect.right <= window.innerWidth;
      
      if (!isInViewport) {
        partElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  });
</script>

{#if part}
<div
  bind:this={partElement}
  class="w-[var(--w)] h-[var(--h)] border border-black hover:border-2 hover:border-orange-500 data-[isselected=true]:border-orange-500 bg-linear-45 from-orange-50 hover:from-orange-100 to-orange-200 hover:to-orange-300 data-[isselected=true]:to-amber-300"
  style="--w: {part.width}px; --h: {part.height}px;"
  data-isselected={data.project.selectedPartId === part.id}
  onclick={clickedPart}
>
</div>
{/if}
