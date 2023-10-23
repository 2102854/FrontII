import { Component, OnInit } from '@angular/core';
import { PatientsFull } from './../patients.model';
import { PatientsService } from "./../patients.service";
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../auth/login.service';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css'],
    providers: [MessageService]
})

export class PatientsListComponent implements OnInit {

    patientsFull: PatientsFull[];  

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Atualizar_Pacientes');

    constructor(
        private router: Router, 
        private loginService: LoginService,
        private patientsService: PatientsService, 
        private messageService: MessageService
    ) { 
        
        setTimeout(() => {
            this.patientsService.read().subscribe({
                next: (patientsFull) => {
                    this.patientsFull = patientsFull;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }                        
            });  
        },200)      
    }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.patientsService.read().subscribe(patientsFull => {
            this.patientsFull = patientsFull;          
        });
    } 
    
    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/pacientes/update/${id}`]);            
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