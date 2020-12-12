import { Component, OnInit } from '@angular/core';
import { FilterInteractionService } from '../filter-interaction.service';

interface IHoliday{
  name: string,
  country: string,
  startDate: Date,
  endDate: Date,
  price: number,
  maxPlaces:  number,
  description: string,
  imgSrc: string,
  rating: number;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  public holidays: IHoliday[];
  public stars: number[] = [];
  public locations: string[] = [];
  public priceRangeMax: number = Number.MIN_VALUE;
  public priceRangeMin: number = Number.MAX_VALUE;
  public dateRangeMax: Date = new Date(1970, 0, 1);
  public dateRangeMin: Date = new Date(2030, 0, 1);

  private starsChecked: number[] = [];
  private locationsChecked: string[] = [];
  private priceRangeMaxChecked: number = Number.MIN_VALUE;
  private priceRangeMinChecked: number = Number.MAX_VALUE;;
  private dateRangeMaxChecked: Date = new Date(1970, 0, 1);
  private dateRangeMinChecked: Date = new Date(2030, 0, 1);

  constructor(private _interactionFilterService: FilterInteractionService) {

   }

  ngOnInit(): void {
    this._interactionFilterService.holidays$.subscribe(
      holidays => {this.setHolidays(holidays)}
    )
  }

  setHolidays(holidays: IHoliday[]){
    this.holidays = holidays;
    this.setAllAttributes();
  }

  setAllAttributes(){
    this.resetToDefault();

    for(let holiday of this.holidays){
      if(this.stars.indexOf(holiday.rating) === -1){
        this.stars = [...this.stars, holiday.rating]
      }
      if(this.locations.indexOf(holiday.name) === -1){
        this.locations = [...this.locations, holiday.country]
      }
      if(holiday.price > this.priceRangeMax){
        this.priceRangeMax = holiday.price;
      }
      if(holiday.price < this.priceRangeMin){
        this.priceRangeMin = holiday.price;
      }
      if(holiday.startDate < this.dateRangeMin){
        this.dateRangeMin = holiday.startDate;
      }
      if(holiday.endDate > this.dateRangeMax){
        this.dateRangeMax = holiday.endDate;
      }
      this.stars.sort()
    }
    // tests
    // console.log(this.stars);
    // console.log(this.locations);
    // console.log(this.priceRangeMax);
    // console.log(this.priceRangeMin);
    // console.log(this.dateRangeMax);
    // console.log(this.dateRangeMin);
    
  }

  resetToDefault(){
  this.stars = [];
  this.locations = [];
  this.priceRangeMax = Number.MIN_VALUE;
  this.priceRangeMin = Number.MAX_VALUE;
  this.dateRangeMax = new Date(1970, 0, 1);
  this.dateRangeMin = new Date(2030, 0, 1);
  }

  updateLocations(event){
    if(!event.srcElement.checked){
      this.locationsChecked = this.locationsChecked.filter(name => name !== event.srcElement.attributes.name);
    }else{
      this.locationsChecked.push(event.srcElement.attributes.name);
    }
    this._interactionFilterService.sendFilteredLocations(this.locationsChecked)
  }

  updateStars(event){
    if(!event.srcElement.checked){
      this.starsChecked = this.starsChecked.filter(star => star !== event.srcElement.attributes.name);;
    }else{
      this.starsChecked.push(event.srcElement.attributes.name);
    }
    this._interactionFilterService.sendFilteredStars(this.starsChecked)
  }
 
}
