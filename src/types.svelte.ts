import { SvelteMap, SvelteSet } from "svelte/reactivity";

export class Project {
  id: string;
  name: string;
  scale: number;
  sheets: SvelteMap<string, Sheet>;
  columns: SvelteMap<string, Column>;
  parts: SvelteMap<string, Part>;
  private _selectedSheetId: string = $state("");
  private _selectedColumnId: string = $state("");
  private _selectedPartId: string = $state("");

  get selectedSheetId() {
    return this._selectedSheetId;
  }
  set selectedSheetId(value: string | undefined) {
    if (value === undefined) {
      this._selectedSheetId = "";
      return;
    }

    const sheet = this.sheets.get(value);
    if (!sheet) {
      this._selectedSheetId = "";
      return;
    }

    if (this._selectedSheetId == value) return;

    this._selectedSheetId = value;
    // Clear selected column when sheet is selected
    this.selectedColumnId = undefined;
    this.selectedPartId = undefined;
  }

  get selectedColumnId() {
    return this._selectedColumnId;
  }
  set selectedColumnId(value: string | undefined) {
    if (value === undefined) {
      this._selectedColumnId = "";
      return;
    }

    const column = this.columns.get(value);
    if (!column) {
      this._selectedColumnId = "";
      return;
    }

    if (this._selectedColumnId === value) return;

    this.selectedSheetId = column.parentId;
    this._selectedColumnId = value;
    // Clear selected part when column is selected
    this.selectedPartId = undefined;
  }

  get selectedPartId() {
    return this._selectedPartId;
  }
  set selectedPartId(value: string | undefined) {
    if (value === undefined) {
      this._selectedPartId = "";
      return;
    }

    const part = this.parts.get(value);
    if (!part) {
      this._selectedPartId = "";
      return;
    }

    this.selectedColumnId = part.parentId;
    this._selectedPartId = value;
  }

  constructor() {
    this.id = crypto.randomUUID();
    this.name = $state("foo");
    this.scale = $state(0.55)
    this.sheets = new SvelteMap<string, Sheet>();
    this.columns = new SvelteMap<string, Column>();
    this.parts = new SvelteMap<string, Part>();
  }

  addSheet(): Sheet {
    const sheet = new Sheet();
    this.sheets.set(sheet.id, sheet);

    return sheet;
  }

  addColumn(sheetId: string): Column | undefined {
    //if this.sheets.has(sheetId)
    const sheet = this.sheets.get(sheetId);
    if (sheet === undefined) return undefined;

    const column = new Column(sheetId);
    sheet.columns.add(column);
    this.columns.set(column.id, column);

    return column;
  }

  addPart(columnId: string | undefined = undefined): Part {
    const part = new Part(columnId);
    if (columnId !== undefined) {
      const column = this.columns.get(columnId);
      column?.parts.add(part);
    }
    this.parts.set(part.id, part);
    return part;
  }

  deletePart(partId: string): boolean {
    const part = this.parts.get(partId);
    if (!part) return false;

    // Remove from parent column if it has one
    if (part.parentId) {
      const column = this.columns.get(part.parentId);
      if (column) {
        column.parts.delete(part);
      }
    }

    // Remove from project
    this.parts.delete(partId);

    // Clear selection if this part was selected
    if (this.selectedPartId === partId) {
      this.selectedPartId = undefined;
    }

    return true;
  }

  deleteColumn(columnId: string): boolean {
    const column = this.columns.get(columnId);
    if (!column) return false;

    // Delete all parts in this column first
    for (const part of column.parts.values()) {
      this.deletePart(part.id);
    }

    // Remove from parent sheet if it has one
    if (column.parentId) {
      const sheet = this.sheets.get(column.parentId);
      if (sheet) {
        sheet.columns.delete(column);
      }
    }

    // Remove from project
    this.columns.delete(columnId);

    // Clear selection if this column was selected
    if (this.selectedColumnId === columnId) {
      this.selectedColumnId = undefined;
    }

    return true;
  }

  deleteSheet(sheetId: string): boolean {
    const sheet = this.sheets.get(sheetId);
    if (!sheet) return false;

    // Delete all columns in this sheet first
    for (const column of sheet.columns.values()) {
      this.deleteColumn(column.id);
    }

    // Remove from project
    this.sheets.delete(sheetId);

    // Clear selection if this sheet was selected
    if (this.selectedSheetId === sheetId) {
      this.selectedSheetId = undefined;
    }

    return true;
  }

