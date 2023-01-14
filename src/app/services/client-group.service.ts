import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ClientGroup } from '../interfaces/client-group';
import { environment } from 'src/environments/environment';
import { ClientGroupGetResponse } from '../interfaces/client-group-get-response';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getClientGroups = (): Observable<ClientGroup[]> => 
    this.http.get<ClientGroupGetResponse>(`${this.apiServerUrl}/clientGroups`).pipe(
      map(response => response._embedded.clientGroups)
    );

  public addClientGroup = (clientGroup: ClientGroup): Observable<ClientGroup> => 
    this.http.post<ClientGroup>(`${this.apiServerUrl}/clientGroups`, clientGroup);

  public updateClientGroup = (clientGroup: ClientGroup): Observable<ClientGroup> => 
    this.http.put<ClientGroup>(`${this.apiServerUrl}/clientGroups`, clientGroup);

  public deleteClientGroup = (clientGroupId: number): Observable<void> => 
    this.http.delete<void>(`${this.apiServerUrl}/clientGroups/${clientGroupId}`);
}