import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestão de Pacientes',
                items: [
                    { label: 'Pacientes', icon: 'pi pi-fw pi-id-card', routerLink: ['/pacientes'] },
                    { label: 'Agendamento', icon: 'pi pi-fw pi-calendar', routerLink: ['/agendamento'] }
                ]
            },
            {
                label: 'Configurações',
                items: [
                    {
                        label: 'Cadastro',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Países',
                                icon: 'bi bi-globe-americas',
                                routerLink: ['/paises']
                            },
                            {
                                label: 'Estados',
                                icon: 'bi bi-map',
                                routerLink: ['/estados']
                            }, 
                            {
                                label: 'Cidades',
                                icon: 'bi bi-buildings',
                                routerLink: ['/cidades']
                            },                            
                            {
                                label: 'Veículos',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/veiculos']
                            },
                            {
                                label: 'Hospitais',
                                icon: 'bi bi-hospital',
                                routerLink: ['/hospitais']
                            },
                            {
                                label: 'Motoristas',
                                icon: 'bi bi-person',
                                routerLink: ['/motoristas']
                            },
                            {
                                label: 'Tipos de Doenças',
                                icon: 'bi bi-bug',
                                routerLink: ['/tipos_doenca']
                            },
                            {
                                label: 'Tipos de Remoção',
                                icon: 'bi bi-person-down',
                                routerLink: ['/tipos_remocao']
                            }
                            ,
                            {
                                label: 'Tipos de Encaminhamento',
                                icon: 'bi bi-person-fill-up',
                                routerLink: ['/tipos_encaminhamento']
                            }                            
                        ]
                    }
                ]
            }
        ];
    }
}
