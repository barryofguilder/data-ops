import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  columnNumber: DS.attr('number'),
  channel: DS.belongsTo('channel')
});