  duplicatePart(partId: string): Part | undefined {
    const originalPart = this.parts.get(partId);
    if (!originalPart) return undefined;

    const duplicatedPart = new Part(originalPart.parentId);
    duplicatedPart.name = originalPart.name + " (copy)";
    duplicatedPart.width = originalPart.width;
    duplicatedPart.height = originalPart.height;

    // Add to parent column if it has one
    if (originalPart.parentId) {
      const column = this.columns.get(originalPart.parentId);
      if (column) {
        column.parts.add(duplicatedPart);
      }
    }

    this.parts.set(duplicatedPart.id, duplicatedPart);
    this.selectedPartId = duplicatedPart.id;
    return duplicatedPart;
  }

  duplicateColumn(columnId: string): Column | undefined {
    const originalColumn = this.columns.get(columnId);
    if (!originalColumn) return undefined;

    const duplicatedColumn = new Column(originalColumn.parentId);
    duplicatedColumn.name = originalColumn.name + " (copy)";

    // Add to parent sheet if it has one
    if (originalColumn.parentId) {
      const sheet = this.sheets.get(originalColumn.parentId);
      if (sheet) {
        sheet.columns.add(duplicatedColumn);
      }
    }

    this.columns.set(duplicatedColumn.id, duplicatedColumn);

    // Duplicate all parts in the column
    for (const originalPart of originalColumn.parts.values()) {
      const duplicatedPart = new Part(duplicatedColumn.id);
      duplicatedPart.name = originalPart.name;
      duplicatedPart.width = originalPart.width;
      duplicatedPart.height = originalPart.height;
      
      duplicatedColumn.parts.add(duplicatedPart);
      this.parts.set(duplicatedPart.id, duplicatedPart);
    }

    this.selectedColumnId = duplicatedColumn.id;
    return duplicatedColumn;
  }

  duplicateSheet(sheetId: string): Sheet | undefined {
    const originalSheet = this.sheets.get(sheetId);
    if (!originalSheet) return undefined;

    const duplicatedSheet = new Sheet();
    duplicatedSheet.name = originalSheet.name + " (copy)";
    duplicatedSheet.width = originalSheet.width;
    duplicatedSheet.height = originalSheet.height;

    this.sheets.set(duplicatedSheet.id, duplicatedSheet);

    // Duplicate all columns in the sheet
    for (const originalColumn of originalSheet.columns.values()) {
      const duplicatedColumn = new Column(duplicatedSheet.id);
      duplicatedColumn.name = originalColumn.name;
      
      duplicatedSheet.columns.add(duplicatedColumn);
      this.columns.set(duplicatedColumn.id, duplicatedColumn);

      // Duplicate all parts in the column
      for (const originalPart of originalColumn.parts.values()) {
        const duplicatedPart = new Part(duplicatedColumn.id);
        duplicatedPart.name = originalPart.name;
        duplicatedPart.width = originalPart.width;
        duplicatedPart.height = originalPart.height;
        
        duplicatedColumn.parts.add(duplicatedPart);
        this.parts.set(duplicatedPart.id, duplicatedPart);
      }
    }

    this.selectedSheetId = duplicatedSheet.id;
    return duplicatedSheet;
  }
}

export class Sheet {
  id: string;
  name: string;
  width: number = $state(2500);
  height: number = $state(1250);
  columns: SvelteSet<Column>;
  isOpen: boolean;

  constructor() {
    this.id = crypto.randomUUID();
    this.name = $state("foo");
    this.columns = $state(new SvelteSet<Column>());
    this.isOpen = true;
  }
}

export class Column {
  id: string;
  parentId: string | undefined;
  name: string;
  get width() {
    return Math.max(...Array.from(this.parts.values()).map(part => part.width));
  }
  get height() {
    return Array.from(this.parts.values()).reduce((sum, part) => sum + part.height, 0);
  }
  parts: SvelteSet<Part>;
  isOpen: boolean;

  constructor(parentId: string | undefined) {
    this.id = crypto.randomUUID();
    this.name = $state("foo");
    this.parts = $state(new SvelteSet<Part>());
    if (parentId !== undefined) {
      this.parentId = parentId;
    }
    this.isOpen = true;
  }
}

export class Part {
  id: string;
  parentId: string | undefined;
  name: string;
  width: number;
  height: number;

  constructor(parentId: string | undefined = undefined) {
    this.id = crypto.randomUUID();
    this.name = $state("foo");
    if (parentId !== undefined) {
      this.parentId = parentId;
    }
    this.width = $state(Math.floor(Math.random() * 500));
    this.height = $state(Math.floor(Math.random() * 250));
  }
}
