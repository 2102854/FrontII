import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem,  MessageService, ConfirmationService} from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { LoginService} from './../modules/components/auth/login.service';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService, ConfirmationService, CookieService]
})
export class AppTopBarComponent implements OnInit {

    key = String(this.cookieService.get('_sisgertranspac-c'));
    crypto = String(this.cookieService.get('_sisgertranspac-n'));

    

    usuario = CryptoJS.AES.decrypt(this.crypto, this.key).toString(CryptoJS.enc.Utf8) 

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, 
        private loginService: LoginService , public layoutService: LayoutService, public cookieService: CookieService) { }

    update() {
        //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' })
        this.router.navigate(['/auth/login'])
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
                            //this.update();
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
    }
}
