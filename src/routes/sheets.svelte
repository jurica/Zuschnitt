<script lang="ts">
  import Sheet from "$src/components/sheet.svelte";
  import { data } from "$src/project.svelte.ts";
  import type { Project } from "$src/types.svelte";

  function handleProjectImported(newProject: Project) {
    // Replace the current project with the imported one
    //Object.assign(project, newProject);
    data.project = newProject;
  }

  let project = data.project;
  let scaledContainer: HTMLDivElement;

  // Calculate the total content dimensions (sheets stack vertically)
  let totalWidth = $derived(Math.max(...Array.from(project.sheets.values()).map(sheet => sheet.width)) || 0);
  let totalHeight = $derived((() => {
    const sheetsHeight = Array.from(project.sheets.values()).reduce((sum, sheet) => sum + sheet.height, 0) || 0;
    const spacingHeight = Math.max(0, project.sheets.size - 1) * 16; // 16px spacing between sheets
    return sheetsHeight + spacingHeight;
  })());
  
  // Calculate scaled dimensions
  let scaledWidth = $derived(totalWidth * project.scale);
  let scaledHeight = $derived(totalHeight * project.scale);
</script>

<div class="overflow-hidden" style="width: {scaledWidth}px; height: {scaledHeight}px;">
  <div 
    bind:this={scaledContainer}
    class="origin-top-left scale-[var(--scale)] space-y-4" 
    style="--scale: {project.scale}; width: {totalWidth}px; height: {totalHeight}px;"
  >
    {#each project.sheets.values() as sheet}
      <Sheet {sheet} />
    {/each}
  </div>
</div>
