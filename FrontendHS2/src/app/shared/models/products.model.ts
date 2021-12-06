export class ProductsModel {
    id?: string;
    code?: string;
    name?: string;
    cost?: number;
    link_photo?: string;
    address?: string;
    typeProductId?: string; //multivaluados relacionados por id
    id_employee?: string;//multivaluados relacionados por id
    employeeId?: string;//multivaluados relacionados por id
}