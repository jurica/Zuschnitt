<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import InfoIcon from "@lucide/svelte/icons/info";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import TableCellsMerge from "@lucide/svelte/icons/table-cells-merge";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { p } from "sv-router/generated";

  // Menu items.
  const items = [
    {
      title: "Home",
      url: p("/"),
      icon: HouseIcon,
    },
    {
      title: "Sheet 1",
      url: p("/sheet"),
      icon: TableCellsMerge,
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
