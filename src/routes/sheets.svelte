<script lang="ts">
  import Sheet from "$src/components/sheet.svelte";
  import SheetEditCard from "$src/components/sheetEditCard.svelte";
  import ColumnEditCard from "$src/components/columnEditCard.svelte";
  import PartEditCard from "$src/components/partEditCard.svelte";
  import ProjectIo from "$src/components/project-io.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { data } from "$src/project.svelte.ts";
  import type { Project } from "$src/types.svelte";

  function handleProjectImported(newProject: Project) {
    // Replace the current project with the imported one
    //Object.assign(project, newProject);
    data.project = newProject;
  }

  let project = data.project;
</script>

<div class="flex pb-2 fixed bottom-4 right-4 z-10">
  <PartEditCard />
  <ColumnEditCard />
  <SheetEditCard />
</div>

<!-- Project Import/Export Controls -->
<div class="fixed top-4 right-4 z-20">
  <ProjectIo {project} onProjectImported={handleProjectImported} />
</div>

<div class="origin-top-left scale-[var(--scale)]" style="--scale: {project.scale}">
  {#each project.sheets.values() as sheet}
    <Sheet {sheet} />
  {/each}
</div>
