<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { X, Trash2, Copy, XCircle, ChevronLeft, ChevronRight, Minimize2, Maximize2, Plus } from "@lucide/svelte";
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

  // Collapse and minimize states
  let showColumn = $state(true);
  let showSheet = $state(true);
  let isMinimized = $state(false);

  // Ensure showColumn is true when no part is selected
  $effect(() => {
    if (!selectedPart && selectedColumn) {
      showColumn = true;
    }
  });

  // Ensure showSheet and showColumn are true when no column is selected
  $effect(() => {
    if (!selectedColumn && selectedSheet) {
      showSheet = true;
      showColumn = true;
    }
  });

  // Handle mouse wheel scroll for numeric inputs
  function handleScroll(event: WheelEvent, getValue: () => number, setValue: (value: number) => void) {
    event.preventDefault();
    const currentValue = getValue();
    const delta = event.deltaY > 0 ? -1 : 1;
    const newValue = Math.max(0, currentValue + delta);
    setValue(newValue);
  }
</script>

{#if selectedSheet}
<div class="p-2">
  {#if isMinimized && selectedPart}
    <!-- Minimized view - only readonly part info -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="font-medium text-sm">{selectedPart.name}</span>
        <span class="text-xs text-muted-foreground">{selectedPart.width} × {selectedPart.height}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        class="h-6 w-6 p-0"
        onclick={() => isMinimized = false}
      >
        <Maximize2 class="w-3 h-3" />
      </Button>
    </div>
  {:else}
    <div class="grid gap-2" 
         class:grid-cols-1={(!selectedPart && (!selectedColumn || !showColumn || !showSheet)) || (selectedPart && (!selectedColumn || !showColumn))} 
         class:grid-cols-2={(!selectedPart && selectedColumn && showColumn && showSheet) || (selectedPart && selectedColumn && showColumn && !showSheet)} 
         class:grid-cols-3={selectedPart && selectedColumn && showColumn && showSheet}>
      <!-- Part Column -->
      {#if selectedPart}
      <div class="space-y-1 relative" class:border-r={selectedColumn && showColumn} class:border-border={selectedColumn && showColumn} class:pr-2={selectedColumn && showColumn}>
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
          {#if selectedColumn && showColumn}
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => {showColumn = false; showSheet = false;}}
          >
            <ChevronRight class="w-3 h-3" />
          </Button>
          {/if}
          {#if selectedColumn && !showColumn}
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => showColumn = true}
          >
            <ChevronLeft class="w-3 h-3" />
          </Button>
          {#if selectedPart}
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => isMinimized = true}
          >
            <Minimize2 class="w-3 h-3" />
          </Button>
          {/if}
          {/if}
        </div>
      </div>
      <Input
        type="text"
        placeholder="Part name"
        class="h-8 text-sm"
        bind:value={() => selectedPart?.name, (v) => (selectedPart.name = v)}
      />
      <div class="flex items-center justify-between">
        <Input
          id="inputPartWidth"
          type="number"
          placeholder="W"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedPart?.width, (v) => (selectedPart.width = v)
          }
          onwheel={(e) => handleScroll(e, () => selectedPart?.width || 0, (v) => selectedPart && (selectedPart.width = v))}
        />
        <X class="w-3 h-3 text-muted-foreground" />
        <Input
          type="number"
          placeholder="H"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedPart?.height, (v) => (selectedPart.height = v)
          }
          onwheel={(e) => handleScroll(e, () => selectedPart?.height || 0, (v) => selectedPart && (selectedPart.height = v))}
        />
      </div>
    </div>
    {/if}

    <!-- Column Column -->
    {#if selectedColumn && showColumn}
    <div class="space-y-1 relative" class:border-r={selectedSheet && showSheet} class:border-border={selectedSheet && showSheet} class:pr-2={selectedSheet && showSheet}>
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-sm font-bold">Column</h3>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => {
              const part = data.project.addPart(selectedColumn.id);
              data.project.selectedPartId = part.id;
            }}
          >
            <Plus class="w-3 h-3" />
          </Button>
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
          {#if selectedSheet && !showSheet}
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => showSheet = true}
          >
            <ChevronLeft class="w-3 h-3" />
          </Button>
          {#if selectedPart}
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => isMinimized = true}
          >
            <Minimize2 class="w-3 h-3" />
          </Button>
          {/if}
          {:else if selectedSheet && showSheet}
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => showSheet = false}
          >
            <ChevronRight class="w-3 h-3" />
          </Button>
          {/if}
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
      <div class="flex items-center justify-between">
        <Input
          type="text"
          placeholder="W"
          class="w-20 h-8 text-sm bg-muted text-muted-foreground cursor-default [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          readonly
          value={selectedColumn?.width || 0}
        />
        <X class="w-3 h-3 text-muted-foreground" />
        <Input
          type="text"
          placeholder="H"
          class="w-20 h-8 text-sm bg-muted text-muted-foreground cursor-default [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          readonly
          value={selectedColumn?.height || 0}
        />
      </div>
    </div>
    {/if}

    <!-- Sheet Column -->
    {#if selectedSheet && showSheet}
    <div class="space-y-1 relative">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-sm font-bold">Sheet</h3>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => {
              const column = data.project.addColumn(selectedSheet.id);
              if (column) {
                data.project.selectedColumnId = column.id;
                const part = data.project.addPart(column.id);
                data.project.selectedPartId = part.id;
              }
            }}
          >
            <Plus class="w-3 h-3" />
          </Button>
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
          {#if selectedPart}
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            onclick={() => isMinimized = true}
          >
            <Minimize2 class="w-3 h-3" />
          </Button>
          {/if}
        </div>
      </div>
      <Input
        type="text"
        placeholder="Sheet name"
        class="h-8 text-sm"
        bind:value={() => selectedSheet?.name, (v) => (selectedSheet.name = v)}
      />
      <div class="flex items-center justify-between">
        <Input
          type="number"
          placeholder="W"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedSheet?.width, (v) => (selectedSheet.width = v)
          }
          onwheel={(e) => handleScroll(e, () => selectedSheet?.width || 0, (v) => selectedSheet && (selectedSheet.width = v))}
        />
        <X class="w-3 h-3 text-muted-foreground" />
        <Input
          type="number"
          placeholder="H"
          class="w-20 h-8 text-sm"
          bind:value={
            () => selectedSheet?.height, (v) => (selectedSheet.height = v)
          }
          onwheel={(e) => handleScroll(e, () => selectedSheet?.height || 0, (v) => selectedSheet && (selectedSheet.height = v))}
        />
      </div>
    </div>
    {/if}
  </div>
  {/if}
</div>
{/if}
