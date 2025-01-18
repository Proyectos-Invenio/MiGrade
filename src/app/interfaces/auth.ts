interface ISubCategoria {
    url: string;
    sub_categoria: string;
}

interface ICategoria {
    url: string | null;
    categoria: string;
    subcategorias: ISubCategoria[] | null;
    iconos: string | null;
}

export interface IMenuJson {
    seccion: string;
    categorias: ICategoria[];
}

export interface IUsuarioMenu {
    menu_json: IMenuJson;
}

export interface IUsuarios {
    id: number
    nombre: string
    usuario: string
    correo: string
    id_pais: number
    pais: string
    codigo: string
}
