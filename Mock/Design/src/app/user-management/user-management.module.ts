import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpModule} from '@angular/http';

import { UserManagementComponent } from './user-management.component';


import { AddComponent } from './View Modal/add/add.component';
import { DeleteComponent } from './View Modal/delete/delete.component';
import { EditComponent } from './View Modal/edit/edit.component';

@NgModule({
  declarations: [UserManagementComponent, AddComponent, DeleteComponent, EditComponent],
  entryComponents: [DeleteComponent, AddComponent, EditComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, NgxPaginationModule, HttpModule],
})
export class UserManagementModule { }
