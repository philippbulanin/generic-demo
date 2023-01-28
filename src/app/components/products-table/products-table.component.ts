import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableConfig} from "../../types/table-config.type";
import {Product} from "../../types/product.type";
import {MainHttpService} from "../../services/main-http.service";
import {Entity} from "../../types/entites.enum";
import {BaseTableComponent} from "../base-table/base-table.component";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends BaseTableComponent<Product> implements OnInit {
  public entity = Entity.Products;
  @ViewChild('price', { static: true }) priceTemplateRef: TemplateRef<any>;

  constructor(
    private mainHttpService: MainHttpService
  ) {
    super();
  }

  ngOnInit() {
    this.mainHttpService.getData<Product>(Entity.Products)
      .subscribe((data: Product[]): void => {
        this.data = data;
        this.setTableConfig({
          data,
          // select fields to show. If not set - show everything
          fields: ["name", "price", "author"],
          // set template references for each field for specific view
          templateRefs: {
            price: this.priceTemplateRef
          }
        });
      });
  }
}
