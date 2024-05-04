import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReportsComponent }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }