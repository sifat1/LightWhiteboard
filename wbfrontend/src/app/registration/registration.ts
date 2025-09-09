import { Component } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-registration',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
    registrationform : FormGroup = new FormGroup(
      {
        username : new FormControl(),
        email : new FormControl(),
        password : new FormControl(),
        conpassword : new FormControl(),
        photo : new FormControl()
      }
    );

    handleSubmit()
    {
      if(this.registrationform.valid)
      {
        var formValues = this.registrationform.value;
        console.log(formValues);
      }
      
    }
}
