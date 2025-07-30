<script lang="ts">
  import {
    Square,
    Columns4,
    Grid3x3,
    HouseIcon,
    InfoIcon,
    SettingsIcon,
    Group,
    ChevronRight,
  } from "@lucide/svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { p } from "sv-router/generated";
  import { project } from "$src/project.svelte.ts";
  import Sheet from "$src/components/sheet.svelte";

  // Menu items.
  let items = $derived.by(() => {
    let items = [
      {
        title: "Home",
        url: p("/"),
        icon: HouseIcon,
        callback: () => {
          console.log("home");
        },
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
    // project.sheets.forEach((sheet) => {
    //   items.push({
    //     title: `Sheet: ${sheet.name}`,
    //     url: "/sheets",
    //     icon: Grid3x3,
    //     callback: () => {
    //       project.selectedSheetId = sheet.id;
    //     },
    //   });
    //   sheet.columns.forEach((column) => {
    //     items.push({
    //       title: `Column ${column.name} ${column.id}`,
    //       url: "/sheets",
    //       icon: Columns4,
    //       callback: () => {
    //         project.selectedColumnId = column.id;
    //       },
    //     });
    //     column?.parts.forEach((part) => {
    //       //const part = project.parts.get(partId);
    //       items.push({
    //         title: `Part ${part.id}`,
    //         url: "/sheets",
    //         icon: Square,
    //         callback: () => {
    //           project.selectedPartId = part.id;
    //         },
    //       });
    //     });
    //   });
    // });
    return items;
  });
</script>

<Sidebar.Root collapsible="offcanvas">
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>
        <Grid3x3 />
        Zuschnitt
      </Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                onclick={() => {
                  item.callback();
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
        {#each project.sheets.values() as sheet}
          <Collapsible.Root open={sheet.isOpen} class="group/collapsible">
            <Sidebar.MenuItem>
              <Collapsible.Trigger class="w-full">
                <Sidebar.MenuButton
                  isActive={project.selectedSheetId === sheet.id}
                  onclick={() => {}}
                >
                  <Grid3x3 />
                  <span>{sheet.name}</span>
                  <ChevronRight
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </Sidebar.MenuButton>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Sidebar.SidebarMenuSub>
                  {#each sheet.columns.values() as column}
                    <Collapsible.Root
                      open={column.isOpen}
                      class="group/collapsible2"
                    >
                      <Sidebar.MenuItem>
                        <Collapsible.Trigger class="w-full">
                          <Sidebar.MenuButton
                            isActive={project.selectedColumnId === column.id}
                            onclick={() => {}}
                          >
                            <Columns4 />
                            {column.name}
                            <ChevronRight
                              class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible2:rotate-90"
                            />
                          </Sidebar.MenuButton>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          <Sidebar.SidebarMenuSub>
                            {#each column.parts.values() as part}
                              <Sidebar.MenuButton
                                isActive={project.selectedPartId === part.id}
                                onclick={(e) => {
                                  e.preventDefault();
                                  project.selectedPartId = part.id;
                                }}
                              >
                                {part.name}
                              </Sidebar.MenuButton>
                            {/each}
                          </Sidebar.SidebarMenuSub>
                        </Collapsible.Content>
                      </Sidebar.MenuItem>
                    </Collapsible.Root>
                  {/each}
                </Sidebar.SidebarMenuSub>
              </Collapsible.Content>
            </Sidebar.MenuItem>
          </Collapsible.Root>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
