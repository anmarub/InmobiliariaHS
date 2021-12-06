import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductsService } from 'src/app/shared/services/products.service';
import {ProductsModel } from '../../shared/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  
  //defino los encabezados de las columnas
  displayedColumns: string[] = ['code', 'name', 'cost', 'address', 'actions'];
  //Isntancio el dataSource y asigno el modelo de datos 
  dataSource = new MatTableDataSource<ProductsModel>();
  //isntancio el paginador
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  //instancio el servicio de productoss
  constructor(private products : ProductsService) {

  }

  ngOnInit() {
    // llamo al metodo para obtener los productos al iniciar el componente
    this.GetListProducts();
  }
  
  ngAfterViewInit() {
    //llamo al metodo para paginacion despues de que se inicialice el componente	
    this.dataSource.paginator = this.paginator;
  }
  // creo el metodo para obtener los productos
  GetListProducts(){
    //llamo al servicio para obtener los productos desde el services
    this.products.getAllProducts().subscribe({
      next: (data : ProductsModel[]) => {
        //si todo esta correcto asigno los datos al dataSource
        this.dataSource = new MatTableDataSource<ProductsModel>(data);
      }
    });
  }
}
