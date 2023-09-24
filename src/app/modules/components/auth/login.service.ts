import { Authorization} from './authorization.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

	public sessionIsValid: boolean = false;

	baseUrl = `${environment.baseUrl}/`

	headers = new HttpHeaders({
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
		"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
		"Content-Type" : "application/json",
		"Accept" : "application/json"
	} )  

  	constructor(private httpCliente: HttpClient, private router: Router, public cookieService: CookieService) { }
	   
	havePermission(permissao:string): boolean {
		let result: boolean = false;
		const key = String(this.cookieService.get('_sisgertranspac-c'));
		const crypto: string = String(this.cookieService.get('_sisgertranspac-p'));
		const permissoes: string[] = CryptoJS.AES.decrypt(crypto, key).toString(CryptoJS.enc.Utf8).split(",");

		for (let i = 0; i < permissoes.length; i++) {
			if (permissoes[i] === permissao) {
				result = true;
				break;
			}            
		}
		return result
	}

	haveAnyPermission(group:string): boolean {
		const key = String(this.cookieService.get('_sisgertranspac-c'));
		const crypto: string = String(this.cookieService.get('_sisgertranspac-p'));
		const permissoes: string[] = CryptoJS.AES.decrypt(crypto, key).toString(CryptoJS.enc.Utf8).split(",");

		const gestaoPac: string[] = ['Pode_Visualizar_Pacientes', 'Pode_Visualizar_Agendamentos'];
		const configSis: string[] = ['Pode_Visualizar_Paises', 'Pode_Visualizar_Estados', 'Pode_Visualizar_Cidades', 'Pode_Visualizar_Veiculos',
		'Pode_Visualizar_Hospitais','Pode_Visualizar_Motoristas','Pode_Vizualizar_Tipo_Doenca','Pode_Visualizar_Tipo_Remocao','Pode_Visualizar_Tipo_Encaminhamento'];

		for (let i = 0; i < permissoes.length; i++) {
			if (group === 'gestaoPac'){
				for (let x = 0; x < gestaoPac.length; x++) {
					if (permissoes[i] === gestaoPac[x]) {
						return true;
					}  
				}
			} else if (group === 'configSis') {
				for (let x = 0; x < configSis.length; x++) {
					if (permissoes[i] === configSis[x]) {
						return true;
					}  
				}
			}
		}
		return false
	}	

  	login(auth: Authorization): Observable<Authorization> {
		this.delete_cookies();
		this.headers = new HttpHeaders({  
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 		
		let newUrl = this.baseUrl + "login"   
		return this.httpCliente.post<Authorization>(newUrl, auth, { headers: this.headers})
  	}

	validateToken(token: any): Observable<any>{		
		let newUrl = this.baseUrl + "token_validate";
		this.headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 
		return this.httpCliente.get<any>(newUrl, { headers: this.headers})
	}
  
	//"Authorization": "Bearer " + token,
	logout(token: any):Observable<any>{		
		const newUrl = `${this.baseUrl}logout`
		return this.httpCliente.put<String>(newUrl,{'token': token}, { headers: this.headers})
	}

	delete_cookies() {
		//Exclui apenas os cookies de sessão
		this.cookieService.delete('_sisgertranspac-t','/');
		this.cookieService.delete('_sisgertranspac-n','/');
		this.cookieService.delete('_sisgertranspac-p','/');
		this.cookieService.delete('_sisgertranspac-c','/');
		this.cookieService.delete('_sisgertranspac-i','/');
	}

	executeLogout():void {
		let token = this.cookieService.get('_sisgertranspac-t')
		console.log('executeLogout: ' + token)
		this.logout(token).subscribe({
			next: () => {		
			},
			error: () => {	
			},
			complete: () => {
				this.delete_cookies();
				this.router.navigate(['/auth/login']);
			}
		})
	}

	validateSession(): void { 
		setTimeout(() => {
			let token = this.cookieService.get('_sisgertranspac-t')
			if (token === '' || token === null || token === undefined){
				this.sessionIsValid = false 
				this.delete_cookies();
				this.router.navigate(['/auth/login']);

			} else {	

				this.validateToken(token).subscribe({
					next: (result) => {
						let tokenResult = result.token
						if (tokenResult === 'VALIDO') {
							this.sessionIsValid = true				
						} else {
							this.executeLogout();	
						}
						console.log(result)
					},
					complete: () => {},
					error: (e) => {
						this.sessionIsValid = false  
						this.executeLogout();					  
					}			  
				})
			}
		}, 200)
	}
}