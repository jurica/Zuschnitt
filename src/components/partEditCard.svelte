<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { X } from "@lucide/svelte";
  import { data } from "$src/project.svelte.ts";

  let selectedPart = $derived.by(() => {
    document.getElementById("inputPartWidth")?.focus();
    return data.project.parts.get(data.project.selectedPartId!);
  });
</script>

{#if selectedPart}
  <Card.Root class="p-3">
    <div class="space-y-2">
      <h3 class="font-medium text-sm">Part</h3>
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
    </div>
  </Card.Root>
{/if}
