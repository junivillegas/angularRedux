export class IngresoEgresoModel {
  descripcion: string;
  monto: number;
  tipo: string;
  uid: string;

  constructor(obj: ObjModel) {
    this.descripcion = obj && obj.descripcion || null;
    this.monto = obj && obj.monto || null;
    this.tipo = obj && obj.tipo || null;
    this.uid = obj && obj.uid || null;
  }
}

interface ObjModel {
  descripcion: string;
  monto: number;
  tipo: string;
  uid: string;
}