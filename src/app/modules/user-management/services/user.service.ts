import { Injectable } from '@angular/core';
import {User, UserRequest} from 'app/modules/user-management/model/user';
import {HttpClient} from '@angular/common/http';
import {Group} from 'app/modules/user-management/model/group';
import {Language} from 'app/modules/user-management/model/language';
import {of} from 'rxjs';
import {UserCriteria} from 'app/modules/user-management/services/criteria/user-criteria';
import {UUID} from 'app/shared/types/uuid';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // TODO rimuovere creazione fittizia utenti
  private readonly users: User[] = [];

  constructor(private readonly http: HttpClient) {
    const sampleLanguages: Language[] = [
      { id: '1' as UUID, code: 'it-IT', label: 'Italiano', isDefault: true },
      { id: '2' as UUID, code: 'en-US', label: 'English', isDefault: false },
    ];

    const sampleGroups: Group[] = [
      { id: 1, name: 'admin', description: 'Administrators' },
      { id: 2, name: 'editor', description: 'Content editors' },
      { id: 3, name: 'user', description: 'Regular users' },
    ];

    this.users = Array.from({ length: 20 }, (_, i) => ({
      id: `user-${i + 1}` as UUID,
      firstname: `First${i + 1}`,
      lastname: `Last${i + 1}`,
      gender: i % 2 === 0 ? 'M' : 'F',
      language: sampleLanguages[i % sampleLanguages.length],
      mobileNumber: `345000${1000 + i}`,
      taxIdNumber: `AAAAAA00A00A000A`,
      email: `user${i + 1}@example.com`,
      username: `user${i + 1}`,
      groups: [sampleGroups[i % sampleGroups.length]],
      enabled: i % 3 !== 0,
    }));
  }

  // TODO Usare chiamata http vera
  getUsers(criteria: UserCriteria) {
    // const params = criteria.toParams();
    // return this.http.get<CollectionRow[]>(`${this.apiUrl}`, {
    //   params,
    //   observe: 'response'
    // });
    return of(this.users);
  }

  // TODO Usare chiamata http vera
  createUser(user: UserRequest) {
    return of(this.users.pop);
  }

}
