export interface ChangePassword {
    user_id_to_be_changed?: number,
    old_pass?: string,
    new_pass?: string,
    new_pass_confirmed?: string
}