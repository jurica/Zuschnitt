# Project Import/Export System

This document describes the import/export functionality for the Zuschnitt project system.

## Features

### Core Functions

- **Export to JSON**: Serialize the entire project structure to JSON format
- **Import from JSON**: Deserialize JSON back to a fully functional project
- **File Export**: Download project as a JSON file
- **File Import**: Upload and import project from a JSON file
- **Local Storage**: Save/load projects to/from browser's local storage
- **Project Validation**: Validate project data structure before importing
- **Version Support**: Include versioning information in exported data

### Usage

#### Basic Import/Export

```typescript
import { exportProject, importProject } from "$src/project.svelte";

// Export project to JSON string
const jsonString = exportProject(project);

// Import project from JSON string
const newProject = importProject(jsonString);
```

#### File Operations

```typescript
import { exportProjectToFile, importProjectFromFile } from "$src/project.svelte";

// Export to file (triggers download)
exportProjectToFile(project, "my-project.json");

// Import from file (opens file picker)
const newProject = await importProjectFromFile();
```

#### Local Storage

```typescript
import { saveProjectToLocalStorage, loadProjectFromLocalStorage } from "$src/project.svelte";

// Save to browser storage
saveProjectToLocalStorage(project);

// Load from browser storage
const savedProject = loadProjectFromLocalStorage();
```

#### Project Information

```typescript
import { getProjectInfo } from "$src/project.svelte";

// Get project metadata without full import
const info = getProjectInfo(jsonString);
console.log(info.name, info.version, info.exportedAt);
```

## Data Structure

The exported project includes:

### Project Properties
- `id`: Unique project identifier
- `name`: Project name
- `scale`: Display scale factor
- `selectedSheetId`, `selectedColumnId`, `selectedPartId`: Current selection state

### Hierarchical Data
- **Sheets**: Top-level containers with dimensions and column references
- **Columns**: Middle-level containers with part references and parent sheet ID
- **Parts**: Individual items with dimensions and parent column ID

### Metadata
- `version`: Export format version
- `exportedAt`: ISO timestamp of export
- `exportedBy`: Optional export source identifier

## Example Export Structure

```json
{
  "version": "1.0.0",
  "metadata": {
    "exportedAt": "2025-08-15T10:30:00.000Z"
  },
  "project": {
    "id": "project-uuid",
    "name": "My Project",
    "scale": 0.55,
    "selectedSheetId": "sheet-uuid",
    "selectedColumnId": null,
    "selectedPartId": null
  },
  "sheets": [
    {
      "id": "sheet-uuid",
      "name": "Sheet 1",
      "width": 2500,
      "height": 1250,
      "isOpen": true,
      "columns": ["column-uuid-1", "column-uuid-2"]
    }
  ],
  "columns": [
    {
      "id": "column-uuid-1", 
      "parentId": "sheet-uuid",
      "name": "Column 1",
      "isOpen": true,
      "parts": ["part-uuid-1", "part-uuid-2"]
    }
  ],
  "parts": [
    {
      "id": "part-uuid-1",
      "parentId": "column-uuid-1", 
      "name": "Part 1",
      "width": 200,
      "height": 100
    }
  ]
}
```

## UI Component

The `ProjectIo` component provides a complete UI for import/export operations:

```svelte
<script>
  import ProjectIo from "$src/components/project-io.svelte";
  
  function handleProjectImported(newProject) {
    // Handle the imported project
    Object.assign(currentProject, newProject);
  }
</script>

<ProjectIo project={currentProject} onProjectImported={handleProjectImported} />
```

## Error Handling

All import functions include proper error handling:

- **JSON Parse Errors**: Invalid JSON format
- **Validation Errors**: Missing required fields or invalid data types
- **File Errors**: File reading failures
- **Storage Errors**: Local storage quota or access issues

## Browser Compatibility

- **File Operations**: Requires modern browsers with File API support
- **Local Storage**: Requires localStorage support
- **JSON**: Native JSON support (all modern browsers)

## Security Considerations

- JSON parsing is done safely with proper error handling
- No `eval()` or unsafe code execution
- File uploads are limited to JSON files
- Local storage data is isolated to the current domain
