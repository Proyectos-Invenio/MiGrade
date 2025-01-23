export interface IMenu {
  url: string | null;
  titulo: string;
  icon: string | null;
}

export interface IMenuJson {
  categorias: IMenu[];
}

export interface IUsuarioMenu {
  menu_json: IMenu[];
}

export interface IVisibilidadMenu {
  rol_id: number;
  elemento_menu_id: number;
}
