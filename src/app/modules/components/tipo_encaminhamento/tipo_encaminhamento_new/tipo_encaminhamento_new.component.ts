
import { Tipo_Encaminhamento } from './../tipo_encaminhamento.model';
import { Tipo_EncaminhamentoService } from './../tipo_encaminhamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-tipo_encaminhamento-create',
    templateUrl: './tipo_encaminhamento_new.component.html',
    styleUrls: ['./tipo_encaminhamento_new.component.css'],
    providers: [MessageService]
})

export class Tipo_EncaminhamentoNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_encaminhamento: Tipo_Encaminhamento = {
        nome : "",
        tipo_encaminhamento_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_encaminhamentoService: Tipo_EncaminhamentoService, private router: Router, public messageService: MessageService,) {
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
        this.items = [{ label: 'Tipos de Encaminhamento', routerLink: '/app/tipo_encaminhamento' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.tipo_encaminhamento.nome = this.tipo_encaminhamento.nome.toUpperCase().trim()

        this.tipo_encaminhamentoService.create(this.tipo_encaminhamento).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/tipo_encaminhamento'])
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
        this.router.navigate(['/app/tipo_encaminhamento'])
    }
    

}