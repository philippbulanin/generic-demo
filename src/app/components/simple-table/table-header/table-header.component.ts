import {Component, ElementRef, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {SortConfig} from "../order-config.type";
import {Order} from "../order.enum";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input()
  public field: string;

  @Input()
  public globalOrderConfig: SortConfig;

  @Output()
  public onOrder: EventEmitter<SortConfig> = new EventEmitter<SortConfig>();

  public order: Order = Order.Asc;

  @HostBinding('class')
  get orderClass(): string {
    const classList: string[] = this.elementRef.nativeElement.classList;
    const filteredList: string[] = [...classList]
      .filter((className: string): boolean => {
        return className !== Order.Asc && className !== Order.Desc
      });

    if (!this.isOrderByMe) {
      return filteredList.join(' ');
    }

    return [...filteredList, this.globalOrderConfig.order].join(' ');
  }

  get isOrderByMe(): boolean {
    return this.globalOrderConfig.field === this.field;
  }

  constructor(private elementRef: ElementRef) {
  }

  public onHeaderClick(): void {
    if (this.isOrderByMe) {
      this.order = this.order === Order.Asc
        ? Order.Desc
        : Order.Asc;

      this.emitOrder();

      return;
    }

    this.emitOrder();
  }

  private emitOrder(): void {
    this.onOrder.emit({
      field: this.field,
      order: this.order
    });
  }
}
