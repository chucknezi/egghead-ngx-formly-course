import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
 form = new FormGroup({});
 model = {
   firstName: 'Juri',
   age: 34
 };
 fields: FormlyFieldConfig[] = [
   {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname'
      }

   }

 ];

 onSubmmit({valid, value}){
   console.log(value);
 }
}
