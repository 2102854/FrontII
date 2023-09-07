import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Pais } from './../paises.model';
import { PaisesService } from "./../paises.service";
/*
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
*/

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
            console.log(paises)
            this.paises = paises;          
        });


    }  

 

}
