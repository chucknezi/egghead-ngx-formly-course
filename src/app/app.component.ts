import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    id: 123123,
    firstname: 'Juri',
    age: 34,
    nationId: 1,
    cityId: 1
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname'
      }
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Age'
      }
    },
    {
      key: 'nationId',
      type: 'select', // <select>
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations()
      }
    },
    {
      key: 'cityId',
      type: 'select', // <select>
      templateOptions: {
        label: 'Cities',
        options: []
      },
      expressionProperties: {
        'templateOptions.disabled': model => !model.nationId,
        'model.cityId': '!model.nationId ? null : model.cityId'
      },
      hideExpression: model => !model.nationId,
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form
            .get('nationId')
            .valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(nationId => this.dataService.getCities(nationId))
            );
        }
      }
    }
  ];

  constructor(private dataService: DataService) {}

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
