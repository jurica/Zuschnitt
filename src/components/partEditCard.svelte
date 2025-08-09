<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { X } from "@lucide/svelte";
  import { project } from "$src/project.svelte.ts";

  let selectedPart = $derived.by(() => {
    document.getElementById("inputPartWidth")?.focus();
    return project.parts.get(project.selectedPartId!);
  });
</script>

{#if selectedPart}
  <Card.Root>
    <Card.Header>
      <Card.Title>Part</Card.Title>
    </Card.Header>
    <Card.Content class="-mt-3">
      <Input
        type="text"
        bind:value={() => selectedPart?.name, (v) => (selectedPart.name = v)}
      />
      <div class="flex items-center">
        <Input
          id="inputPartWidth"
          type="number"
          class="w-22"
          bind:value={
            () => selectedPart?.width, (v) => (selectedPart.width = v)
          }
        />
        <X />
        <Input
          type="number"
          class="w-22"
          bind:value={
            () => selectedPart?.height, (v) => (selectedPart.height = v)
          }
        />
      </div>
    </Card.Content>
  </Card.Root>
{/if}
