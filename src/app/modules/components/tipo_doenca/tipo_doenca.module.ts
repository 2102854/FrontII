import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tipos_DoencaComponent } from './tipo_doenca/tipo_doenca.component';
import { Tipo_DoencaListComponent } from './tipo_doenca-list/tipo_doenca-list.component';
//import { PaisesNewComponent} from './paises_new/paises_new.component';
//import { PaisesUpdateComponent } from './paises_update/paises_update.component';
import { Tipos_DoencaRoutingModule } from './tipo_doenca-routing.module';
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
    Tipos_DoencaComponent,
    Tipo_DoencaListComponent,
   // PaisesNewComponent,
   // PaisesUpdateComponent
  ],
  imports: [
    CommonModule,
    Tipos_DoencaRoutingModule,
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
export class Tipos_DoencaModule { }
