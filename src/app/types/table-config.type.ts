import {TemplateRef} from "@angular/core";

export interface TableConfig<T = any> {
  label: string;
  fields: Array<Extract<keyof T, string>>;
  data: T[];
  templateRefs?: Partial<Record<Extract<keyof T, string>, TemplateRef<any>>>;
  // TODO: Try to realize functionality for disabling sorting
  // it should be on the level of simple-table
  disableSort?: boolean;
}
