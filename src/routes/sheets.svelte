<script lang="ts">
  import Sheet from "$src/components/sheet.svelte";
  import SheetEditCard from "$src/components/sheetEditCard.svelte";
  import ColumnEditCard from "$src/components/columnEditCard.svelte";
  import PartEditCard from "$src/components/partEditCard.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { project } from "$src/project.svelte.ts";
</script>

<div class="flex pb-2 fixed bottom-4 right-4 z-10">
  <PartEditCard />
  <ColumnEditCard />
  <SheetEditCard />
</div>

<div class="origin-top-left scale-[var(--scale)]" style="--scale: {project.scale}">
  {#each project.sheets.values() as sheet}
    <Sheet {sheet} />
  {/each}
</div>
