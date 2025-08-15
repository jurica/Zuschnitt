<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$src/components/app-sidebar.svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import type { Snippet } from "svelte";
  import ProjectIo from "$src/components/project-io.svelte";
  import { data } from "$src/project.svelte.ts";
  import type { Project } from "$src/types.svelte";
    import { navigate } from "sv-router/generated";

  let { children }: { children: Snippet } = $props();

  function handleProjectImported(newProject: Project) {
    // Replace the current project with the imported one
    //Object.assign(project, newProject);
    data.project = newProject;
          navigate("/sheets");
  }
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
      </div>
    </header>
    <Separator />
    <div class="px-2 p-2">
      {@render children?.()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
<!-- Project Import/Export Controls -->
{#if data.showProjectIo}
<div class="fixed top-4 right-4 z-20">
  <ProjectIo project={data.project} onProjectImported={handleProjectImported} />
</div>
{/if}
