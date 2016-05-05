import 'reflect-metadata';
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {Parties} from '../../../collections/parties.ts';
import {MeteorComponent} from 'angular2-meteor';
//import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Meteor} from 'meteor/meteor';

@Component({
  selector: 'parties-form',
  templateUrl: '/client/imports/parties-form/parties-form.html'
})

//@InjectUser('currentUser')
//@InjectUser(undefined)

export class PartiesForm extends MeteorComponent {
//export class PartiesForm {
  //currentUser= Meteor.user();
  //currentUser:  Meteor.User;

  //export class PartiesForm {
  partiesForm: ControlGroup;

  constructor() {
      super();
    let fb = new FormBuilder();

    this.partiesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
       'public': [false]
    });
   
    //InjectUser('currentUser');
    //this.currentUser= Meteor.user();
   // console.log('login user:'+this.currentUser);
  }

  // ngOnInit() {
  //   this.currentUser = Meteor.user();
  //   console.log('login user(onInit):' + this.currentUser);
  // }
  // ngAfterViewInit() {
  //   // Component views are initialized
  //   this.currentUser = Meteor.user();
  //   console.log('login user(ngAfterViewInit):' + this.currentUser);
  // }
  // ngAfterContentChecked() {
  //   // Component content has been Checked
  //   //20160429 在這才會抓得到
  //    this.currentUser = Meteor.user();
  //   console.log('login user(ngAfterContentChecked):' + this.currentUser);
  // }
  // addParty(party) {
  //     if (this.partiesForm.valid) {
  //         Parties.insert({
  //             name: party.name,
  //             description: party.description,
  //             location: party.location
  //         });

  //         (<Control>this.partiesForm.controls['name']).updateValue('');
  //         (<Control>this.partiesForm.controls['description']).updateValue('');
  //         (<Control>this.partiesForm.controls['location']).updateValue('');
  //     }
  // }

  addParty(party) {
    if (this.partiesForm.valid) {
      if (Meteor.userId()) {
        Parties.insert({
          name: party.name,
          description: party.description,
          location: party.location,
           'public': party.public,
          owner: Meteor.userId()
        });

        (<Control>this.partiesForm.controls['name']).updateValue('');
        (<Control>this.partiesForm.controls['description']).updateValue('');
        (<Control>this.partiesForm.controls['location']).updateValue('');
      } else {
        alert('Please log in to add a party');
      }
    }
  }
}