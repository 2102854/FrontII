import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Tipo_Doenca } from './../tipo_doenca.model';
import { Tipo_DoencaService } from "./../tipo_doenca.service";
import { SortEvent } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-tipo_doenca-list',
    templateUrl: './tipo_doenca-list.component.html',
    styleUrls: ['./tipo_doenca-list.component.css']
})

export class Tipo_DoencaListComponent implements OnInit {

    tipo_doenca: Tipo_Doenca[];

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Editar_Tipo_Doenca');  

    constructor(private router: Router, private tipo_doencaService: Tipo_DoencaService, private loginService: LoginService  ) { }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.tipo_doencaService.read().subscribe(tipo_doenca => {
            this.tipo_doenca = tipo_doenca;          
        });
    }  
 
    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/disease_types/update/${id}`]);            
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
