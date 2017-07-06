import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  shouldReloadRecord(/*store, snapshot*/) {
    return true;
  }
});
