import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from 'app/modules/user-management/model/group';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  groups: Group[] = [];

  constructor(private readonly http: HttpClient) {
    this.groups = [
      {id: 1, name: "Admin", description: "Amministratore"},
      {id: 2, name: "Accountant", description: "Commercialista"},
      {id: 3, name: "Developer", description: "Sviluppatore Software"},
      {id: 4, name: "Admin", description: "Amministratore"},
      {id: 5, name: "Accountant", description: "Commercialista"},
      {id: 6, name: "Developer", description: "Sviluppatore Software"},
      {id: 7, name: "Admin", description: "Amministratore"},
      {id: 8, name: "Accountant", description: "Commercialista"},
      {id: 9, name: "Developer", description: "Sviluppatore Software"},
      {id: 10, name: "Admin", description: "Amministratore"},
      {id: 11, name: "Accountant", description: "Commercialista"},
      {id: 12, name: "Developer", description: "Sviluppatore Software"},
    ];
  }

  // TODO usare chiamata http
  getGroups() {
    return of(this.groups);
  }

}
