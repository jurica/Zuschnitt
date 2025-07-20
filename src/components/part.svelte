<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  import { project, setSelectedPartId } from "$src/project.svelte.ts";
  import type { Part } from "$src/types";

  function clickedPart(e: Event) {
    e.stopPropagation();
    console.log("part");
    
    setSelectedPartId(part.id);
    console.log(project.selectedPartId);
  }

  let { part }: { part: Part } = $props();
</script>

<div
  class="w-[var(--w)] h-[var(--h)] border border-black hover:border-2 hover:border-orange-500 bg-linear-45 from-orange-50 hover:from-orange-100 to-orange-200 hover:to-orange-300"
  style="--w: {part.width}px; --h: {part.height}px;"
  onclick={clickedPart}
>
</div>
