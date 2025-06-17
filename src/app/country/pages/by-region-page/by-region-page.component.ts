import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../component/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region|null>(null);

  selectRegion( region: Region ) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({request}) => {

      if( !request.region ) return of([]);
      return this.countryService.searchByRegion(request.region)
    }
  });
}
