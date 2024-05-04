
import { Motoristas } from './../motoristas.model';
import { MotoristasService } from './../motoristas.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-motoristas-create',
    templateUrl: './motoristas_update.component.html',
    styleUrls: ['./motoristas_update.component.css'],
    providers: [MessageService]
})

export class MotoristasUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean =   this.loginService.havePermission('Pode_Atualizar_Motoristas'); 

    //Objeto principal do form
    motoristas: Motoristas = {
        nome : "",
        numero_habilitacao : "",
        carga_horaria : null,
        motorista_id : null
    }
        
    constructor(private loginService: LoginService, private MotoristasService: MotoristasService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Motoristas', routerLink: '/app/motoristas' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/motoristas' };
        //Carrega os dados do motorista
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.MotoristasService.readById(id).subscribe(motoristas => {
                this.motoristas = motoristas 
            })          
        }, 200)         
    }
    
    update(): void {

        this.motoristas.nome = this.motoristas.nome.toUpperCase().trim();
        this.motoristas.numero_habilitacao = this.motoristas.numero_habilitacao.toUpperCase().trim();
        this.motoristas.carga_horaria = this.motoristas.carga_horaria;
        console.log(this.motoristas)

        this.MotoristasService.update(this.motoristas).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
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