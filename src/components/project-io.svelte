<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { 
    exportProject, 
    exportProjectToFile, 
    importProject, 
    importProjectFromFile,
    saveProjectToLocalStorage,
    loadProjectFromLocalStorage,
    getProjectInfo 
  } from "$src/project.svelte";
  import type { Project } from "$src/types.svelte";

  interface Props {
    project: Project;
    onProjectImported?: (project: Project) => void;
  }

  let { project, onProjectImported }: Props = $props();

  let showJsonExport = $state(false);
  let exportedJson = $state("");

  function handleExportJson() {
    exportedJson = exportProject(project);
    showJsonExport = true;
  }

  function handleExportFile() {
    exportProjectToFile(project);
  }

  async function handleImportFile() {
    try {
      const importedProject = await importProjectFromFile();
      onProjectImported?.(importedProject);
    } catch (error) {
      alert(`Import failed: ${error}`);
    }
  }

  function handleImportJson() {
    const input = prompt("Paste your project JSON here:");
    if (input) {
      try {
        // First check project info
        const info = getProjectInfo(input);
        if (info) {
          const confirmMsg = `Import project "${info.name}" (exported on ${new Date(info.exportedAt).toLocaleString()})?`;
          if (!confirm(confirmMsg)) return;
        }
        
        const importedProject = importProject(input);
        onProjectImported?.(importedProject);
      } catch (error) {
        alert(`Import failed: ${error}`);
      }
    }
  }

  function handleSaveToLocalStorage() {
    try {
      saveProjectToLocalStorage(project);
      alert('Project saved to browser storage!');
    } catch (error) {
      alert(`Save failed: ${error}`);
    }
  }

  function handleLoadFromLocalStorage() {
    try {
      const savedProject = loadProjectFromLocalStorage();
      if (savedProject) {
        const confirm = window.confirm('Load project from browser storage? This will replace the current project.');
        if (confirm) {
          onProjectImported?.(savedProject);
        }
      } else {
        alert('No saved project found in browser storage.');
      }
    } catch (error) {
      alert(`Load failed: ${error}`);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(exportedJson);
    alert('Copied to clipboard!');
  }
</script>

<div class="space-y-4 p-4 border rounded-lg bg-white/90 backdrop-blur-sm">
  <h3 class="text-lg font-semibold">Project Import/Export</h3>
  
  <div class="grid grid-cols-2 gap-2">
    <Button onclick={handleExportJson} variant="outline" size="sm">
      Export JSON
    </Button>
    
    <Button onclick={handleExportFile} variant="outline" size="sm">
      Download File
    </Button>
    
    <Button onclick={handleImportFile} variant="outline" size="sm">
      Import File
    </Button>
    
    <Button onclick={handleImportJson} variant="outline" size="sm">
      Import JSON
    </Button>

    <Button onclick={handleSaveToLocalStorage} variant="outline" size="sm">
      Save Local
    </Button>
    
    <Button onclick={handleLoadFromLocalStorage} variant="outline" size="sm">
      Load Local
    </Button>
  </div>

  {#if showJsonExport}
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <h4 class="font-medium">Exported JSON:</h4>
        <div class="space-x-2">
          <Button onclick={copyToClipboard} size="sm" variant="outline">
            Copy
          </Button>
          <Button onclick={() => showJsonExport = false} size="sm" variant="outline">
            Close
          </Button>
        </div>
      </div>
      <textarea 
        class="w-full h-64 p-2 font-mono text-sm border rounded resize-none"
        readonly
        value={exportedJson}
      ></textarea>
    </div>
  {/if}
</div>
