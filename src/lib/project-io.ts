import type { Project, Sheet, Column, Part } from "$src/types.svelte";
import * as Data from "$src/types.svelte";

// Project export/import data structure
export interface ProjectExportData {
  version: string;
  metadata: {
    exportedAt: string;
    exportedBy?: string;
  };
  project: {
    id: string;
    name: string;
    scale: number;
    selectedSheetId: string | undefined;
    selectedColumnId: string | undefined;
    selectedPartId: string | undefined;
  };
  sheets: Array<{
    id: string;
    name: string;
    width: number;
    height: number;
    isOpen: boolean;
    columns: string[];
  }>;
  columns: Array<{
    id: string;
    parentId: string | undefined;
    name: string;
    isOpen: boolean;
    parts: string[];
  }>;
  parts: Array<{
    id: string;
    parentId: string | undefined;
    name: string;
    width: number;
    height: number;
  }>;
}

const CURRENT_VERSION = "1.0.0";

/**
 * Validates a project export data structure
 */
function validateExportData(data: any): data is ProjectExportData {
  if (!data || typeof data !== 'object') return false;
  
  // Check required top-level properties
  if (!data.version || !data.metadata || !data.project || !data.sheets || !data.columns || !data.parts) {
    return false;
  }

  // Basic type checks
  if (typeof data.version !== 'string' ||
      !Array.isArray(data.sheets) ||
      !Array.isArray(data.columns) ||
      !Array.isArray(data.parts)) {
    return false;
  }

  return true;
}

/**
 * Exports a project to a structured data object
 */
export function exportProjectToData(project: Project): ProjectExportData {
  return {
    version: CURRENT_VERSION,
    metadata: {
      exportedAt: new Date().toISOString(),
    },
    project: {
      id: project.id,
      name: project.name,
      scale: project.scale,
      selectedSheetId: project.selectedSheetId,
      selectedColumnId: project.selectedColumnId,
      selectedPartId: project.selectedPartId,
    },
    sheets: Array.from(project.sheets.entries()).map(([id, sheet]) => ({
      id: sheet.id,
      name: sheet.name,
      width: sheet.width,
      height: sheet.height,
      isOpen: sheet.isOpen,
      columns: Array.from(sheet.columns.values()).map(column => column.id)
    })),
    columns: Array.from(project.columns.entries()).map(([id, column]) => ({
      id: column.id,
      parentId: column.parentId,
      name: column.name,
      isOpen: column.isOpen,
      parts: Array.from(column.parts.values()).map(part => part.id)
    })),
    parts: Array.from(project.parts.entries()).map(([id, part]) => ({
      id: part.id,
      parentId: part.parentId,
      name: part.name,
      width: part.width,
      height: part.height
    }))
  };
}

/**
 * Imports a project from a structured data object
 */
export function importProjectFromData(data: ProjectExportData): Project {
  if (!validateExportData(data)) {
    throw new Error("Invalid project data format");
  }

  const project = new Data.Project();

  // Set basic properties
  project.id = data.project.id;
  project.name = data.project.name;
  project.scale = data.project.scale;

  // Clear default data
  project.sheets.clear();
  project.columns.clear();
  project.parts.clear();

  // Import parts first (they have no dependencies)
  const partsMap = new Map<string, Part>();
  for (const partData of data.parts) {
    const part = new Data.Part(partData.parentId);
    part.id = partData.id;
    part.name = partData.name;
    part.width = partData.width;
    part.height = partData.height;
    partsMap.set(part.id, part);
    project.parts.set(part.id, part);
  }

  // Import columns and associate parts
  const columnsMap = new Map<string, Column>();
  for (const columnData of data.columns) {
    const column = new Data.Column(columnData.parentId);
    column.id = columnData.id;
    column.name = columnData.name;
    column.isOpen = columnData.isOpen;

    // Add parts to column
    for (const partId of columnData.parts) {
      const part = partsMap.get(partId);
      if (part) {
        column.parts.add(part);
      }
    }

    columnsMap.set(column.id, column);
    project.columns.set(column.id, column);
  }

  // Import sheets and associate columns
  for (const sheetData of data.sheets) {
    const sheet = new Data.Sheet();
    sheet.id = sheetData.id;
    sheet.name = sheetData.name;
    sheet.width = sheetData.width;
    sheet.height = sheetData.height;
    sheet.isOpen = sheetData.isOpen;

    // Add columns to sheet
    for (const columnId of sheetData.columns) {
      const column = columnsMap.get(columnId);
      if (column) {
        sheet.columns.add(column);
      }
    }

    project.sheets.set(sheet.id, sheet);
  }

  // Restore selection state
  if (data.project.selectedSheetId) {
    project.selectedSheetId = data.project.selectedSheetId;
  }
  if (data.project.selectedColumnId) {
    project.selectedColumnId = data.project.selectedColumnId;
  }
  if (data.project.selectedPartId) {
    project.selectedPartId = data.project.selectedPartId;
  }

  return project;
}

/**
 * Exports a project to JSON string
 */
export function exportProject(project: Project): string {
  const data = exportProjectToData(project);
  return JSON.stringify(data, null, 2);
}

/**
 * Imports a project from JSON string
 */
export function importProject(jsonString: string): Project {
  try {
    const data = JSON.parse(jsonString);
    return importProjectFromData(data);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error}`);
  }
}

/**
 * Exports project to file (downloads JSON file)
 */
export function exportProjectToFile(project: Project, filename?: string): void {
  const jsonString = exportProject(project);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_project.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Imports project from file upload
 */
export function importProjectFromFile(): Promise<Project> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonString = e.target?.result as string;
          const project = importProject(jsonString);
          resolve(project);
        } catch (error) {
          reject(new Error(`Failed to import project: ${error}`));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Saves project to local storage
 */
export function saveProjectToLocalStorage(project: Project, key = 'zuschnitt-project'): void {
  try {
    const data = exportProjectToData(project);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save project to local storage:', error);
  }
}

/**
 * Loads project from local storage
 */
export function loadProjectFromLocalStorage(key = 'zuschnitt-project'): Project | null {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    return importProjectFromData(data);
  } catch (error) {
    console.error('Failed to load project from local storage:', error);
    return null;
  }
}

/**
 * Creates a project backup
 */
export function createProjectBackup(project: Project): string {
  const data = exportProjectToData(project);
  data.metadata.exportedBy = 'backup';
  return JSON.stringify(data);
}

/**
 * Gets project info from JSON without fully importing
 */
export function getProjectInfo(jsonString: string): { name: string; version: string; exportedAt: string } | null {
  try {
    const data = JSON.parse(jsonString);
    if (!validateExportData(data)) return null;
    
    return {
      name: data.project.name,
      version: data.version,
      exportedAt: data.metadata.exportedAt
    };
  } catch {
    return null;
  }
}
