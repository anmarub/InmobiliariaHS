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
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  listTypeProduct: TypeProductModel[] = [];
  listTypeProperty: TypePropertyModel[] = [];
  listEmployee: EmployeeModel[] = [];

  formValidator: FormGroup = this.fb.group({
    code: ["", [Validators.required, Validators.minLength(3)]],
    name: ["", [Validators.required, Validators.minLength(3)]],
    cost: ["", [Validators.required, Validators.minLength(1)]],
    link_photo: ["", [Validators.required, Validators.minLength(3)]],
    address: ["", [Validators.required, Validators.minLength(3)]],
    typeProductId: ["", [Validators.required, Validators.minLength(1)]],
    typePropertyId: ["", [Validators.required, Validators.minLength(1)]],
    employeeId: ["", [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private typeProduct: TypeProductService,
    private typeProperty: TypePropertyService,
    private employee: EmployeesService,
    private product: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetListTypeProduct();
    this.GetListTypeProperty();
    this.GetListEmployee();
  }

  saveProduct() {
    const code = this.formValidator.controls["code"].value;
    const name = this.formValidator.controls["name"].value;
    const cost = parseInt(this.formValidator.controls["cost"].value);
    const link_photo = this.formValidator.controls["link_photo"].value;
    const address = this.formValidator.controls["address"].value;
    const typeProductId = this.formValidator.controls["typeProductId"].value;
    const typePropertyId = this.formValidator.controls["typePropertyId"].value;
    const employeeId = this.formValidator.controls["employeeId"].value;

    let newProduct = new ProductsModel();
    newProduct.code = code;
    newProduct.name = name;
    newProduct.cost = cost;
    newProduct.link_photo = link_photo;
    newProduct.address = address;
    newProduct.typeProductId = typeProductId;
    newProduct.typePropertyId = typePropertyId;
    newProduct.employeeId = employeeId;
    console.log(JSON.stringify(newProduct));

    // creo un ventana emergente para confirmar la eliminacion
    this.dialog
      .open(DialogComponent, {
        //envio la alerta personalizada
        data: `¿Esta Seguro de Guardar el Cliente?`,
      })
      .afterClosed()
      //despues de cerra la ventana envia un boolean
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          // si es verdadero llamo al servicio de clientes para eliminar el cliente
          this.product.createProduct(newProduct).subscribe({
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
