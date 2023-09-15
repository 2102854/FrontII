import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './../auth/login.service';
import { Dashboard, Ultimos_Agendamentos } from './dashboard.model';
import { DashboardService } from './dashboard.services';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    dashboard : Dashboard;
    total_pacientes: number = 0;
    total_hospitais: number = 0;
    total_agendamentos: number = 0;
    total_veiculos: number = 0;
    pacientes_cadastrados_mes_corrente: number = 0;
    ultimos_agendamentos: Ultimos_Agendamentos[];
    agendamentos_ano:[] = []; 
    cadastros_ano:[] = []; 

    chartData: any;
    chartOptions: any;
    subscription!: Subscription;

    constructor(
        private router: Router, 
        private messageService: MessageService, 
        private loginService: LoginService, 
        private dashboardService: DashboardService,
        public layoutService: LayoutService

    ){
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
                this.router.navigate(['/auth/login'])
            }
        }, 200)	
        
        setTimeout(() => {
            this.dashboardService.getDashboard().subscribe(dashboard => {  
                this.total_pacientes = dashboard.total_pacientes;  
                this.total_hospitais = dashboard.total_hospitais;
                this.total_agendamentos = dashboard.total_agendamentos;
                this.total_veiculos = dashboard.total_veiculos;
                this.pacientes_cadastrados_mes_corrente = dashboard.pacientes_cadastrados_mes_corrente;
                this.ultimos_agendamentos = dashboard.ultimos_agendamentos;  
                this.cadastros_ano = dashboard.cadastros_ano ;             
                for (var val of dashboard.agendamentos_ano) {
                    this.agendamentos_ano.push(val)
                }
                this.initChart();
            });
        }, 200)	
        
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {}

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Agendamentos',
                    data: this.agendamentos_ano,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Cadastros de Pacientes  ',
                    data: this.cadastros_ano,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
