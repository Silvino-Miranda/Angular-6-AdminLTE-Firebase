import { Endereco } from "./shared/endereco.model";

export class Passageiro {
  $key: string;
  key_empresa: string;
  nome_completo: string;
  fone_celular: string;
  cpf: string;
  rg: string;
  orgao_expedidor?: string;
  url_foto?: string;
  endereco: Endereco = new Endereco();
}
