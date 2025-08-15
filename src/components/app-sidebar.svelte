<script lang="ts">
  import {
    RectangleVertical,
    Columns3,
    Grid3x3,
    HouseIcon,
    InfoIcon,
    SettingsIcon,
  } from "@lucide/svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { p } from "sv-router/generated";
  import { data } from "$src/project.svelte.ts";
  import { Button } from "$lib/components/ui/button/index.js";

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Menu items.
  let items = $derived.by(() => {
    let items = [
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
        onClick: () => {
          data.showProjectIo = !data.showProjectIo;
        }
      },
    ];
    return items;
  });
</script>

<Sidebar.Root collapsible="offcanvas">
  <Sidebar.Header>
    <div class="flex">
      <Grid3x3 class="mr-2" />Zuschnitt
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
<div class="flex items-center p-1">
  <Button onclick={() => (data.project.scale -= 0.05)}>-</Button>
  <p class="p-1">{formatter.format(data.project.scale)}</p>
  <Button onclick={() => (data.project.scale += 0.05)}>+</Button>
</div>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                onclick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
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
    <Sidebar.Group>
      <Sidebar.GroupLabel>Sheets</Sidebar.GroupLabel>
      <Sidebar.Menu>
        {#each data.project.sheets.values() as sheet}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton
              isActive={data.project.selectedSheetId === sheet.id}
              onclick={(e) => {
                e.preventDefault();
                data.project.selectedSheetId = sheet.id;
              }}
            >
              <Grid3x3 />
              <span>{sheet.name}</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          {#each sheet.columns.values() as column}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                isActive={data.project.selectedColumnId === column.id}
                onclick={(e) => {
                  e.preventDefault();
                  data.project.selectedColumnId = column.id;
                }}
              >
                <Columns3 class="ml-2"/>
                {column.name}
              </Sidebar.MenuButton>
              {#each column.parts.values() as part}
                <Sidebar.MenuButton
                  isActive={data.project.selectedPartId === part.id}
                  onclick={(e) => {
                    e.preventDefault();
                    data.project.selectedPartId = part.id;
                  }}
                >
                <RectangleVertical class="ml-3"/>
                  {part.name}
                </Sidebar.MenuButton>
              {/each}
            </Sidebar.MenuItem>
          {/each}
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
