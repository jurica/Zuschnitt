<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import Part from "$src/components/part.svelte";
  import Column from "$src/components/column.svelte";
  import Sheet from "$src/components/sheet.svelte";
  import { project, getSelectedPartId, setSelectedPartId } from "$src/project.svelte.ts";

  function clickedSheet() {
    console.log("sheet");
  }
  function clickedColumn() {
    console.log("column");
  }
  function clickedPart(part) {
      setSelectedPartId(part.id);
    console.log(part.id);
  }

  // let project: Data.Project = new Data.Project();
  // let sheet = project.addSheet();
  // let column = project.addColumn(sheet.id);
  // let part = project.addPart(column.id);
  // part = project.addPart(column.id);
  // part.width = 175;
  // part = project.addPart(column.id);
  // project.sheets[0].columns.push(new Data.Column());
  // project.sheets[0].columns[0].parts.push(new Data.Part());
  // project.sheets[0].columns[0].parts[0].width = 200;
  // project.sheets[0].columns[0].parts.push(new Data.Part());
  // project.sheets[0].columns[0].parts.push(new Data.Part());
  // project.sheets[0].columns.push(new Data.Column());
  // project.sheets[0].columns[1].parts.push(new Data.Part());
  // project.sheets[0].columns[1].parts.push(new Data.Part());
  $inspect(project);
  // console.log(JSON.stringify(project));

  const formatter = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2, maximumFractionDigits: 2});
  var scale = $state(0.55);
  const w = "300";
  let x = 0;
  let y = 0;
</script>
<div class="flex p-1">
<Button onclick={() => scale -= 0.05}>-</Button>
<p class="p-1">{formatter.format(scale)}</p>
<Button onclick={() => scale += 0.05}>+</Button>
</div>

<p>Selected part:{getSelectedPartId()}</p>

<div class="origin-top-left scale-[var(--scale)]" style="--scale: {scale}">
  {#each project.sheets.values() as sheet}
    <Sheet width={sheet.width} height={sheet.height}>
      {#each sheet.columns as columnId}
        {@const column = project.columns.get(columnId)}
        <Column x={x} width={column.width}>
          {#each column.parts as partId}
            {@const part = project.parts.get(partId)}
            <Part part={part} />
            <!-- {@render snippetPart(part)} -->
          {/each}
        </Column>
      {/each}
    </Sheet>
  {/each}


<!-- <br/> -->
<!-- <Sheet width="2500" height="1250"> -->
<!--   <Column x="0" width="300"> -->
<!--     <Part y="0" x="0" width="300" height="300"/> -->
<!--     <Part y="300" x="0" width="300" height="300"/> -->
<!--   </Column> -->
<!--   <Column x="300" width="500"> -->
<!--    <Part x="0" y="0" height="175" width="500"/> -->
<!--   </Column> -->
<!-- </Sheet> -->
<!-- <br/> -->
<!-- <div class="relative w-[2500px] h-[1250px]"> -->
<!--   <div class="absolute top-0 left-0 w-full h-full border border-black bg-linear-135 from-slate-100 to-slate-300"> -->
<!--     <div class="absolute w-[var(--w)] h-full border border-black bg-linear-45 from-cyan-50 hover:from-cyan-100 to-cyan-200 hover:to-cyan-300" style="--w: {w}px"> -->
<!--       <div class="absolute top-0 left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div> -->
<!--       <button class="absolute top-[300px] left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></button> -->
<!--     </div> -->
<!--     <div class="absolute left-[300px] w-[500px] h-full border border-black bg-linear-45 from-cyan-50 to-cyan-200 hover:to-cyan-300"> -->
<!--       <div class="absolute top-0 left-0 w-full h-[175px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div> -->
<!--     </div> -->
<!--   </div> -->
<!-- </div> -->

</div>

{#snippet snippetPart(part)}
<div
  class="w-[var(--w)] h-[var(--h)] border border-black hover:border-2 hover:border-orange-500 bg-linear-45 from-orange-50 hover:from-orange-100 to-orange-200 hover:to-orange-300"
  style="--w: {part.width}px; --h: {part.height}px;"
  onclick={() => clickedPart(part)}
>
</div>
{/snippet}
