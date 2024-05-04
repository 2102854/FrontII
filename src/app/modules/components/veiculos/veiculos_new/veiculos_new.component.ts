
import { Veiculos } from './../veiculos.model';
import { VeiculosService } from './../veiculos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-veiculos-create',
    templateUrl: './veiculos_new.component.html',
    styleUrls: ['./veiculos_new.component.css'],
    providers: [MessageService]
})

export class VeiculosNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    veiculo: Veiculos = {
        modelo : "",
        placa : "",
        capacidade: null,
        media_consumo: null
        //veiculo_id: null
    }
        
    constructor(private loginService: LoginService, private veiculosService: VeiculosService, private router: Router, public messageService: MessageService,) {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
                this.router.navigate(['/auth/login'])
            }
        }, 500)		
    }

    ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Veiculos', routerLink: '/app/veiculos' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.veiculo.modelo = this.veiculo.modelo.toUpperCase().trim()
        this.veiculo.placa = this.veiculo.placa.toUpperCase().trim()
        this.veiculo.capacidade = this.veiculo.capacidade
        this.veiculo.media_consumo = this.veiculo.media_consumo

        this.veiculosService.create(this.veiculo).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/veiculos'])
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
    }
    
    cancel(): void {       
        this.router.navigate(['/app/veiculos'])
    }
    

}