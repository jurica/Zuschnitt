<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<script lang="ts">
  function clickedColumn(e: Event) {
    e.stopPropagation();
    console.log("column");
  }

  let { children, x, width } = $props();
</script>

<div
  class="absolute left-[var(--left)] w-[var(--w)] h-full border border-black bg-linear-45 from-cyan-50 hover:from-cyan-100 to-cyan-200 hover:to-cyan-300"
  style="--w: {width}px; --left: {x}px;"
  onclick={clickedColumn}
>
  {@render children?.()}
</div>
