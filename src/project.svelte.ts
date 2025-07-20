import * as Data from "$src/types"

export let project: Data.Project = new Data.Project();
let sheet = project.addSheet();
let column = project.addColumn(sheet.id);
let part = project.addPart(column.id);
part = project.addPart(column.id);
part.width = 175;
part = project.addPart(column.id);

let selectedPartId = $state("");

export function getSelectedPartId(): string {
  return selectedPartId;
}

export function setSelectedPartId(partId: string) {
  selectedPartId = partId;
}
