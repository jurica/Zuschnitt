<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

  function clickedSheet() {
    console.log("sheet");
  }
  function clickedColumn() {
    console.log("column");
  }
  function clickedPart() {
    console.log("part");
  }

  const formatter = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2, maximumFractionDigits: 2});
  var scale = $state(0.55);
  const w = "300";
</script>
<div class="flex">
<Button onclick={() => scale -= 0.05}>-</Button>
<p>{formatter.format(scale)}</p>
<Button onclick={() => scale += 0.05}>+</Button>
</div>
<div class="relative w-[2500px] h-[1250px] origin-top-left scale-[var(--scale)]" style="--scale: {scale}">
  <div class="absolute top-0 left-0 w-full h-full border border-black bg-linear-135 from-slate-100 to-slate-300">
    <div class="absolute w-[var(--w)] h-full border border-black bg-linear-45 from-cyan-50 hover:from-cyan-100 to-cyan-200 hover:to-cyan-300" style="--w: {w}px">
      <div class="absolute top-0 left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
      <div class="absolute top-[300px] left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
    </div>
    <div class="absolute left-[300px] w-[500px] h-full border border-black bg-linear-45 from-cyan-50 to-cyan-200 hover:to-cyan-300">
      <div class="absolute top-0 left-0 w-full h-[175px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
    </div>
  </div>
</div>

<div class="relative w-[2500px] h-[1250px] origin-top-left scale-[var(--scale)]" style="--scale: {scale}">
  <div class="absolute top-0 left-0 w-full h-full border border-black bg-linear-135 from-slate-100 to-slate-300">
    <div class="absolute w-[var(--w)] h-full border border-black bg-linear-45 from-cyan-50 hover:from-cyan-100 to-cyan-200 hover:to-cyan-300" style="--w: {w}px">
      <div class="absolute top-0 left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
      <div class="absolute top-[300px] left-0 w-[var(--w)] h-[300px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
    </div>
    <div class="absolute left-[300px] w-[500px] h-full border border-black bg-linear-45 from-cyan-50 to-cyan-200 hover:to-cyan-300">
      <div class="absolute top-0 left-0 w-full h-[175px] border border-black hover:border-red-500 bg-linear-45 from-violet-50 hover:from-violet-100 to-violet-200 hover:to-violet-300"></div>
    </div>
  </div>
</div>
