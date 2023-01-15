import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from './interfaces/client';
import { ClientGroup } from './interfaces/client-group';
import { ClientService } from './services/client.service';
import { ClientGroupService } from './services/client-group.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clientscrud-client';

  public clientGroups: ClientGroup[] = []
  public currentClientGroup: ClientGroup | null = null

  public clients: Client[] = []
  public currentClient: Client | null = null

  constructor(private clientGroupService: ClientGroupService, private clientService: ClientService) {}

  ngOnInit() {
    this.getClientGroups()
    this.getClients()
  }

  public labelForDocumentField(field: string, documentType: string): string {
    switch(field) {
      case 'document1':
        switch(documentType) {
          case 'pf':
            return 'CPF'
          case 'pj':
            return 'CNPJ'
        }
        break
      case 'document2':
        switch(documentType) {
          case 'pf':
            return 'RG'
          case 'pj':
            return 'Inscrição Estadual'
        }
        break
    }

    return 'Selecione o Tipo de Cliente'
  }

  public labelForClientGroupField(clientGroupUrl: string): string {
    const urlParts = clientGroupUrl.split('clients/')
    const clientGroupId = urlParts[1][0]
    const clientGroup = this.clientGroups.find(clientGroup => clientGroup.id === parseInt(clientGroupId))

    return clientGroup?.name || ''
  }

  public getClientGroups(): void {
    this.clientGroupService.getClientGroups().subscribe({
      next: (response: ClientGroup[]) => {
        this.clientGroups = response
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  public getClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: Client[]) => {
        this.clients = response
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  public onEditClientGroupClick(clientGroup: ClientGroup | null) {
    const button = <HTMLElement>document.getElementById('pills-update-client-group-tab')

    this.currentClientGroup = clientGroup;

    button.click()
  }

  public onEditClientClick(client: Client | null) {
    const button = <HTMLElement>document.getElementById('pills-update-client-tab')

    this.currentClient = client;

    button.click()
  }

  public onAddClientGroup(addClientGroupForm: NgForm): void {
    this.clientGroupService.addClientGroup(addClientGroupForm.value).subscribe(
      () => {
        this.getClientGroups();
        addClientGroupForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addClientForm: NgForm): void {
    this.clientService.addClient(addClientForm.value).subscribe(
      () => {
        this.getClients();
        addClientForm.reset();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409)
          alert('Conflito: verifique se o CPF/CNPJ já foi cadastrado.')
        else
          alert(error.message);
      }
    );
  }

  public onUpdateClientGroup(clientGroup: ClientGroup): void {
    this.clientGroupService.updateClientGroup(clientGroup).subscribe(
      () => {
        this.getClientGroups();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateClient(client: Client): void {
    this.clientService.updateClient(client).subscribe(
      () => {
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClientGroup(clientGroup: ClientGroup): void {
    if (confirm('Tem certeza de que deseja deletar este Grupo de Clientes?'))
      this.clientGroupService.deleteClientGroup(clientGroup.id).subscribe(
        () => {
          this.getClientGroups();
        },
        (error: HttpErrorResponse) => {
          console.log(error)
          alert(error.message);
        }
      );
  }

  public onDeleteClient(client: Client): void {
    if (confirm('Tem certeza de que deseja deletar este Grupo de Clientes?'))
      this.clientService.deleteClient(client.id).subscribe(
        () => {
          this.getClients();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
