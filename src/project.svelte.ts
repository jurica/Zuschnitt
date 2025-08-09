import * as Data from "$src/types.svelte";

export let project: Data.Project = new Data.Project();
let sheet = project.addSheet();
let column = project.addColumn(sheet.id);
if (column) {
  let part = project.addPart(column.id);
  part = project.addPart(column.id);
  part.width = 175;
  part = project.addPart(column.id);
}
column = project.addColumn(sheet.id);
if (column) {
  let part = project.addPart(column.id);
  column = project.addColumn(sheet.id);
}
if (column) {
  let part = project.addPart(column.id);
  part = project.addPart(column.id);
  sheet = project.addSheet();
}
