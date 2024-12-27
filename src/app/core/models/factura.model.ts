import { Proveedor } from "./proveedor.model";

export interface Factura{
    id?: number;
    nombre: Proveedor
    fechaEmision: Date | string;
    fechaVencimiento: Date | string;
    concepto: string;
    cantidad: number;
    unidadMedida: string;
    precioUnitario: number;
    alicuotaIva: number;
    subtotal: number;
    totalFactura: number;
    numeroFactura: string;
    letraFactura: string;
    estado: string; 
}