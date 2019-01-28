import { Endereco } from './shared/endereco.model';

export class Usuario {
  uid: string;
  nome_completo: string;
  fantasia: string;
  cpf: string;
  rg: string;
  url_foto?: string;
  fixo: string;
  celular: string;
  email: string;
  senha: string;
  nivelacesso: number;
  endereco: Endereco = new Endereco();
}
