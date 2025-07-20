<script lang="ts">
  import { Square, Columns4, Grid3x3, HouseIcon, InfoIcon, SettingsIcon } from "@lucide/svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { p } from "sv-router/generated";
  import { project } from "$src/project.svelte.ts";
  import Sheet from "$src/components/sheet.svelte";

  // Menu items.
  const items = [
    {
      title: "Home",
      url: p("/"),
      icon: HouseIcon,
    },
    {
      title: "Sheet 1",
      url: p("/sheets"),
      icon: Grid3x3,
    },
    {
      title: "About",
      url: p("/about"),
      icon: InfoIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];
  project.sheets.forEach((sheet, key, map) => {
    items.push({
      title: `Sheet: ${sheet.name}`,
      url: "/sheets",
      icon: Grid3x3,
    });
    sheet.columns.forEach((columnId) => {
      const column = project.columns.get(columnId);
      items.push({
        title: `Column: ${column.name}`,
        url: "/sheets",
        icon: Columns4,
      });
      column?.parts.forEach((partId, idx) => {
        const part = project.parts.get(partId);
        items.push({
          title: `#${idx} ${part?.name}`,
          url: "/sheets",
          icon: Square,
        });
      });
    });
  });
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Zuschnitt</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
