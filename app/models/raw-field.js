import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  columnNumber: DS.attr('number'),
  isMapped: DS.attr('boolean'),
  channel: DS.belongsTo('channel'),

  status: Ember.computed('isMapped', function() {
    return this.get('isMapped') ? 'Mapped' : 'Unmapped';
  })
});
