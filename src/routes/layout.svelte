<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$src/components/app-sidebar.svelte";
  import type { Snippet } from "svelte";
  import { p } from "sv-router/generated";
  import { Button } from "$lib/components/ui/button/index.js";

  let { children }: { children: Snippet } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    <a href={p("/")}>Home</a>
    <a href={p("/about")}>About</a>
    <Button variant="outline">Button</Button>

    {@render children?.()}
  </main>
</Sidebar.Provider>
