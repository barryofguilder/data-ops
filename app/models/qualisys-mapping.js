import DS from 'ember-data';

export default DS.Model.extend({
  mappingType: DS.attr('string'),
  value: DS.attr('string'),
  channel: DS.belongsTo('channel')
});
