import { Component, OnInit } from "@angular/core";
import { TypeProductModel } from "../../shared/models/type-product.model";
import { TypePropertyModel } from "../../shared/models/type-property.model";
import { EmployeeModel } from "../../shared/models/employee.model";
import { TypeProductService } from "src/app/shared/services/type-product.service";
import { TypePropertyService } from "src/app/shared/services/type-property.service";
import { EmployeesService } from "src/app/shared/services/employees.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsModel } from "../../shared/models/products.model";
import { ProductsService } from "../../shared/services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  //defino la variable que almacenara el id de la ruta del producto
  id : string = ''; 
  //creo una variable para almacenar los datos multivaluados del formulario
  listTypeProduct: TypeProductModel[] = [];
  listTypeProperty: TypePropertyModel[] = [];
  listEmployee: EmployeeModel[] = [];

  formValidator: FormGroup = this.fb.group({
    'id': ["", [Validators.required]],
    'code': ["", [Validators.required, Validators.minLength(3)]],
    'name': ["", [Validators.required, Validators.minLength(3)]],
    'cost': ["", [Validators.required, Validators.minLength(1)]],
    'link_photo': ["", [Validators.required, Validators.minLength(3)]],
    'address': ["", [Validators.required, Validators.minLength(3)]],
    'typeProductId': ["", [Validators.required, Validators.minLength(1)]],
    'typePropertyId': ["", [Validators.required, Validators.minLength(1)]],
    'employeeId': ["", [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private typeProduct: TypeProductService,
    private typeProperty: TypePropertyService,
    private employee: EmployeesService,
    private product: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private idRouter: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.GetListTypeProduct();
    this.GetListTypeProperty();
    this.GetListEmployee();
    this.id = this.idRouter.snapshot.params['id'];
    this.searchProduct();
  }

  searchProduct(){
    this.product.getProductId(this.id).subscribe({
      next: (data: ProductsModel) => {
        this.formValidator.controls['id'].setValue(this.id);
        this.formValidator.controls['code'].setValue(data.code);
        this.formValidator.controls['name'].setValue(data.name);
        this.formValidator.controls['cost'].setValue(data.cost);
        this.formValidator.controls['link_photo'].setValue(data.link_photo);
        this.formValidator.controls['address'].setValue(data.address);
        this.formValidator.controls['typeProductId'].setValue(data.typeProductId);
        this.formValidator.controls['typePropertyId'].setValue(data.typePropertyId);
        this.formValidator.controls['employeeId'].setValue(data.employeeId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editProduct() {
    const id = this.id;
    const code = this.formValidator.controls["code"].value;
    const name = this.formValidator.controls["name"].value;
    const cost = parseInt(this.formValidator.controls["cost"].value);
    const link_photo = this.formValidator.controls["link_photo"].value;
    const address = this.formValidator.controls["address"].value;
    const typeProductId = this.formValidator.controls["typeProductId"].value;
    const typePropertyId = this.formValidator.controls["typePropertyId"].value;
    const employeeId = this.formValidator.controls["employeeId"].value;

    let editProduct = new ProductsModel();
    editProduct.id = id;
    editProduct.code = code;
    editProduct.name = name;
    editProduct.cost = cost;
    editProduct.link_photo = link_photo;
    editProduct.address = address;
    editProduct.typeProductId = typeProductId;
    editProduct.typePropertyId = typePropertyId;
    editProduct.employeeId = employeeId;

    // creo un ventana emergente para confirmar la eliminacion
    this.dialog
      .open(DialogComponent, {
        //envio la alerta personalizada
        data: `¿Esta Seguro de Actualizar el Cliente?`,
      })
      .afterClosed()
      //despues de cerra la ventana envia un boolean
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          // si es verdadero llamo al servicio de clientes para eliminar el cliente
          this.product.UpdateProduct(editProduct).subscribe({
            next: (data: ProductsModel) => {
              this.router.navigate(["/admin/modules/products"]);
            },
            error: (err) => {
              console.log(err);
            },
          });
        } else {
          // si es falso no hace nada
        }
      });
  }

  GetListTypeProduct() {
    this.typeProduct.GetAllTypeProduct().subscribe({
      next: (data: TypeProductModel[]) => {
        this.listTypeProduct = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetListTypeProperty() {
    this.typeProperty.getAllTypeProperty().subscribe({
      next: (data: TypePropertyModel[]) => {
        this.listTypeProperty = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetListEmployee() {
    this.employee.getAllEmployees().subscribe({
      next: (data: EmployeeModel[]) => {
        this.listEmployee = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
