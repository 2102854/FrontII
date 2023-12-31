import { Component, OnInit } from '@angular/core';
import { User, ChangePassword, Permission, ChangePermission} from './../usuarios.model';
import { UsuariosService } from "./../usuarios.service";
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../auth/login.service';
import { MessageService} from 'primeng/api';

@Component({
    selector: 'app-usuarios-list',
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.css'],
    providers: [MessageService]
})

export class UsuariosListComponent implements OnInit {

    users: User[];
    permissoes: Permission[];
    userPermission: boolean[] = [];
    
    // Permissões do usuário
    form_permission: boolean = false;
    iconPermissionId: number = 0;

    // Alteração de senha do usuário
    cp: ChangePassword;
    form_change_password: boolean = false;

    // Identifica o usuário para alteração
    nomeAlteracao: string;
    idUsuarioAlteracao: number = 0;

    // Permissões do módulo - Verifica se o usuário pode alterar o registro
    canModify:boolean = this.loginService.havePermission('Pode_Atualizar_Usuarios');

    constructor(private router: Router, private usuariosService: UsuariosService, private loginService: LoginService,  private messageService: MessageService, ) { }

    ngOnInit(): void {
        // Recupera a lista de objetos e exibe no grid
        this.usuariosService.read().subscribe(users => {
            this.users = users;          
        });

        // Carrega a lista de permissoes no GRID
        this.usuariosService.get_permissao().subscribe(permissoes => {
            this.permissoes = permissoes; 
            this.resetListPermissions();               
        });
    }  

    // Alteração das permissões de usuário
    resetListPermissions(){
        for (let i = 0; i < this.permissoes.length; i++) {
            this.userPermission[i] = false;                
        }   
    }

    getIcon(i: number){        

        let icone: string = 'pi pi-ban';
        
        if (i == this.iconPermissionId) {
            icone = 'pi pi-spin pi-spinner';
        }
        else {
            if (this.userPermission[i] == true) {
                icone = 'pi pi-check';
            }
        }
        return icone
    }

    changePermission(i: number){
        let cp:ChangePermission
        cp = {
            permissao_id: i,
            user_id: this.idUsuarioAlteracao
        } 
        this.iconPermissionId = i;
        this.userPermission[i] = !this.userPermission[i];       
        
        this.usuariosService.change_user_permission(cp).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Permissão alterada com sucesso!' });                                              
            },
            complete: () => {this.iconPermissionId = 0;},
            error: (e) => { 
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }  
                this.iconPermissionId = 0;            
            }	
        })
        
    }

    showChangePermissions(user_id: number, nome: string, sobrenome: string ) {
        
        this.resetListPermissions();

        this.nomeAlteracao = nome + ' ' + sobrenome;
        this.idUsuarioAlteracao = user_id;
        this.form_permission = true;

        this.usuariosService.get_permissao_usuario(user_id).subscribe(permissoes => {
            for (let i = 0; i < permissoes.length; i++) {
                for ( let x = 0; x <= this.permissoes.length; x++) {
                    if (x == Number(permissoes[i]['permissao_id'])) {
                        this.userPermission[x] = true;
                    }
                }                
            }              
        })  
    }

    // Alteração de senha de usuários
    showChangePassword(user_id: number, nome: string, sobrenome: string ) {
        this.nomeAlteracao = nome + ' ' + sobrenome;
        this.idUsuarioAlteracao = user_id;
        this.cp = {
            user_id_to_be_changed: user_id,
            old_pass: '',
            new_pass: '',
            new_pass_confirmed: ''
        } 
        this.form_change_password = true;
    }

    changePassword() {
        this.form_change_password = false;

        this.usuariosService.changePassword(this.cp).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Senha alterada com sucesso!' });                                              
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

    hidePasswordDialog() {
        this.nomeAlteracao = '';
        this.idUsuarioAlteracao = 0;
        this.form_change_password = false;
    }

    update(id: number): void {
        // Permissões do módulo - Se o usuário tem permissão, redireciona para a página de alteração
        if (this.canModify){
		    this.router.navigate([`/app/usuarios/update/${id}`]);            
        }        
    }

    // Método sort do grid
    customSort(event: SortEvent) {        
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }
}
