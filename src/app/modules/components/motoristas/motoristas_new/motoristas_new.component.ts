
import { Motoristas } from './../motoristas.model';
import { MotoristasService } from './../motoristas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-motoristas-create',
    templateUrl: './motoristas_new.component.html',
    styleUrls: ['./motoristas_new.component.css'],
    providers: [MessageService]
})

export class MotoristasNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    motoristas: Motoristas = {
        nome : "",
        numero_habilitacao : "",
        carga_horaria: null,
        motorista_id: null
    }
        
    constructor(private loginService: LoginService, private motoristasService: MotoristasService, private router: Router, public messageService: MessageService,) {
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
        this.items = [{ label: 'Motoristas', routerLink: '/app/motoristas' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.motoristas.nome = this.motoristas.nome.toUpperCase().trim()
        this.motoristas.numero_habilitacao = this.motoristas.numero_habilitacao.toUpperCase().trim()
        this.motoristas.carga_horaria = this.motoristas.carga_horaria

        this.motoristasService.create(this.motoristas).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/motoristas'])
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
        this.router.navigate(['/app/motoristas'])
    }
    

}