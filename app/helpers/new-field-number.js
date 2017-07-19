import Ember from 'ember';

export function newFieldNumber(params/*, hash*/) {
  if (params[0]) {
    return params[0].get('length') + 1;
  }

  return 1;
}

export default Ember.Helper.helper(newFieldNumber);
