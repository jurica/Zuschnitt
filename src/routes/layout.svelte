<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$src/components/app-sidebar.svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { Snippet } from "svelte";
  import { p } from "sv-router/generated";
  import { Button } from "$lib/components/ui/button/index.js";

  let { children }: { children: Snippet } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
        />
        Zuschnitt
      </div>
    </header>
    <Separator />
    <div class="px-2 p-2">
      {@render children?.()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
