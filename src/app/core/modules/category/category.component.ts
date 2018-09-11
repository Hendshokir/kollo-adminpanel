import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../services/shops.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = [];
  constructor(private shopsService: ShopsService) { }

  ngOnInit() {
    // fetch all categories
    this.shopsService.getCategories()
    .subscribe(
      (categories: any) => {
        // console.log(users);
        this.categories = categories;
      },
      (error) => console.log(error)
    );
  }
}
