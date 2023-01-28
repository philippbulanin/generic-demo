import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {TableConfig} from "../../types/table-config.type";
import {SortConfig} from "./order-config.type";
import {Order} from "./order.enum";

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent {
  @Input()
  public config: TableConfig | null;

  @Input()
  someTemplate: TemplateRef<any>;

  @Output()
  public onSort: EventEmitter<SortConfig> = new EventEmitter<SortConfig>();

  public sortConfig: SortConfig = {} as SortConfig;

  public onOrderEvent(orderConfig: SortConfig): void {
    this.sortConfig = orderConfig;
    this.onSort.emit(orderConfig);

    // this.sortTable();
  }

  public getTemplateContext(field: string, value: any) {
    return {
      [field]: value
    };
  }

  public templateRef(field: string): TemplateRef<any> | undefined {
    return this.config?.templateRefs && this.config?.templateRefs[field];
  }

  // Left it here just to let you see, what was moved out the component
  // and see the difference between this and base implementation
  // private sortTable(): void {
  //   [...this.config.data].sort((a, b): number => {
  //     const aValue = a[this.orderConfig.field];
  //     const bValue = b[this.orderConfig.field];
  //
  //     if (typeof aValue === 'number') {
  //       return this.orderConfig.order === Order.Asc
  //         ? aValue - bValue
  //         : bValue - aValue;
  //     }
  //
  //     return this.orderConfig.order === Order.Asc
  //       ? aValue.localeCompare(bValue)
  //       : bValue.localeCompare(aValue);
  //   });
  // }
}
