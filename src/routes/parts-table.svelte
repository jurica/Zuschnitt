<script lang="ts">
  import PartsTable from "$src/components/parts-table.svelte";
</script>

<div class="h-full">
  <h1 class="text-2xl font-semibold mb-4">Parts Table</h1>
  <p class="text-sm text-gray-600 mb-4">
    Edit all parts dimensions in a spreadsheet-like format. Click on any row to select the part.
  </p>
  <div class="h-[calc(100vh-200px)] border border-gray-200 rounded-lg overflow-hidden">
    <PartsTable />
  </div>
</div>
