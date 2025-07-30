<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Sheet from "$src/components/sheet.svelte";
  import { project } from "$src/project.svelte.ts";

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  var scale = $state(0.55);
  let selectedPart = $derived.by(() => {
    document.getElementById("input")?.focus();
    return project.parts.get(project.selectedPartId);
  });
</script>

<div class="flex p-1">
  <Button onclick={() => (scale -= 0.05)}>-</Button>
  <p class="p-1">{formatter.format(scale)}</p>
  <Button onclick={() => (scale += 0.05)}>+</Button>
</div>

<Button onclick={() => project.addPart(project.selectedColumnId)}>add Part</Button
>
<Button
  onclick={() => {
    const column = project.addColumn(project.selectedSheetId);
    project.addPart(column.id);
  }}>add Column</Button
>
<p>Selected sheet: {project.selectedSheetId}</p>
<p>Selected column: {project.selectedColumnId}</p>
<p>Selected part: {project.selectedPartId}</p>

{#if selectedPart}
<div class="flex p-1">
  <Input
    id="input"
    type="number"
    class="w-22"
    bind:value={() => selectedPart?.width, (v) => (selectedPart.width = v)}
  />
  x
  <Input
    type="number"
    class="w-22"
    bind:value={() => selectedPart?.height, (v) => (selectedPart.height = v)}
  />
</div>
{/if}

<div class="origin-top-left scale-[var(--scale)]" style="--scale: {scale}">
  {#each project.sheets.values() as sheet}
    <Sheet {sheet} />
  {/each}
</div>
