import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../component/search-input/search-input.component";
import { CountryListComponent } from "../../component/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  //TRABAJA CON OBSERVABLE
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {

      if( !request.query ) return of([]);
      return this.countryService.searchByCountry(request.query)
    }
  });


 }
