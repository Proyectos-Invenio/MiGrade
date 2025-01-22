export interface ICategoria {
  url: string | null;
  titulo: string;
  icon: string | null;
}

export interface IMenuJson {
  categorias: ICategoria[];
}

export interface IUsuarioMenu {
  menu_json: ICategoria[];
}

export interface IUsuarios {
  id: number;
  nombre: string;
  usuario: string;
  correo: string;
  id_pais: number;
  pais: string;
  codigo: string;
}
