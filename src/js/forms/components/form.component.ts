import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'form-test',
	templateUrl : './templates/forms/form.component.html'
})

export class FormComponent {
	complexForm : FormGroup;

	constructor(formBuilder: FormBuilder) {
		this.complexForm = formBuilder.group({
			'firstName' : '',
			'lastName': '',
			'gender' : 'Female',
			'hiking' : false,
			'running' : false,
			'swimming' : false
		})
	}

	submitForm(value: any): void{
		console.log('Reactive Form Data: ');
		console.log(value);
	}
}
