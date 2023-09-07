
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
	

  
  	constructor(private router: Router, private messageService: MessageService, private loginService: LoginService) { }
  	
	
	showMessage(severity: string, summary: string, msg: string): void {
		this.messageService.add({ severity: severity, summary: summary, detail: msg });
	}

	ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Estado' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        let token = localStorage.getItem('@sisGerTransPac-t')		
        if (token != null) {
			if (!this.loginService.validateSession()) {
                localStorage.clear(); 
                this.router.navigate(['auth/login']) 
                this.showMessage('error', 'Sessão encerrada', 'Encerrado por inatividade') 	
				setTimeout(() => {
					location.reload()
				}, 200)							
            }    			
        }			
	}
	
	novoRegistro(): void {
		this.router.navigate(['estados/create']);
	}

    cancel(): void {
        this.router.navigate(['/'])
    }	
}