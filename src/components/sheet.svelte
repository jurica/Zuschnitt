<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  function clickedSheet(e: Event) {
    e.stopPropagation();
    console.log("sheet");
  }

  let { children, width, height } = $props();
</script>


<div
  class="flex w-[var(--w)] h-[var(--h)] border border-black bg-linear-135 from-slate-50 to-slate-200 hover:from-slate-100 hover:to-slate-300 z-0"
  style="--w: {width}px; --h: {height}px;"
  onclick={clickedSheet}
>
    {@render children?.()}
</div>
