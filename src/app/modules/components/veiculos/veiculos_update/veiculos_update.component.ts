
import { Veiculos } from './../veiculos.model';
import { VeiculosService } from './../veiculos.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-veiculos-create',
    templateUrl: './veiculos_update.component.html',
    styleUrls: ['./veiculos_update.component.css'],
    providers: [MessageService]
})

export class VeiculosUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    veiculos: Veiculos = {
        modelo : "",
        placa : "",
        capacidade : null,
        media_consumo : null,
        veiculo_id : null
    }
        
    constructor(private loginService: LoginService, private VeiculosService: VeiculosService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
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
        this.items = [{ label: 'Veiculos', routerLink: '/app/veiculos' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/veiculos' };
        //Carrega os dados do Veículo
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.VeiculosService.readById(id).subscribe(veiculos => {
                this.veiculos = veiculos 
            })          
        }, 200)         
    }
    
    update(): void {

        this.veiculos.modelo = this.veiculos.modelo.toUpperCase().trim();
        this.veiculos.placa = this.veiculos.placa.toUpperCase().trim();
        this.veiculos.capacidade = this.veiculos.capacidade;
        this.veiculos.media_consumo = this.veiculos.media_consumo;
        console.log(this.veiculos)

        this.VeiculosService.update(this.veiculos).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/veiculos'])
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
        this.router.navigate(['/app/veiculos'])
    }
}