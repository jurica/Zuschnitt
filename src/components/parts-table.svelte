<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<script lang="ts">
  import { data } from "$src/project.svelte.ts";
  import Input from "$lib/components/ui/input/input.svelte";
  import { cn } from "$lib/utils.js";

  // Create a flattened array of all parts with their hierarchy info
  let partsData = $derived.by(() => {
    const result: Array<{
      sheetId: string;
      sheetName: string;
      columnId: string;
      columnName: string;
      partId: string;
      partName: string;
      width: number;
      height: number;
    }> = [];

    for (const [sheetId, sheet] of data.project.sheets) {
      for (const column of sheet.columns) {
        for (const part of column.parts) {
          result.push({
            sheetId,
            sheetName: sheet.name,
            columnId: column.id,
            columnName: column.name,
            partId: part.id,
            partName: part.name,
            width: part.width,
            height: part.height,
          });
        }
      }
    }

    return result;
  });

  // Calculate totals
  let totals = $derived.by(() => {
    const totalWidth = partsData.reduce((sum, part) => sum + part.width, 0);
    const totalHeight = partsData.reduce((sum, part) => sum + part.height, 0);
    const totalArea = partsData.reduce((sum, part) => sum + (part.width * part.height), 0);
    const count = partsData.length;

    return {
      totalWidth,
      totalHeight,
      totalArea,
      count,
      avgWidth: count > 0 ? totalWidth / count : 0,
      avgHeight: count > 0 ? totalHeight / count : 0,
    };
  });

  function selectPart(partId: string) {
    data.project.selectedPartId = partId;
  }

  function updatePartName(partId: string, name: string) {
    const part = data.project.parts.get(partId);
    if (part) {
      part.name = name;
    }
  }

  function updatePartWidth(partId: string, width: string) {
    const part = data.project.parts.get(partId);
    if (part) {
      const numValue = parseInt(width);
      if (!isNaN(numValue) && numValue >= 0) {
        part.width = numValue;
      }
    }
  }

  function updatePartHeight(partId: string, height: string) {
    const part = data.project.parts.get(partId);
    if (part) {
      const numValue = parseInt(height);
      if (!isNaN(numValue) && numValue >= 0) {
        part.height = numValue;
      }
    }
  }

  function deletePart(partId: string) {
    data.project.deletePart(partId);
  }

  function duplicatePart(partId: string) {
    data.project.duplicatePart(partId);
  }

  function updateSheetName(sheetId: string, name: string) {
    const sheet = data.project.sheets.get(sheetId);
    if (sheet) {
      sheet.name = name;
    }
  }

  function updateColumnName(columnId: string, name: string) {
    const column = data.project.columns.get(columnId);
    if (column) {
      column.name = name;
    }
  }

  // Group consecutive rows by sheet and column for better visual organization
  let groupedData = $derived.by(() => {
    const groups: Array<{
      sheetName: string;
      columnName: string;
      parts: Array<{
        sheetId: string;
        sheetName: string;
        columnId: string;
        columnName: string;
        partId: string;
        partName: string;
        width: number;
        height: number;
      }>;
      isFirst: boolean;
    }> = [];

    let currentSheet = '';
    let currentColumn = '';
    let currentGroup: Array<{
      sheetId: string;
      sheetName: string;
      columnId: string;
      columnName: string;
      partId: string;
      partName: string;
      width: number;
      height: number;
    }> = [];

    for (const item of partsData) {
      const sheetColumnKey = `${item.sheetId}-${item.columnId}`;
      const prevSheetColumnKey = `${currentSheet}-${currentColumn}`;

      if (sheetColumnKey !== prevSheetColumnKey) {
        if (currentGroup.length > 0) {
          groups.push({
            sheetName: partsData.find((p) => p.sheetId === currentSheet)?.sheetName || '',
            columnName: partsData.find((p) => p.columnId === currentColumn)?.columnName || '',
            parts: [...currentGroup],
            isFirst: groups.length === 0,
          });
        }
        currentGroup = [];
        currentSheet = item.sheetId;
        currentColumn = item.columnId;
      }
      currentGroup.push(item);
    }

    if (currentGroup.length > 0) {
      groups.push({
        sheetName: partsData.find((p) => p.sheetId === currentSheet)?.sheetName || '',
        columnName: partsData.find((p) => p.columnId === currentColumn)?.columnName || '',
        parts: [...currentGroup],
        isFirst: groups.length === 0,
      });
    }

    return groups;
  });

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
</script>

