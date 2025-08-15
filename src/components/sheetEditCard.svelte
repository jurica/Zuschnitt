<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { X } from "@lucide/svelte";
  import { data } from "$src/project.svelte.ts";

  let selectedSheet = $derived.by(() => {
    return data.project.sheets.get(data.project.selectedSheetId!);
  });
</script>

{#if selectedSheet}
  <Card.Root class="p-3">
    <div class="space-y-2">
      <h3 class="font-medium text-sm">Sheet</h3>
      <Input
        type="text"
        placeholder="Sheet name"
        class="h-8 text-sm"
        bind:value={() => selectedSheet?.name, (v) => (selectedSheet.name = v)}
      />
      <div class="flex items-center gap-1">
        <Input
          id="input"
          type="number"
          placeholder="W"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedSheet?.width, (v) => (selectedSheet.width = v)
          }
        />
        <X class="w-3 h-3 text-muted-foreground" />
        <Input
          type="number"
          placeholder="H"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedSheet?.height, (v) => (selectedSheet.height = v)
          }
        />
      </div>
      <Button
        size="sm"
        class="h-7 text-xs w-full"
        onclick={() => {
          const column = data.project.addColumn(selectedSheet.id);
          if (column) {
            data.project.addPart(column.id);
          }
        }}>Add Column</Button
      >
    </div>
  </Card.Root>
{/if}
