<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { project } from "$src/project.svelte.ts";

  let selectedColumn = $derived.by(() => {
    return project.columns.get(project.selectedColumnId!);
  });
</script>

{#if selectedColumn}
  <Card.Root>
    <Card.Header>
      <Card.Title>Column</Card.Title>
    </Card.Header>
    <Card.Content class="-mt-3">
      <Input
        type="text"
        bind:value={
          () => selectedColumn?.name, (v) => (selectedColumn.name = v)
        }
      />
      <Button onclick={() => project.addPart(selectedColumn.id)}
        >add Part</Button
      >
    </Card.Content>
  </Card.Root>
{/if}
