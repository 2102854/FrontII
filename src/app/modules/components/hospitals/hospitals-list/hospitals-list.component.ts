import { Component, OnInit } from '@angular/core';
import { Hospital } from './../hospitals.model';
import { HospitalsService } from "./../hospitals.service";
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../auth/login.service';

@Component({
    selector: 'app-hospitals-list',
    templateUrl: './hospitals-list.component.html',
    styleUrls: ['./hospitals-list.component.css']
})

export class HospitalsListComponent implements OnInit {

    hospital: Hospital[] = [];

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Criar_Hospitais');

    constructor(private router: Router, private hospitalsService: HospitalsService, private loginService: LoginService ) { }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.hospitalsService.read().subscribe(hospital => {
            this.hospital = hospital     
        });
    }  

    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/hospitais/update/${id}`]);            
        }        
    }

    // Método sort do grid
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
