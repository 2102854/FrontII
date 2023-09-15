import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Pais } from './../paises.model';
import { PaisesService } from "./../paises.service";
import { SortEvent } from 'primeng/api';


@Component({
    selector: 'app-paises-list',
    templateUrl: './paises-list.component.html',
    styleUrls: ['./paises-list.component.css']
})

export class PaisesListComponent implements OnInit {

    paises: Pais[];

    constructor(private paisesService: PaisesService ) { }

    ngOnInit(): void {
        this.paisesService.read().subscribe(paises => {
            this.paises = paises;          
        });
    }  
    
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }
}
