import * as Data from "$src/types.svelte";

// Re-export utility functions from the library
export { 
  exportProject, 
  importProject, 
  exportProjectToFile, 
  importProjectFromFile,
  saveProjectToLocalStorage,
  loadProjectFromLocalStorage,
  createProjectBackup,
  getProjectInfo
} from "$lib/project-io";

//export let project: Data.Project = new Data.Project();
export let data = $state({
  project: new Data.Project(),
  showProjectIo: false,
});

// Initialize with sample data
{
  const project = data.project;
  let sheet = project.addSheet();
  let column = project.addColumn(sheet.id);
  if (column) {
    column.name = "foo 1";
    let part = project.addPart(column.id);
    part = project.addPart(column.id);
    part.width = 175;
    part = project.addPart(column.id);
  }
  column = project.addColumn(sheet.id);
  if (column) {
    column.name = "foo 2";
    let part = project.addPart(column.id);
    column = project.addColumn(sheet.id);
  }
  if (column) {
    column.name = "foo 3";
    let part = project.addPart(column.id);
    part = project.addPart(column.id);
    sheet = project.addSheet();
  }
}

