import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { LoginService } from './../login.service';
import { Authorization } from './../authorization.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})

export class LoginComponent implements OnInit {
    
    authorization: Authorization = new Authorization();
    
    secretKey = "YourSecretKeyForEncryption&Descryption";

    constructor(private loginService: LoginService, private router: Router, private messageService: MessageService, public layoutService: LayoutService) {         console.log(this.loginService.sessionIsValid)
        this.loginService.validateSession()
        setTimeout(() => {
             if (this.loginService.sessionIsValid){                
                this.router.navigate(['/app/dashboard'])
            }
        }, 1000)		         
        
    }

    valCheck: string[] = ['remember'];

    password!: string;

    ngOnInit(): void {
    }

    login(): void{            
        this.loginService.login(this.authorization).subscribe({
            next: (auth) => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Seja Bem Vindo!'});
                let session_key = auth.session_key
                let cryptoNome = CryptoJS.AES.encrypt(auth.nome, session_key).toString();
                let cryptoPermissoes = CryptoJS.AES.encrypt(auth.permissoes.toString(), session_key).toString();
                localStorage.setItem('@sisGerTransPac-t', auth.token)
                localStorage.setItem('@sisGerTransPac-n', `${cryptoNome}`)
                localStorage.setItem('@sisGerTransPac-p', `${cryptoPermissoes}`)
                localStorage.setItem('@sisGerTransPac-k', `${session_key}`)
                this.loginService.sessionIsValid = true
                setTimeout(() => {
                    //location.reload()
                    this.router.navigate(['/app/dashboard'])
                }, 1000)

            },
            complete: () => {},
            error: (e) => {
                //localStorage.removeItem('currentGame');
                localStorage.clear(); 
                this.loginService.sessionIsValid = false
                this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail:  e.error['message err'] });   
            }
          
        }) 
    } 


}
