import { Component, OnInit } from '@angular/core';
import { CidadeFull } from './../cidades.model';
import { CidadesService } from "./../cidades.service";
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cidades-list',
    templateUrl: './cidades-list.component.html',
    styleUrls: ['./cidades-list.component.css'],
    providers: [MessageService]
})

export class CidadesListComponent implements OnInit {

    cidadesFull: CidadeFull[]; 
    
    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Atualizar_Cidades'); 

    constructor(
        private router: Router, private cidadesService: CidadesService, 
        private loginService: LoginService, private messageService: MessageService 
    ) { 
        
        setTimeout(() => {
            this.cidadesService.read().subscribe({
                next: (cidadesFull) => {
                    this.cidadesFull = cidadesFull;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }                        
            });  
        },200)      
    }

    ngOnInit(): void {} 

    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/cidades/update/${id}`]);            
        }        
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