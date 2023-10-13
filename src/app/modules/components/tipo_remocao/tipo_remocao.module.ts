import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tipo_RemocaoComponent } from './tipo_remocao/tipo_remocao.component';
import { Tipo_RemocaoListComponent } from './tipo_remocao_list/tipo_remocao-list.component';
import { Tipo_RemocaoNewComponent } from './tipo_remocao_new/tipo_remocao_new.component';
import { Tipo_RemocaoUpdateComponent } from './tipo_remocao_update/tipo_remocao_update.component';
import { Tipos_RemocaoRoutingModule } from './tipo_remocao-routing.module';
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
    Tipo_RemocaoComponent,
    Tipo_RemocaoListComponent,
    Tipo_RemocaoUpdateComponent,
    Tipo_RemocaoNewComponent
  ],
  imports: [
    CommonModule,
    Tipos_RemocaoRoutingModule,
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
export class Tipos_RemocaoModule { }
