import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem,  MessageService, ConfirmationService} from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { LoginService} from './../modules/components/auth/login.service';
import { UsuariosService } from './../modules/components/usuarios/usuarios.service';
import { ChangePassword } from './../modules/components/usuarios/usuarios.model';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService, ConfirmationService, CookieService]
})
export class AppTopBarComponent implements OnInit {

    key = String(this.cookieService.get('_sisgertranspac-c'));
    
    nomeCrypto = String(this.cookieService.get('_sisgertranspac-n'));
    usuarioIdCrypto = String(this.cookieService.get('_sisgertranspac-i'));
    
    usuario = CryptoJS.AES.decrypt(this.nomeCrypto, this.key).toString(CryptoJS.enc.Utf8) 
    user_id = CryptoJS.AES.decrypt(this.usuarioIdCrypto, this.key).toString(CryptoJS.enc.Utf8) 

    form_change_password: boolean = false;
    cp: ChangePassword;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, 
        private loginService: LoginService , public layoutService: LayoutService, public cookieService: CookieService,
        private usuariosService: UsuariosService) { }

    showChangePassword() {
        this.cp = {
            user_id_to_be_changed: this.user_id,
            old_pass: '',
            new_pass: '',
            new_pass_confirmed: ''
        } 
        this.form_change_password = true;
    }
  
    hideDialog() {
        this.form_change_password = false;
    }
    
    changePassword() {
        this.form_change_password = false;

        this.usuariosService.changePassword(this.cp).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Senha alterada com sucesso!' });
                setTimeout(() => {
                    this.loginService.executeLogout();
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

    logoutQuestion() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que deseja sair?',
            header: 'Atenção',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loginService.executeLogout()                
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Atenção', detail: 'Operação cancelada pelo usuário.' })
                }
        });
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Mais opções',
                items: [
                    {
                      separator: true
                    },
                    {
                        label: 'Trocar Senha',
                        icon: 'bi bi-key',
                        command: () => {
                            this.showChangePassword();
                        }
                    },
                    {
                        label: 'Sair',
                        icon: 'bi bi-box-arrow-right',
                        command: () => {
                            this.logoutQuestion()
                        }
                    }
                ]
            }
        ];

        this.cp = {
            user_id_to_be_changed: this.user_id,
            old_pass: '',
            new_pass: '',
            new_pass_confirmed: ''
        }     
    }
}
