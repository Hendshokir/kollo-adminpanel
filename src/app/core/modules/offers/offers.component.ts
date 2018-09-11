import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  offers = [];
  offersCount: Number;
  offer = {
    brandName: '',
    imgs: FileList,
    creationDate: '',
    _id: '',
    title: '',
    desc: '',
    discound: '',
    pricepreDisc: '',
    pricepostDisc: '',
    avaliable: '',
  };
  editMode = false;
  imgs: FileList;
  showLoader: boolean;

  fileChangeEvent(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    this.imgs = files;
  }

  constructor(private http: HttpClient, private offersService: OffersService) { }

  ngOnInit() {

    // fetch all offers
    this.offersService.getUsers()
    .subscribe(
      (offers: any) => {
        // console.log(users);
        this.offers = offers;
      },
      (error) => console.log(error)
    );

    // fetch Offers count
    this.offersService.getOffersCount()
    .subscribe(
      (offers: any) => {
        // console.log(users);
        this.offersCount = offers['count'];
      },
      (error) => console.log(error)
    );
  }

  onAddOffer(editMode) {
    this.showLoader = true;
    if (editMode) {
      this.offersService.updateOffer(this.offer, this.imgs).subscribe(
        data => {
          for (let i = 0; i < this.offers.length; i++) {
             if (this.offers[i].id === this.offer._id) {
              this.offers.splice(i, 1);
            }
          }
          this.offers.push(data);
          console.log('offer updates');
          this.showLoader = false;
          $('input.form-control,input.form-control-file').val('');
        },
        error => { console.log(error); },
      );
    } else {
      this.offersService.addOffer(this.offer, this.imgs).subscribe(
        (offer) => {
          // this.offer = offer;
          this.offers.push(offer);
          console.log('Added');
          this.showLoader = false;
          $('input.form-control,input.form-control-file').val('');
        }
      );
    }
  }

  onEditOffer(offer) {
    this.editMode = true;
    this.offer = offer;
  }

  // onDeleteOffer(id: Number) {
  //   this.offersService.deleteOffer(id).subscribe(data => {
  //     console.log(data );
  //     for (let i = 0; i < this.offers.length; i++) {

  //       if (this.offers[i]._id === id) {
  //         this.offers.splice(i, 1);
  //       }
  //     }
  //   });
  // }

}
