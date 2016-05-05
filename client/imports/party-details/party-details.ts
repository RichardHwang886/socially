import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Parties} from '../../../collections/parties.ts';
import {RouterLink} from 'angular2/router';
import {RequireUser} from 'angular2-meteor-accounts-ui';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {CanActivate, ComponentInstruction} from 'angular2/router';
import {MeteorComponent} from 'angular2-meteor';

function checkPermissions(instruction: ComponentInstruction) {
  var partyId = instruction.params['partyId'];
  var party = Parties.findOne(partyId);
  var b= (party && party.owner == Meteor.userId());
  if (!b)
    alert('Sorry you have no right !!');
  return b;

}

@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [RouterLink]
})

@RequireUser()
@CanActivate(checkPermissions)

export class PartyDetails extends MeteorComponent {
  party: Party;
  constructor(params: RouteParams) {
    super();

     var partyId = params.get('partyId');
    // this.party = Parties.findOne(partyId);

    this.subscribe('party', partyId, () => {
      this.party = Parties.findOne(partyId);
    }, true);
  }
  // saveParty(party) {
  //   Parties.update(party._id, {
  //     $set: {
  //       name: party.name,
  //       description: party.description,
  //       location: party.location
  //     }
  //   });
  // }
  saveParty(party) {
    if (Meteor.userId()) {
      Parties.update(party._id, {
        $set: {
          name: party.name,
          description: party.description,
          location: party.location
        }
      });
    } else {
      alert('Please log in to change this party');
    }
  }
}