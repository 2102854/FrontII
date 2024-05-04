import { Component, OnInit } from '@angular/core';
import { Reports } from './../reports.model';
import { ReportsService } from "./../reports.service";
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../auth/login.service';

@Component({
    selector: 'app-reports-list',
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.css'],
    providers: [MessageService]
})

export class ReportsListComponent implements OnInit {

    reports: Reports[];  

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Visualizar_Agendamentos');

    constructor(
        private router: Router, 
        private loginService: LoginService,
        private reportsService: ReportsService, 
        private messageService: MessageService
    ) { 
        
        setTimeout(() => {
            this.reportsService.read().subscribe({
                next: (reports) => {
                    this.reports = reports;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }                        
            });  
        },200)      
    }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.reportsService.read().subscribe(reports => {
            this.reports = reports;          
        });
    }  
    
    openReportPacientes(): void{
        window.open('http://127.0.0.1:5000/r1', '_blank').focus();
    }

    openReportAgendamentos(): void{
        window.open('http://127.0.0.1:5000/r2', '_blank').focus();
    }    
}