import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './../auth/login.service';
import { Dashboard } from './dashboard.model';
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

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private productService: ProductService, 
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
                //this.dashboard = dashboard;   
                this.total_pacientes = dashboard.total_pacientes;  
                this.total_hospitais = dashboard.total_hospitais;
                this.total_agendamentos = dashboard.total_agendamentos;
                this.total_veiculos = dashboard.total_veiculos;
                this.pacientes_cadastrados_mes_corrente = dashboard.pacientes_cadastrados_mes_corrente;

            });
        }, 200)	
        
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {       
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];        
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
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
