import Ember from 'ember';

export function incrementIndex(params/*, hash*/) {
  return params[0] + 1;
}

export default Ember.Helper.helper(incrementIndex);
