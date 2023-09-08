import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadosComponent } from './estados/estados.component';
import { EstadosListComponent } from './estados-list/estados-list.component';
import { EstadosNewComponent} from './estados_new/estados_new.component';
import { EstadosUpdateComponent } from './estados_update/estados_update.component';
import { EstadosRoutingModule } from './estados-routing.module';
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
    EstadosComponent,
    EstadosListComponent,
    EstadosNewComponent,
    EstadosUpdateComponent
  ],
  imports: [
    CommonModule,
    EstadosRoutingModule,
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
export class EstadosModule { }
