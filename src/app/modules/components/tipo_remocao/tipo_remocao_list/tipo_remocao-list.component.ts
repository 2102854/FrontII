import { Component, OnInit } from '@angular/core';
import { Tipo_Remocao } from './../tipo_remocao.model';
import { Tipo_RemocaoService } from "./../tipo_remocao.service";
import { SortEvent } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-tipo_remocao-list',
    templateUrl: './tipo_remocao-list.component.html',
    styleUrls: ['./tipo_remocao-list.component.css']
})

export class Tipo_RemocaoListComponent implements OnInit {

    tipo_remocao: Tipo_Remocao[];

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Atualizar_Tipo_Remocao');    

    constructor(private router: Router, private tipo_remocaoService: Tipo_RemocaoService, private loginService: LoginService ) { }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.tipo_remocaoService.read().subscribe(tipo_remocao => {
            this.tipo_remocao = tipo_remocao;          
        });
    }  

    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/estados/update/${id}`]);            
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
