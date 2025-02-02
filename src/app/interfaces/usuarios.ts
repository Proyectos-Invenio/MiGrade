export interface IEstudiante {
  identification: number;
  nombre: string;
  encargado: string;
  encargado_id: number;
  informacion_contacto: number;
  rol: number;
  email: string;
  password: string;
  seccion: string;
  sexo: string;
}

export interface IAdministrador {
    identification: number;
    nombre: string;
    rol: number;
    email: string;
    password: string;
}

export interface IProfesor {
    identification: number;
    nombre: string;
    asignatura_id: number;
    rol: number;
    email: string;
    password: string;
    informacion_contacto: number;
}

export interface IEncargado {
    identification: number;
    nombre: string;
    informacion_contacto: number;
    rol: number;
    email: string;
    password: string;
}
