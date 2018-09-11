import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-offers-details',
  templateUrl: './offers-details.component.html',
  styleUrls: ['./offers-details.component.css']
})
export class OffersDetailsComponent implements OnInit {
  offers;
  offer: {
    brandName: String,
    imgs: [String],
    creationDate: String,
    _id: String,
    title: String,
    desc: String,
    discound: String,
    pricepreDisc: String,
    pricepostDisc: String,
    avaliable: Boolean,
    __v: Number,
  };
  constructor(private http: HttpClient, private route: ActivatedRoute, private offersService: OffersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.offersService.offerDetails(id).subscribe((data) => {
          this.offers = data;
          console.log(data);
        });
      }
    );
  }

}
