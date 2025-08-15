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
  <Card.Root>
    <Card.Header>
      <Card.Title>Sheet</Card.Title>
    </Card.Header>
    <Card.Content class="-mt-3">
      <Input
        type="text"
        bind:value={() => selectedSheet?.name, (v) => (selectedSheet.name = v)}
      />
      <div class="flex items-center">
        <Input
          id="input"
          type="number"
          class="w-22"
          bind:value={
            () => selectedSheet?.width, (v) => (selectedSheet.width = v)
          }
        />
        <X />
        <Input
          type="number"
          class="w-22"
          bind:value={
            () => selectedSheet?.height, (v) => (selectedSheet.height = v)
          }
        />
      </div>
      <Button
        onclick={() => {
          const column = data.project.addColumn(selectedSheet.id);
          if (column) {
            data.project.addPart(column.id);
          }
        }}>add Column</Button
      >
    </Card.Content>
  </Card.Root>
{/if}
