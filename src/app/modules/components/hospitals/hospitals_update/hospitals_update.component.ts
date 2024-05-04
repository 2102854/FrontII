
import { Hospital } from './../hospitals.model';
import { HospitalsService } from './../hospitals.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-hospital-update',
    templateUrl: './hospitals_update.component.html',
    styleUrls: ['./hospitals_update.component.css'],
    providers: [MessageService]
})

export class HospitalsUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    hospital: Hospital = {
        nome : "",
        hospital_id : null
    }
        
    constructor(private loginService: LoginService, private hospitalService: HospitalsService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Hospital', routerLink: '/app/hospitais' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
        
        //Carrega os dados do hospital
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.hospitalService.readById(id).subscribe(hospital => {
                this.hospital = hospital 
            })          
        }, 200)         
    }
    
    update(): void {

        this.hospital.nome = this.hospital.nome.toUpperCase().trim()
        
        this.hospitalService.update(this.hospital).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/hospitais'])
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
    
    cancel(): void {       
        this.router.navigate(['/app/hospitais'])
    }
}