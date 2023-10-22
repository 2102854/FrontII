
import { CidadeFull } from './../cidades.model';
import { CidadesService } from './../cidades.service';
import { Estado } from '../../estados/estados.model';
import { EstadosService } from '../../estados/estados.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import { Pais } from '../../paises/paises.model';
import { PaisesService } from '../../paises/paises.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-cidade-update',
    templateUrl: './cidades_update.component.html',
    styleUrls: ['./cidades_update.component.css'],
    providers: [MessageService]
})

export class CidadesUpdateComponent implements OnInit {

    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    //Objeto principal do form
    cidade: CidadeFull = {
        cidade_id: null,
        estado_id: null,
        pais_id: null,
        estado_nome: null,
        pais_nome: null,
        distancia_km: null, 
        valor_pedagio: null,
        nome: null,
    }
    
    paises: Pais[];
    selectedPais: Pais | undefined;

    estados: Estado[];
    selectedEstado: Estado | undefined;

    formGroup: FormGroup | undefined;
    
    constructor(
        private loginService: LoginService, 
        private cidadesService: CidadesService, 
        private estadosService: EstadosService, 
        private paisesService: PaisesService, 
        private router: Router, 
        public messageService: MessageService
    ) {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
            }
        }, 500)			 
    }

    ngOnInit(): void {
        
        // Componente Breadcrumb
        this.items = [{ label: 'Cidades', routerLink: '/app/cidades' }, { label: 'Atualização do Registro' }]
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' } 
        /*        
        this.paisesService.read().subscribe(paises => {
            this.paises = paises   
        });
        
        this.estadosService.read().subscribe(estados => {
            this.estados = estados   
        });

        this.formGroup = new FormGroup({
            selectedPais: new FormControl<object | null>(null),
            selectedEstado: new FormControl<object | null>(null)
        });
        */
        

       
    }
    
    create(): void {
        /*
        this.cidade.nome = this.cidade.nome.toUpperCase().trim();
        this.cidade.distancia_km = this.cidade.distancia_km
        this.cidade.valor_pedagio = this.cidade.valor_pedagio
        this.cidade.pais_id = this.selectedPais.pais_id;
        this.cidade.estado_id = this.selectedEstado.estado_id;

        this.cidadesService.create(this.cidade).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/cidades'])
                }, 2500)                               
            },
            complete: () => {},
            error: (e) => {
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
        */

    }
    
    cancel(): void {       
        this.router.navigate(['/app/cidades'])
    }
    
}