
import { Tipo_Remocao } from './../tipo_remocao.model';
import { Tipo_RemocaoService } from './../tipo_remocao.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-tipo_remocao-create',
    templateUrl: './tipo_remocao_update.component.html',
    styleUrls: ['./tipo_remocao_update.component.css'],
    providers: [MessageService]
})

export class Tipo_RemocaoUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_remocao: Tipo_Remocao = {
        nome : "",
        tipo_remocao_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_remocaoService: Tipo_RemocaoService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Tipo_Remocao', routerLink: '/app/tipo_remocao' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
        //Carrega os dados do Tipo de Remocao
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.tipo_remocaoService.readById(id).subscribe(tipo_remocao => {
                this.tipo_remocao = tipo_remocao 
            })          
        }, 200)         
    }
    
    update(): void {

        this.tipo_remocao.nome = this.tipo_remocao.nome.toUpperCase().trim()
        console.log(this.tipo_remocao)

        this.tipo_remocaoService.update(this.tipo_remocao).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
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