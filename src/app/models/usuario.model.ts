export interface Usuario {
  idUsuario?: number;
  nomeCompleto: string;
  idade: number | null;
  email: string;
  telefone: string; 
  cpf: string;      
  senha: string;
}
