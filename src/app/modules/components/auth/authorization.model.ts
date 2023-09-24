export class Authorization {
    token: string
    nome: string
    permissoes: string[]
    email: string
    senha: string
    session_key: string
    usuario_id: string
}

export interface ChangePassword {
    user_id_to_be_changed: string,
    old_pass: string,
    new_pass: string,
    new_pass_confirmed: string
}