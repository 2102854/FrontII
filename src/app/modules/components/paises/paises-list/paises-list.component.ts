import { Component, OnInit } from '@angular/core';
import { Pais } from './../paises.model';
import { PaisesService } from "./../paises.service";
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../auth/login.service';

@Component({
    selector: 'app-paises-list',
    templateUrl: './paises-list.component.html',
    styleUrls: ['./paises-list.component.css']
})

export class PaisesListComponent implements OnInit {

    paises: Pais[];

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Editar_Pais');

    constructor(private router: Router, private paisesService: PaisesService, private loginService: LoginService ) { }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.paisesService.read().subscribe(paises => {
            this.paises = paises;          
        });
    }  

    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/paises/update/${id}`]);            
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
