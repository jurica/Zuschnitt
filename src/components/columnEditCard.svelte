<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { data } from "$src/project.svelte.ts";

  let selectedColumn = $derived.by(() => {
    return data.project.columns.get(data.project.selectedColumnId!);
  });
</script>

{#if selectedColumn}
  <Card.Root class="p-3">
    <div class="space-y-2">
      <h3 class="font-medium text-sm">Column</h3>
      <Input
        type="text"
        placeholder="Column name"
        class="h-8 text-sm"
        bind:value={
          () => selectedColumn?.name, (v) => (selectedColumn.name = v)
        }
      />
      <Button 
        size="sm" 
        class="h-7 text-xs w-full"
        onclick={() => data.project.addPart(selectedColumn.id)}
        >Add Part</Button
      >
    </div>
  </Card.Root>
{/if}
