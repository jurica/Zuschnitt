<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { X, Trash2, Copy, XCircle } from "@lucide/svelte";
  import { data } from "$src/project.svelte.ts";

  let selectedSheet = $derived.by(() => {
    return data.project.sheets.get(data.project.selectedSheetId!);
  });

  let selectedColumn = $derived.by(() => {
    return data.project.columns.get(data.project.selectedColumnId!);
  });

  let selectedPart = $derived.by(() => {
    document.getElementById("inputPartWidth")?.focus();
    return data.project.parts.get(data.project.selectedPartId!);
  });
</script>

{#if selectedSheet}
<Card.Root class="p-4">
  <div class="grid gap-4" class:grid-cols-1={!selectedColumn && !selectedPart} class:grid-cols-2={selectedColumn && !selectedPart} class:grid-cols-3={selectedColumn && selectedPart}>
    <!-- Part Column -->
    {#if selectedPart}
    <div class="space-y-2 relative">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-sm font-bold">Part</h3>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.duplicatePart(selectedPart.id)}
          >
            <Copy class="w-3 h-3" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.selectedPartId = undefined}
          >
            <XCircle class="w-3 h-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.deletePart(selectedPart.id)}
          >
            <Trash2 class="w-3 h-3" />
          </Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Part name"
        class="h-8 text-sm"
        bind:value={() => selectedPart?.name, (v) => (selectedPart.name = v)}
      />
      <div class="flex items-center gap-1">
        <Input
          id="inputPartWidth"
          type="number"
          placeholder="W"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedPart?.width, (v) => (selectedPart.width = v)
          }
        />
        <X class="w-3 h-3 text-muted-foreground" />
        <Input
          type="number"
          placeholder="H"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedPart?.height, (v) => (selectedPart.height = v)
          }
        />
      </div>
      <div class="h-7"></div> <!-- Spacer to align with button heights -->
    </div>
    {/if}

    <!-- Column Column -->
    {#if selectedColumn}
    <div class="space-y-2 relative">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-sm font-bold">Column</h3>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.duplicateColumn(selectedColumn.id)}
          >
            <Copy class="w-3 h-3" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.selectedColumnId = undefined}
          >
            <XCircle class="w-3 h-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.deleteColumn(selectedColumn.id)}
          >
            <Trash2 class="w-3 h-3" />
          </Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Column name"
        class="h-8 text-sm"
        bind:value={
          () => selectedColumn?.name, (v) => (selectedColumn.name = v)
        }
      />
      <div class="h-8"></div> <!-- Spacer to align with other columns -->
      <Button 
        size="sm" 
        class="h-7 text-xs w-full"
        onclick={() => {
          const part = data.project.addPart(selectedColumn.id);
          data.project.selectedPartId = part.id;
        }}
        >Add Part</Button
      >
    </div>
    {/if}

    <!-- Sheet Column -->
    <div class="space-y-2 relative">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-sm font-bold">Sheet</h3>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.duplicateSheet(selectedSheet.id)}
          >
            <Copy class="w-3 h-3" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.selectedSheetId = undefined}
          >
            <XCircle class="w-3 h-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => data.project.deleteSheet(selectedSheet.id)}
          >
            <Trash2 class="w-3 h-3" />
          </Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Sheet name"
        class="h-8 text-sm"
        bind:value={() => selectedSheet?.name, (v) => (selectedSheet.name = v)}
      />
      <div class="flex items-center gap-1">
        <Input
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
            data.project.selectedColumnId = column.id;
            const part = data.project.addPart(column.id);
            data.project.selectedPartId = part.id;
          }
        }}>Add Column</Button
      >
    </div>
  </div>
</Card.Root>
{/if}
