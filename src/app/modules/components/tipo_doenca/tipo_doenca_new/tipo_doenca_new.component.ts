
import { Tipo_Doenca } from './../tipo_doenca.model';
import { Tipo_DoencaService } from './../tipo_doenca.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-tipo_doenca-create',
    templateUrl: './tipo_doenca_new.component.html',
    styleUrls: ['./tipo_doenca_new.component.css'],
    providers: [MessageService]
})

export class Tipos_DoencaNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_doenca: Tipo_Doenca = {
        nome : "",
        tipo_doenca_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_doencaService: Tipo_DoencaService, private router: Router, public messageService: MessageService,) {
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
        this.items = [{ label: 'Tipo_Doenca', routerLink: '/app/disease_types' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.tipo_doenca.nome = this.tipo_doenca.nome.toUpperCase().trim()

        this.tipo_doencaService.create(this.tipo_doenca).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/disease_types'])
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
        this.router.navigate(['/app/disease_types'])
    }
    

}