export class Project {
  id: string;
  name: string;
  sheets: Map<string, Sheet>;
  columns: Map<string, Column>;
  parts: Map<string, Part>;
  selectedSheetId: string | undefined = undefined;
  selectedColumnId: string | undefined = undefined;
  selectedPartId: string | undefined = undefined;

  constructor() {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.sheets = new Map<string, Sheet>();
    this.columns = new Map<string, Column>();
    this.parts = new Map<string, Part>();
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
    sheet.columns.push(column.id);
    this.columns.set(column.id, column);

    return column;
  }

  addPart(columnId: string | undefined = undefined): Part {
    const part = new Part();
    if (columnId !== undefined) {
      const column = this.columns.get(columnId);
      column?.parts.push(part.id);
    }
    this.parts.set(part.id, part);
    return part;
  }
}

export class Sheet implements Dimensions {
  id: string;
  name: string;
  width: number = 2500;
  height: number = 1250;
  columns: string[];

  constructor() {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.columns = [];
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
  parts: string[];

  constructor(parentId: string | undefined) {
    this.id = crypto.randomUUID();
    this.name = "foo";
    this.parts = [];
    if (parent !== undefined) {
      this.parentId = parentId;
    }
  }
}

export class Part implements Dimensions {
  id: string;
  parentId: string | undefined;
  name: string;
  width: number = 250;
  height: number = 150;

  constructor(parentId: string | undefined = undefined) {
    this.id = crypto.randomUUID();
    this.name = "foo";
    if (parent !== undefined) {
      this.parentId = parentId;
    }
  }
}

interface Dimensions {
  width: number;
  height: number;
}
