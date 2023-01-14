import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientGroup } from './client-group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getClientGroups(): Observable<ClientGroup[]> {
    return this.http.get<ClientGroup[]>(`${this.apiServerUrl}/clientGroups`);
  }

  public addClientGroup(clientGroup: ClientGroup): Observable<ClientGroup> {
    return this.http.post<ClientGroup>(`${this.apiServerUrl}/clientGroups`, clientGroup);
  }

  public updateClientGroup(clientGroup: ClientGroup): Observable<ClientGroup> {
    return this.http.put<ClientGroup>(`${this.apiServerUrl}/clientGroups`, clientGroup);
  }

  public deleteClientGroup(clientGroupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clientGroups/${clientGroupId}`);
  }
}