import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../services/shops.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ng4LoadingSpinnerService } from '../../../../../node_modules/ng4-loading-spinner';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  categories;
  category = {
    img: String,
    creationDate: String,
    _id: String,
    name: String,
    categoryIdentity: String
  };
  shops;
  shopsCount;
  shop = {
    name: '',
    logo: '',
    genderTarget: '',
    _id: '',
  };
  editMode = false;
  logo: FileList;
  cover: FileList;
  showLoader: boolean;

  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private shopsService: ShopsService, private route: ActivatedRoute, private modalService: NgbModal) { }

  fileChangeEventLogo(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    this.logo = files;
  }

  fileChangeEventCover(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    this.cover = files;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.shopsService.categoryDetails(id).subscribe((data) => {
          this.categories = data;
          console.log('test', data, '' + this.categories.categoryIdentity === 'cloths');
        });
      }
    );

    // fetch shops count
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.shopsService.getShopsCount(id)
          .subscribe(
            (shops: any) => {
              // console.log(shops);
              this.shopsCount = shops['count'];
            },
            (error) => console.log(error)
          );
      }
    );

    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.shopsService.getShops(id).subscribe(
          (shops: any) => {
            // console.log(shops);
            this.shops = shops;
          },
          (error) => console.log(error)
        );
      }
    );
  }

  onAddShop(editMode) {
    this.showLoader = true;
    if (editMode) {
      this.route.params.subscribe(
        (params) => {
          const id = params['id'];
          this.shopsService.updateShop(this.shop, id, this.logo, this.cover).subscribe(
            shop => {
              for (let i = 0; i < this.shops.length; i++) {
                if (this.shops[i].id === this.shop._id) {
                  this.shops.splice(i, 1);
                }
              }
              this.shops.push(shop);
              this.showLoader = false;
              $('input.form-control,input.form-control-file').val('');
              $('#dropdownBasic1').text('Type');
            }
          );
        }
      );
    } else {
      this.route.params.subscribe(
        (params) => {
          const id = params['id'];
          this.shopsService.addShop(this.shop, id, this.logo, this.cover).subscribe(
            (shop) => {
              // this.shop = shop;
              this.shops.push(this.shop);
              console.log('Added');
              this.showLoader = false;
              $('input.form-control,input.form-control-file').val('');
              $('#dropdownBasic1').val('Type');
            }
          );
        }
      );
    }
  }

  onEditShop(shop, content) {
    this.editMode = true;
    this.shop = shop;
    this.modalService.open(content, {
      centered: true
    });
  }

  addShop(content) {
    this.editMode = false;
    this.shop = {
      name: '',
      logo: '',
      genderTarget: '',
      _id: '',
    };
    this.modalService.open(content, {
      size: 'lg',
      centered: true
    });
  }

  chosseType(type) {
    console.log(type);
    this.shop.genderTarget = type;
  }
}
