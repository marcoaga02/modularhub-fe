import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plugin} from 'app/core/model/plugin'
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PluginService {
  // TODO inizializzare con lista vuota quando servizio http è implementato
  private plugins: Plugin[] = [];

  constructor(private readonly http: HttpClient) {
    // TODO rimuovere assegnazione
    this.plugins = [
      {name: "home", description: "Home Page", icon: "pi pi-home", path: "home"}, // TODO rimuovere home
      {name: "user-management", description: "Gesione Utenti", icon: "pi pi-user", path: "user-management"},
      {name: "task-flow", description: "Gesione Progetti", icon: "pi pi-book", path: "project-management"}
    ]
  }

  // TODO utilizzare chiamata http
  getPlugins(): Observable<Plugin[]> {
    return of(this.plugins);
  }

}
