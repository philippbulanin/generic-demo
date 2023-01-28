import {Component} from '@angular/core';
import {MainHttpService} from "../../services/main-http.service";
import {Entity} from "../../types/entites.enum";
import {User} from "../../types/user.type";
import {BaseTableComponent} from "../base-table/base-table.component";
import {TableConfig} from "../../types/table-config.type";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent extends BaseTableComponent<User> {
  public entity: Entity = Entity.Users;

  constructor(
    private mainHttpService: MainHttpService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.mainHttpService.getData<User>(Entity.Users)
      .subscribe((data: User[]): void => {
        this.data = data;
        this.setTableConfig({ data, disableSort: true } as TableConfig<User>)
      });
  }
}
