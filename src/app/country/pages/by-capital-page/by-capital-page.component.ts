import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from "../../component/search-input/search-input.component";
import { CountryListComponent } from "../../component/country-list/country-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  onSeach( value: string ) {
    console.log(value);
  }


}
