import { Component, OnInit } from '@angular/core';
import { EstadoFull } from './../estados.model';
import { EstadosService } from "./../estados.service";
import { PaisesService } from '../../paises/paises.service';
import { SortEvent } from 'primeng/api';

@Component({
    selector: 'app-estados-list',
    templateUrl: './estados-list.component.html',
    styleUrls: ['./estados-list.component.css']
})

export class EstadosListComponent implements OnInit {

    estados: EstadoFull[];

    constructor(private paisesService: PaisesService, private estadosService: EstadosService ) { 
        this.estadosService.read().subscribe(estadoFull => {
            this.estados = estadoFull;          
        });
    }

    ngOnInit(): void {}

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