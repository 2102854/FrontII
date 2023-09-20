import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from './../login.service';
import { Authorization } from './../authorization.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import IPData from 'ipdata';
import {CookieService} from 'ngx-cookie-service';


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
    providers: [MessageService, CookieService]
})

export class LoginComponent implements OnInit {
    
    public ipLocal: string[] | false = false;
    
    authorization: Authorization = new Authorization();

    loginIsDisable: boolean = true;
        
    //auth_Geolocation: Auth_Geolocation;

    cookieGeolocation = '';

    constructor(
        private loginService: LoginService,         
        private router: Router, 
        private messageService: MessageService, 
        public cookieService: CookieService,
        public layoutService: LayoutService) 
    {  

        this.loginIsDisable = true;
        let vloginIsDisable: boolean = true;
        this.cookieGeolocation = this.cookieService.get('_sisgertranspac-g');
        let secretKey = "YourSecretKeyForEncryption&Descryption";

        if (this.cookieGeolocation == null || this.cookieGeolocation == '') {
            const cacheConfig = {
                max: 1000, // max size
                maxAge: 10 * 60 * 1000, // max age in ms (i.e. 10 minutes)
            };
            const ipdata = new IPData('8cf9fde1a742147df75e51f9d37b651726eba0d583bb3a997e5c908e', cacheConfig);
            ipdata.lookup()
            .then(function(info) {
                let geolocation = `ip:${info.ip}|city:${info.city}|region_code:${info.region_code}|country_name:${info.country_name}|country_code:${info.country_code}|latitude:${info.latitude}|longitude:${info.longitude}|flag:${info.flag}|carrier_name:${info.asn.name}|carriet_type:${info.asn.type}|time_zone:${info.time_zone.name}` 
                let result =CryptoJS.AES.encrypt(geolocation, secretKey).toString();
                cookieService.set('_sisgertranspac-g', result, { expires: 5, path: '/', sameSite:'Strict' });
                if(info.city === 'Ribeirão Preto'){
                    vloginIsDisable = false;
                } else {
                }
            });
            setTimeout(() => {
                if(!vloginIsDisable){
                    this.loginIsDisable = false;
                }
           }, 500)	

        } 

        setTimeout(() => {
             if (this.loginService.sessionIsValid){                
                this.router.navigate(['/app/dashboard'])
            }
        }, 200)		         
        
    }

    valCheck: string[] = ['remember'];

    password!: string;

    ngOnInit(): void {
        setTimeout(() => {
            this.cookieGeolocation = this.cookieService.get('_sisgertranspac-g');
            if (this.cookieGeolocation !== null && this.cookieGeolocation !== '') {
                let secretKey = "YourSecretKeyForEncryption&Descryption";
                let result = CryptoJS.AES.decrypt(this.cookieGeolocation, secretKey).toString(CryptoJS.enc.Utf8);
                if (result !== null && result !== ''){
                    let geolocation = result.split("|")
                    let gelocation_city = geolocation[1].split(":")
                    if (gelocation_city[1] === 'Ribeirão Preto'){
                        this.loginIsDisable = false;
                    }  
                }
            }
        }, 200)	
    }

    login(): void{            
        this.loginService.login(this.authorization).subscribe({
            next: (auth) => {
                
                //Dispara a mensagem de login com sucesso
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Seja Bem Vindo!'});
                
                //Criptografa os dados para serem salvos na sessão
                let session_key = auth.session_key
                let cryptoNome = CryptoJS.AES.encrypt(auth.nome, session_key).toString();
                let cryptoPermissoes = CryptoJS.AES.encrypt(auth.permissoes.toString(), session_key).toString();

                //Salva os cookies com os dados da sessão
                this.cookieService.set('_sisgertranspac-t', auth.token, { expires: 1, path: '/', sameSite:'Strict'});
                this.cookieService.set('_sisgertranspac-n', `${cryptoNome}`, { expires: 1, path: '/', sameSite:'Strict'});
                this.cookieService.set('_sisgertranspac-p', `${cryptoPermissoes}`, { expires: 1, path: '/', sameSite:'Strict'});
                this.cookieService.set('_sisgertranspac-c', `${session_key}`, { expires: 1, path: '/', sameSite:'Strict'});
               
                setTimeout(() => {
                    this.router.navigate(['/app/dashboard'])
                }, 1000)

            },
            complete: () => {},
            error: (e) => {
                console.log(e)
                localStorage.clear(); 
                this.loginService.sessionIsValid = false
                this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail:  e.error['message err'] });   
            }
          
        }) 
    } 

}
