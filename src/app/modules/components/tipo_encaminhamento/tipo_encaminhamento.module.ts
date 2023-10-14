import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tipo_EncaminhamentoComponent } from './tipo_encaminhamento/tipo_encaminhamento.component';
import { Tipo_EncaminhamentoListComponent } from './tipo_encaminhamento-list/tipo_encaminhamento-list.component';
import { Tipo_EncaminhamentoNewComponent} from './tipo_encaminhamento_new/tipo_encaminhamento_new.component';
import { Tipo_EncaminhamentoUpdateComponent } from './tipo_encaminhamento_update/tipo_encaminhamento_update.component';
import { Tipo_EncaminhamentoRoutingModule } from './tipo_encaminhamento-routing.module';
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
    Tipo_EncaminhamentoComponent,
    Tipo_EncaminhamentoListComponent,
    Tipo_EncaminhamentoNewComponent,
    Tipo_EncaminhamentoUpdateComponent
  ],
  imports: [
    CommonModule,
    Tipo_EncaminhamentoRoutingModule,
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
export class Tipo_EncamimhamentoModule { }
