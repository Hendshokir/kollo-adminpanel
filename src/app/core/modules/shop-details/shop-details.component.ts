import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.less']
})
export class ShopDetailsComponent implements OnInit {
  products;
  addedProduct = {
    title: '',
    price: '',
    avaliablecolor: '',
    avaliablesizes: '',
    desc: ''
  };

  product = {
    title: '',
    price: '',
    avaliablecolor: '',
    avaliablesizes: '',
    desc: ''
  };

  editMode = false;
  imgs: FileList;
  showLoader: boolean;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const marketId = params['id'];
        console.log(marketId);
        this.productsService.getProducts(marketId).subscribe((data) => {
          this.products = data;
          console.log(this.products);
        });
      }
    );
  }

  fileChangeEvent(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    this.imgs = files;
  }

  addProduct(content) {
    this.editMode = false;
    this.addedProduct = {
      title: '',
      price: '',
      avaliablesizes: '',
      avaliablecolor: '',
      desc: '',
      // _id: '',
    };
    this.modalService.open(content, {
      centered: true
    });
  }

  editProduct(product , content) {
    this.editMode = true;
    this.addedProduct = product;
    this.modalService.open(content, {
      centered: true
    });
  }

  onAdded() {
    this.showLoader = true;
    this.route.params.subscribe(
      (params) => {
        const marketId = params['id'];
        console.log(marketId);
        if (this.editMode) {
          this.productsService.editProduct(this.addedProduct, this.imgs, marketId).subscribe((data) => {
            // this.products = data;
            // console.log(this.products);

            for (let i = 0; i < this.products.length; i++) {
              // if (this.products[i].id === this.addedProduct._id) {
              //   this.products.splice(i, 1);
              // }
            }
            this.products.push(this.addedProduct);
            this.showLoader = false;
            $('input.form-control,textarea.form-control,input.form-control-file').val('');
          });
        } else {
          this.productsService.addProduct(this.addedProduct, this.imgs, marketId).subscribe((data) => {
            // this.products = data;
            this.products.push(this.addedProduct);
            console.log(this.products);
            this.showLoader = false;
            $('input.form-control,textarea.form-control,input.form-control-file').val('');
          });
        }
      }
    );
  }
}
