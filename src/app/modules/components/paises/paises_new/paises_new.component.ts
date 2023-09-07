
import { Pais } from './../paises.model';
import { PaisesService } from './../paises.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-pais-create',
    templateUrl: './paises_new.component.html',
    styleUrls: ['./paises_new.component.css'],
    providers: [MessageService]
})

export class PaisesNewComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    pais: Pais = {
        nome : "",
        sigla : "",
        pais_id: null
    }
        
    constructor(private loginService: LoginService, private paisService: PaisesService, private router: Router, public messageService: MessageService,) {
        this.loginService.validateSession()
    }


    
    ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Pais', routerLink: '/paises' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    /*
    setTimeout(() => {
        if (!this.loginService.sessionIsValid){
        this.router.navigate(['/'])
        } 
    }, 200)
    */
    }
    
    create(): void {

        this.pais.nome = this.pais.nome.toUpperCase()
        this.pais.sigla = this.pais.sigla.toUpperCase()

        this.paisService.create(this.pais).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/paises'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => {
                console.log(e.error['message err'])  
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
    }
    
    cancel(): void {       
        this.router.navigate(['/paises'])
    }
    

}