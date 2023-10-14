
import { Tipo_Doenca } from './../tipo_doenca.model';
import { Tipo_DoencaService } from './../tipo_doenca.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-tipo_doenca-create',
    templateUrl: './tipo_doenca_update.component.html',
    styleUrls: ['./tipo_doenca_update.component.css'],
    providers: [MessageService]
})

export class Tipos_DoencaUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_doenca: Tipo_Doenca = {
        nome : "",
        tipo_doenca_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_doencaService: Tipo_DoencaService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Tipo_Doenca', routerLink: '/app/disease_types' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
        //Carrega os dados do Tipo de Doença
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.tipo_doencaService.readById(id).subscribe(tipo_doenca => {
                this.tipo_doenca = tipo_doenca 
            })          
        }, 200)         
    }
    
    update(): void {

        this.tipo_doenca.nome = this.tipo_doenca.nome.toUpperCase().trim()
        console.log(this.tipo_doenca)

        this.tipo_doencaService.update(this.tipo_doenca).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
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