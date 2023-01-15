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

  public onOpenClientGroupModal(clientGroup: ClientGroup | null, mode: string): void {
    const container = <HTMLElement>document.getElementById('main-container');
    let modal
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    switch(mode) {
      case 'add':
        button.setAttribute('data-bs-target', '#addClientGroupModal');
        break
      case 'edit':
        this.currentClientGroup = clientGroup;
        button.setAttribute('data-bs-target', '#updateClientGroupModal');
        break
      case 'delete':
        this.currentClientGroup = clientGroup;
        button.setAttribute('data-bs-target', '#deleteClientGroupModal');
        break
    }
    
    container.appendChild(button);
    button.click();
  }

  public onEditClientGroupClick(clientGroup: ClientGroup | null) {
    this.currentClientGroup = clientGroup;
  }

  public onAddClientGroup(addClientGroupForm: NgForm): void {
    this.clientGroupService.addClientGroup(addClientGroupForm.value).subscribe(
      (response: ClientGroup) => {
        this.getClientGroups();
        addClientGroupForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addClientGroupForm.reset();
      }
    );
  }

  public onUpdateClientGroup(clientGroup: ClientGroup): void {
    this.clientGroupService.updateClientGroup(clientGroup).subscribe(
      (response: ClientGroup) => {
        this.getClientGroups();
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
          alert(error.message);
        }
      );
  }
}
