import {Injectable} from '@angular/core';
import {Language} from 'app/modules/user-management/model/language';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {UUID} from 'app/shared/types/uuid';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private languages: Language[] = [];

  constructor(
    private readonly http: HttpClient,
  ) {
    this.languages = [
      {id: "1" as UUID, label: "Italiano", code: "it-IT", isDefault: true},
      {id: "2" as UUID, label: "English", code: "en-EN", isDefault: false}
    ];
  }

  // TODO usare chiamata http
  getLanguages() {
    return of(this.languages);
  }
}