<div class="w-full h-full overflow-auto bg-white parts-table-container">
  <div class="min-w-max">
    <!-- Summary stats -->
    <div class="bg-blue-50 border-b border-blue-200 px-4 py-2">
      <div class="flex gap-6 text-sm text-blue-800">
        <span><strong>Total Parts:</strong> {totals.count}</span>
        <span><strong>Total Area:</strong> {formatter.format(totals.totalArea)}</span>
        <span><strong>Avg. Width:</strong> {formatter.format(totals.avgWidth)}</span>
        <span><strong>Avg. Height:</strong> {formatter.format(totals.avgHeight)}</span>
      </div>
    </div>

    <!-- Header -->
    <div class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
      <div class="grid grid-cols-[200px_200px_150px_100px_100px_120px] gap-px bg-gray-200">
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Sheet</div>
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Column</div>
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Part Name</div>
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Width</div>
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Height</div>
        <div class="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">Actions</div>
      </div>
    </div>

    <!-- Data rows -->
    <div class="bg-gray-100">
      {#each groupedData as group}
        {#each group.parts as item, index}
          <div 
            class={cn(
              "grid grid-cols-[200px_200px_150px_100px_100px_120px] gap-px bg-gray-200 hover:bg-blue-50 transition-colors cursor-pointer",
              data.project.selectedPartId === item.partId && "bg-blue-100 hover:bg-blue-150"
            )}
            onclick={() => selectPart(item.partId)}
          >
            <!-- Sheet name (only show for first part in group) -->
            <div class="bg-white px-2 py-1 text-sm text-gray-700">
              {#if index === 0}
                <Input
                  type="text"
                  value={item.sheetName}
                  class="h-7 text-sm border-0 shadow-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500 font-medium"
                  onclick={(e) => e.stopPropagation()}
                  oninput={(e) => updateSheetName(item.sheetId, e.currentTarget.value)}
                />
              {/if}
            </div>

            <!-- Column name (only show for first part in group) -->
            <div class="bg-white px-2 py-1 text-sm text-gray-700">
              {#if index === 0}
                <Input
                  type="text"
                  value={item.columnName}
                  class="h-7 text-sm border-0 shadow-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500 font-medium"
                  onclick={(e) => e.stopPropagation()}
                  oninput={(e) => updateColumnName(item.columnId, e.currentTarget.value)}
                />
              {/if}
            </div>

            <!-- Part name -->
            <div class="bg-white px-2 py-1">
              <Input
                type="text"
                value={item.partName}
                class="h-7 text-sm border-0 shadow-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500"
                onclick={(e) => e.stopPropagation()}
                oninput={(e) => updatePartName(item.partId, e.currentTarget.value)}
              />
            </div>

            <!-- Width -->
            <div class="bg-white px-2 py-1">
              <Input
                type="number"
                value={item.width.toString()}
                class="h-7 text-sm border-0 shadow-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500 text-right"
                onclick={(e) => e.stopPropagation()}
                oninput={(e) => updatePartWidth(item.partId, e.currentTarget.value)}
                min="0"
                step="1"
              />
            </div>

            <!-- Height -->
            <div class="bg-white px-2 py-1">
              <Input
                type="number"
                value={item.height.toString()}
                class="h-7 text-sm border-0 shadow-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500 text-right"
                onclick={(e) => e.stopPropagation()}
                oninput={(e) => updatePartHeight(item.partId, e.currentTarget.value)}
                min="0"
                step="1"
              />
            </div>

            <!-- Actions -->
            <div class="bg-white px-2 py-1 flex gap-1">
              <button
                type="button"
                class="h-7 px-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onclick={(e) => { e.stopPropagation(); duplicatePart(item.partId); }}
                title="Duplicate part"
              >
                ⧉
              </button>
              <button
                type="button"
                class="h-7 px-2 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onclick={(e) => { e.stopPropagation(); deletePart(item.partId); }}
                title="Delete part"
              >
                ×
              </button>
            </div>
          </div>
        {/each}
      {/each}

      <!-- Empty state -->
      {#if partsData.length === 0}
        <div class="bg-white px-3 py-8 text-center text-gray-500">
          <p class="text-sm">No parts found</p>
          <p class="text-xs mt-1">Create sheets and columns to add parts</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar styling */
  :global(.parts-table-container) {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
  }

  :global(.parts-table-container::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(.parts-table-container::-webkit-scrollbar-track) {
    background: #f1f5f9;
  }

  :global(.parts-table-container::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border-radius: 4px;
  }

  :global(.parts-table-container::-webkit-scrollbar-thumb:hover) {
    background: #94a3b8;
  }
</style>
