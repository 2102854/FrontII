
/*import { CidadeFull } from './../cidades.model';*/
import { Cidade } from './../cidades.model';
import { CidadesService } from './../cidades.service';
import { Estado } from '../../estados/estados.model';
import { EstadosService } from '../../estados/estados.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import { Pais } from '../../paises/paises.model';
import { PaisesService } from '../../paises/paises.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-cidade-update',
    templateUrl: './cidades_update.component.html',
    styleUrls: ['./cidades_update.component.css'],
    providers: [MessageService]
})

export class CidadesUpdateComponent implements OnInit {
    paises: Pais[] = [];
    selectedPais: Pais

    estados: Estado[] = [];
    selectedEstado: Estado

    formGroup: FormGroup | undefined;

    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    //Objeto principal do form
    cidade: Cidade = {
        cidade_id: null,
        estado_id: null,
        pais_id: null,
       /* estado_nome: null,
        pais_nome: null,*/
        distancia_km: null, 
        valor_pedagio: null,
        nome: null,
    }

    get_pais_id(id: number): number {
        let num: number
        for (let i = 0; i < this.paises.length; i++) {
            num = i
            if (Number(this.paises[i]['pais_id']) === id) {
                break
            }
        }    
        return num  
    } 

    get_estado_id(id: number): number {
        let num: number
        for (let i = 0; i < this.estados.length; i++) {
            num = i
            if (Number(this.estados[i]['estado_id']) === id) {
                break
            }
        }    
        return num  
    }     

    constructor(
        private loginService: LoginService, 
        private cidadesService: CidadesService, 
        private estadosService: EstadosService, 
        private paisesService: PaisesService, 
        private router: Router, 
        public messageService: MessageService,
        private route: ActivatedRoute) {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
            }
        }, 500)	
        
        const id = this.route.snapshot.paramMap.get('id') 
        this.cidadesService.readById(id).subscribe(cidade => {             
            this.cidade = cidade 
        })         		 
    }

    ngOnInit(): void {
        
        setTimeout(() => {
        
            this.paisesService.read().subscribe(paises => {
                this.paises = paises;  
                this.selectedPais = this.paises[this.get_pais_id(this.cidade.pais_id)]
            })          
            }, 200) 
            
            this.formGroup = new FormGroup({
                selectedPais: new FormControl<object | null>(null)
            });            

        setTimeout(() => {
    
            this.estadosService.read().subscribe(estados => {
                this.estados = estados;  
                this.selectedEstado = this.estados[this.get_estado_id(this.cidade.estado_id)]
            })          
            }, 200)             

            this.formGroup = new FormGroup({
                selectedEstado: new FormControl<object | null>(null)
            });


        // Componente Breadcrumb
        this.items = [{ label: 'Cidades', routerLink: '/app/cidades' }, { label: 'Atualização do Registro' }]
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' } 
       
    }
    
  /*  create(): void {
        
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
        
    } */

    update(): void {

        this.cidade.nome = this.cidade.nome.toUpperCase().trim();
        this.cidade.distancia_km = this.cidade.distancia_km;
        this.cidade.valor_pedagio = this.cidade.valor_pedagio;
        this.cidade.pais_id = this.selectedPais.pais_id;
        this.cidade.estado_id = this.selectedEstado.estado_id;

        this.cidadesService.update(this.cidade).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/cidades'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => {
                console.log(e.error['message err'])  
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
    }
    
    cancel(): void {       
        this.router.navigate(['/app/cidades'])
    }
    
}