<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$src/components/app-sidebar.svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import type { Snippet } from "svelte";
  import ProjectIo from "$src/components/project-io.svelte";
  import CombinedEditCard from "$src/components/combinedEditCard.svelte";
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

  const sidebar = Sidebar.useSidebar();
</script>

<div class="[--header-height:calc(--spacing(28))]">
  <Sidebar.Provider class="flex flex-col">
    <header
      class="bg-background fixed top-0 left-0 right-0 z-50 flex w-full items-center border-b"
    >
      <div class="h-(--header-height) flex w-full items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <div class="flex-1 flex justify-center">
          <CombinedEditCard />
        </div>
      </div>
    </header>
    <div class="flex flex-1 pt-[var(--header-height)]">
      <AppSidebar />
      <Sidebar.Inset>
        <div class="flex flex-1 flex-col gap-4 p-4">
          {@render children?.()}
        </div>
      </Sidebar.Inset>
    </div>
  </Sidebar.Provider>
</div>

<!-- Project Import/Export Controls -->
{#if data.showProjectIo}
  <div class="fixed top-4 right-4 z-20">
    <ProjectIo
      project={data.project}
      onProjectImported={handleProjectImported}
    />
  </div>
{/if}
