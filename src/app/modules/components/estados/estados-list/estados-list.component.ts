import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Estado } from './../estados.model';
import { EstadosService } from "./../estados.service";
import { Pais } from '../../paises/paises.model';
import { PaisesService } from '../../paises/paises.service';
/*
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
*/

@Component({
    selector: 'app-estados-list',
    templateUrl: './estados-list.component.html',
    styleUrls: ['./estados-list.component.css']
})

export class EstadosListComponent implements OnInit {

    paises: Pais[];
    estados: Estado[];

    get_pais_name(id: number): string {
        let nomePais: string = null;
        
        for (let i = 0; i < this.paises.length; i++) {
            
            const key = Number(this.paises[i]['pais_id']);
            nomePais = this.paises[i]['nome'];
            
            if (key === id) break
         }

        return nomePais
    }

    constructor(private paisesService: PaisesService, private estadosService: EstadosService ) { 
        
        this.paisesService.read().subscribe(paises => {
            this.paises = paises;          
        });

        this.estadosService.read().subscribe(estados => {
            //console.log(estados)
            this.estados = estados;          
        });
    }

    ngOnInit(): void {
        
    }  

}
