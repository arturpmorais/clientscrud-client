import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { environment } from 'src/environments/environment';
import { ClientGetResponse } from '../interfaces/client-get-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getClients = (): Observable<Client[]> => 
    this.http.get<ClientGetResponse>(`${this.apiServerUrl}/clients`).pipe(
      map(response => response._embedded.clients)
    );

  public addClient = (client: Client): Observable<Client> => 
    this.http.post<Client>(`${this.apiServerUrl}/clients`, client);

  public updateClient = (client: Client): Observable<Client> => 
    this.http.put<Client>(`${this.apiServerUrl}/clients${client.id}`, client);

  public deleteClient = (clientId: number): Observable<void> => 
    this.http.delete<void>(`${this.apiServerUrl}/clients/${clientId}`);
}