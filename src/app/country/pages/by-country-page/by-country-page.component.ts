import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from "../../component/search-input/search-input.component";
import { CountryListComponent } from "../../component/country-list/country-list.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent { }
