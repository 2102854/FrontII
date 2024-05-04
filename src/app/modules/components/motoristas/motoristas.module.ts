import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { MotoristasListComponent } from './motoristas-list/motoristas-list.component';
import { MotoristasNewComponent} from './motoristas_new/motoristas_new.component';
import { MotoristasUpdateComponent } from './motoristas_update/motoristas_update.component';
import { MotoristasRoutingModule } from './motoristas-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MotoristasComponent,
    MotoristasListComponent,
    MotoristasNewComponent,
    MotoristasUpdateComponent
  ],
  imports: [
    CommonModule,
    MotoristasRoutingModule,
    TableModule,
    ButtonModule,
    RippleModule,
    SplitButtonModule,
    ToggleButtonModule,
    ToolbarModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    BreadcrumbModule,
    ToastModule
  ]
})
export class MotoristasModule { }
