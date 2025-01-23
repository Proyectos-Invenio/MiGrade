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
  identification: number;
  password: string;
}
