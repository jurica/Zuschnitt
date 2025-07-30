import { SvelteMap, SvelteSet } from "svelte/reactivity";

export class Project {
  id: string;
  name: string;
  sheets: Map<string, Sheet>;
  columns: Map<string, Column>;
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

    this._selectedSheetId = value;
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

    this._selectedColumnId = value;
    this.selectedSheetId = column.parentId;
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

    this._selectedPartId = value;
    this.selectedColumnId = part.parentId;
  }

  constructor() {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.sheets = new Map<string, Sheet>();
    this.columns = new Map<string, Column>();
    this.parts = $state(new SvelteMap<string, Part>());
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
}

export class Sheet {
  id: string;
  name: string;
  width: number = 2500;
  height: number = 1250;
  columns: SvelteSet<Column>;
  isOpen: boolean;

  constructor() {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.columns = $state(new SvelteSet<Column>());
    this.isOpen = true;
  }
}

export class Column {
  id: string;
  parentId: string | undefined;
  name: string;
  get width() {
    return 300;
    //return Math.max(...Array.from(this.parts.values()).map(part => part.width));
  }
  parts: SvelteSet<Part>;

  constructor(parentId: string | undefined) {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.parts = $state(new SvelteSet<Part>());
    if (parent !== undefined) {
      this.parentId = parentId;
    }
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
    this.name = "foo";
    if (parent !== undefined) {
      this.parentId = parentId;
    }
    this.width = $state(Math.floor(Math.random() * 500));
    this.height = $state(Math.floor(Math.random() * 250));
  }
}
