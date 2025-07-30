import * as Data from "$src/types.svelte"
import { SvelteMap } from "svelte/reactivity";

// type Part = {
//     id: string;
//     parentId: string | undefined;
//     name: string;
//     width: number;
//     height: number;
// };

// class Part {
//   id: string;
//   parentId: string | undefined;
//   name: string;
//   width: number;
//   height: number;
//
//   constructor(parentId: string | undefined = undefined) {
//     this.id = crypto.randomUUID();
//     this.name = "foo";
//     if (parent !== undefined) {
//       this.parentId = parentId;
//     }
//     this.width = $state(Math.floor(Math.random() * 500));
//     this.height = $state(Math.floor(Math.random() * 250));
//   }
// }
//
// function newPart(parentId: string | undefined = undefined): Part {
//     let p: Part = {
//         id: crypto.randomUUID(),
//         parentId: parentId,
//         name: "foo",
//         width: Math.floor(Math.random() * 500),
//         height: Math.floor(Math.random() * 250),
//     };
//     return p;
// }


// export let parts: SvelteMap<string, Part> = new SvelteMap<string, Part>();

export let project: Data.Project = new Data.Project();
let sheet = project.addSheet();
let column = project.addColumn(sheet.id);
let part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
part.width = 175;
part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
column = project.addColumn(sheet.id);
part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
column = project.addColumn(sheet.id);
part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
part = project.addPart(column.id);
// parts.set(part.id, new Part(column.id));
