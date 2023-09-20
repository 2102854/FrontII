import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService} from './../modules/components/auth/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private loginService: LoginService ) {}

    ngOnInit() {        
        this.model = [
            {
                label: 'Home',
                items: [
                    { 
                        label: 'Dashboard', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/app/dashboard'] 
                    }
                ]
            },
            {
                label: 'Gestão de Pacientes',
                visible: this.loginService.haveAnyPermission('gestaoPac'),
                items: [
                    { 
                        label: 'Pacientes', 
                        icon: 'pi pi-fw pi-id-card', 
                        routerLink: ['/app/pacientes'],
                        visible: this.loginService.havePermission('Pode_Visualizar_Pacientes') 
                    },
                    { 
                        label: 'Agendamento', 
                        icon: 'pi pi-fw pi-calendar', 
                        routerLink: ['/app/agendamento'], 
                        visible: this.loginService.havePermission('Pode_Visualizar_Agendamentos')
                    }
                ]
            },
            {
                label: 'Configurações',            
                visible: this.loginService.haveAnyPermission('configSis'),
                items: [
                    {
                        label: 'Cadastro',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Países',
                                icon: 'bi bi-globe-americas',
                                routerLink: ['/app/paises'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Paises')

                            },
                            {
                                label: 'Estados',
                                icon: 'bi bi-map',
                                routerLink: ['/app/estados'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Estados')
                            }, 
                            {
                                label: 'Cidades',
                                icon: 'bi bi-buildings',
                                routerLink: ['/app/cidades'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Cidades')
                            },                            
                            {
                                label: 'Veículos',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/app/veiculos'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Veiculos')
                            },
                            {
                                label: 'Hospitais',
                                icon: 'bi bi-hospital',
                                routerLink: ['/app/hospitais'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Hospitais')
                            },
                            {
                                label: 'Motoristas',
                                icon: 'bi bi-person',
                                routerLink: ['/app/motoristas'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Motoristas')
                            },
                            {
                                label: 'Tipos de Doenças',
                                icon: 'bi bi-bug',
                                routerLink: ['/app/disease_types'],
                                visible: this.loginService.havePermission('Pode_Vizualizar_Tipo_Doenca')
                            },
                            {
                                label: 'Tipos de Remoção',
                                icon: 'bi bi-person-down',
                                routerLink: ['/app/tipos_remocao'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Tipo_Remocao')
                            }
                            ,
                            {
                                label: 'Tipos de Encaminhamento',
                                icon: 'bi bi-person-fill-up',
                                routerLink: ['/app/tipos_encaminhamento'],
                                visible: this.loginService.havePermission('Pode_Visualizar_Tipo_Encaminhamento')
                            }                            
                        ]
                    }
                ]
            }
        ];
    }
}
