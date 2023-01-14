import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientGroup } from './client-group';
import { ClientGroupService } from './client-group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clientscrud-client';

  public clientGroups: ClientGroup[] = []

  constructor(private clientGroupService: ClientGroupService) {}

  ngOnInit() {
    this.getClientGroups()
  }

  public getClientGroups(): void {
    this.clientGroupService.getClientGroups().subscribe(
      (response: ClientGroup[]) => {
        this.clientGroups = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
