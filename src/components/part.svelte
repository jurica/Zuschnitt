<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  function clickedPart(e: Event) {
    e.stopPropagation();
    console.log("part");
  }

  let { x, y, width, height } = $props();
</script>

<div
  class="absolute top-[var(--top)] left-[var(--left)] w-[var(--w)] h-[var(--h)] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"
  style="--top: {y}px; --left: {x}px; --w: {width}px; --h: {height}px;"
  onclick={clickedPart}
>
</div>
