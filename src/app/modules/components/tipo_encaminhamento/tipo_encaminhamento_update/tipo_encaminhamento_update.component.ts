
import { Tipo_Encaminhamento } from './../tipo_encaminhamento.model';
import { Tipo_EncaminhamentoService} from './../tipo_encaminhamento.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-tipo_encaminhamento-create',
    templateUrl: './tipo_encaminhamento_update.component.html',
    styleUrls: ['./tipo_encaminhamento_update.component.css'],
    providers: [MessageService]
})

export class Tipo_EncaminhamentoUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    tipo_encaminhamento: Tipo_Encaminhamento = {
        nome : "",
        tipo_encaminhamento_id: null
    }
        
    constructor(private loginService: LoginService, private tipo_encaminhamentoService: Tipo_EncaminhamentoService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Tipo de Encaminhamento', routerLink: '/app/tipo_encaminhamento' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
        //Carrega os dados do tipo encaminhamento
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.tipo_encaminhamentoService.readById(id).subscribe(tipo_encaminhamento => {
                this.tipo_encaminhamento = tipo_encaminhamento
            })          
        }, 200)         
    }
    
    update(): void {

        this.tipo_encaminhamento.nome = this.tipo_encaminhamento.nome.toUpperCase().trim()
        
        this.tipo_encaminhamentoService.update(this.tipo_encaminhamento).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
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