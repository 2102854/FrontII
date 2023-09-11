import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    //items: MenuItem[] | undefined;

    key = String(localStorage.getItem('@sisGerTransPac-k'));
    crypto = String(localStorage.getItem('@sisGerTransPac-n'));
    usuario = CryptoJS.AES.decrypt(this.crypto, this.key).toString(CryptoJS.enc.Utf8) 

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

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
                            //this.logout();
                        }
                    }
                ]
            }
        ];
    }
}
