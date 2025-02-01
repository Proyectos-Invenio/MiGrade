export interface IEstudiante {
  identification: number;
  nombre: string;
  clase_id: number;
  padre: number;
  informacion_contacto: number;
  rol: number;
  email: string;
  password: string;
  grado: number;
  seccion: number;
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
