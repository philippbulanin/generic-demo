import {Order} from "../simple-table/order.enum";
import {SortConfig} from "../simple-table/order-config.type";
import {TableConfig} from "../../types/table-config.type";
import {TableName} from "../../constants/table-names.constant";
import {Entity} from "../../types/entites.enum";
import {BehaviorSubject, Observable} from "rxjs";

export abstract class BaseTableComponent<T extends {}> {
  abstract entity: Entity;

  public data: T[] = [];

  private _tableConfig$ = new BehaviorSubject<TableConfig<T>>({} as TableConfig<T>);
  public tableConfig$: Observable<TableConfig<T>> = this._tableConfig$.asObservable();

  get tableConfig(): TableConfig<T> {
    return this._tableConfig$.getValue();
  }

  protected constructor() {
  }

  public setTableConfig(config: Omit<TableConfig<T>, 'label'>): void {
    this._tableConfig$.next({
      ...config,
      label: TableName[this.entity],
      fields: config.fields || this.getFields(config.data),
    });
  }

  public sortTable(orderConfig: SortConfig): void {
    const isAscending: boolean = orderConfig.order === Order.Asc;
    const field: Extract<keyof T, string> = orderConfig.field as Extract<keyof T, string>;

    const orderedData: T[] = [...this.data].sort((a: T, b: T): number => {
      const aValue: string | number = a[field] as string | number;
      const bValue: string | number = b[field] as string | number;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return isAscending
          ? aValue - bValue
          : bValue - aValue;
      }

      return isAscending
        ? (aValue as string).localeCompare(<string>bValue)
        : (bValue as string).localeCompare(<string>aValue);
    });

    this.setOrderedData(orderedData);
  }

  private setOrderedData(data: T[]): void {
    this._tableConfig$.next({
      ...this.tableConfig,
      data
    });
  }

  private getFields(data: T[]): Array<Extract<keyof T, string>> {
    if (!data || !data.length) {
      return [];
    }

    return Object.keys(data[0]) as Array<Extract<keyof T, string>>;
  }
}
