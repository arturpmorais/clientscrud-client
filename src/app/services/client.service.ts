import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/clients`);
  }

  public addClient(clientGroup: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/clients`, clientGroup);
  }

  public updateClient(clientGroup: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiServerUrl}/clients`, clientGroup);
  }

  public deleteClient(clientGroupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/${clientGroupId}`);
  }
}