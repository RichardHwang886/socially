import 'reflect-metadata';
import {Component} from 'angular2/core';
import {Parties} from '../../../collections/parties.ts';
import {PartiesForm} from '../parties-form/parties-form.ts';
import {Mongo} from 'meteor/mongo';
import {RouterLink} from 'angular2/router';
import {LoginButtons} from 'angular2-meteor-accounts-ui/login-buttons';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'parties-list',
  templateUrl: '/client/imports/parties-list/parties-list.html',
  styleUrls:['/client/imports/parties-list/login-buttons.less'],
  directives: [PartiesForm, RouterLink, LoginButtons]
  // directives: [PartiesForm, RouterLink]
})

//export class PartiesList {
export class PartiesList extends MeteorComponent{
  parties: Mongo.Cursor<Party>;

  constructor() {
    //this.parties = Parties.find();
    super();
    this.subscribe('parties', () => {
      
      this.parties = Parties.find();
    }, true);
  }

  removeParty(party) {
    Parties.remove(party._id);
  }
  
   search(value: string) {
    if (value) {
      // 查詢時，加入.* .*，即等於SQL 的like
      // ex:  a.*  表示a開頭
      //      .*a.* 表示含a所有的字串
      var sQry ={'$regex': value};
      this.parties = Parties.find({ location: sQry });
    } else {
      this.parties = Parties.find();
    }
  }
}