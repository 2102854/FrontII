
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-tipo_remocao',
  templateUrl: './tipo_remocao.component.html',
  styleUrls: ['./tipo_remocao.component.css'],
  providers: [MessageService]
})

export class Tipo_RemocaoComponent {

	//Breadcrumb
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;
	
  	constructor(private router: Router, private messageService: MessageService, private loginService: LoginService) { 
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
            }
        }, 500)		 		
	}


	ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Tipos de Remoção' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };			
	}
	
	novoRegistro(): void {
		this.router.navigate(['/app/tipos_remocao/create']);
	}

    cancel(): void {
        this.router.navigate(['/app/dashboard'])
    }	
}
