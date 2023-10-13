
import { Tipo_Remocao } from './../tipo_remocao.model';
import { Tipo_RemocaoService } from './../tipo_remocao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-tipo_remocao-create',
    templateUrl: './tipo_remocao_new.component.html',
    styleUrls: ['./tipo_remocao_new.component.css'],
    providers: [MessageService]
})

export class Tipo_RemocaoNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_remocao: Tipo_Remocao = {
        nome : "",
        tipo_remocao_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_remocaoService: Tipo_RemocaoService, private router: Router, public messageService: MessageService,) {
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
        this.items = [{ label: 'Tipo_Remocao', routerLink: '/app/tipos_remocao' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.tipo_remocao.nome = this.tipo_remocao.nome.toUpperCase().trim()

        this.tipo_remocaoService.create(this.tipo_remocao).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/tipos_remocao'])
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
        this.router.navigate(['/app/tipos_remocao'])
    }
    

}