import { Meteor } from 'meteor/meteor';
//import {Parties} from '../collections/parties.ts';
import {loadParties} from './load-parties.ts';
import './parties.ts';

Meteor.startup(loadParties);

// Meteor.startup(() => {
//   // code to run on server at startup
// });

