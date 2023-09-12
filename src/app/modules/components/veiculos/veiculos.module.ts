import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculosListComponent } from './veiculos_list/veiculos-list.component';
//import { CidadesNewComponent} from './veiculos_new/veiculos_new.component';
//import { CidadesUpdateComponent } from './veiculos_update/veiculos_update.component';
import { VeiculosRoutingModule } from './veiculos-routing.module';
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
    VeiculosComponent,
    VeiculosListComponent,
//    CidadesNewComponent,
//    CidadesUpdateComponent
  ],
  imports: [
    CommonModule,
    VeiculosRoutingModule,
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
export class VeiculosModule { }
