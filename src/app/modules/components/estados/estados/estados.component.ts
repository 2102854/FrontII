
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  providers: [MessageService]
})

export class EstadosComponent {

	//Breadcrumb
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;
	

  	constructor(private router: Router, private messageService: MessageService, private loginService: LoginService) { 
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
        this.items = [{ label: 'Estado' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };		
	}
	
	novoRegistro(): void {
		this.router.navigate(['/app/estados/create']);
	}

    cancel(): void {
        this.router.navigate(['/app/dashboard'])
    }	
}