
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './../../auth/login.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-paises',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [MessageService]
})

export class UsuariosComponent {

	//Breadcrumb
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;

    // Permissões do módulo
    canView : boolean = this.loginService.havePermission('Pode_Visualizar_Usuarios');
    canRegister: boolean = this.loginService.havePermission('Pode_Adicionar_Usuarios');
	
  	constructor(private router: Router, private messageService: MessageService, private loginService: LoginService) { 
        // Valida a sessão do usuário
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
            } 
        }, 500)		 		
	}

	ngOnInit(): void {
        // Se o usuário não tem permissão, redireciona para a dashboard
        if (!this.canView) {
            this.router.navigate(['/app/dashboard']);
        }
        // Componente Breadcrumb
        this.items = [{ label: 'Usuarios' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };			
	}
	
	novoRegistro(): void {
        // Se o usuário tem permissão, redireciona para a página de cadastro
        if (this.canRegister){
		    this.router.navigate(['/app/usuarios/create']);
        }
	}

    cancel(): void {
        // Volta para a página inicial
        this.router.navigate(['/app/dashboard'])
    }	
}
