import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  multipleParams: DS.attr('boolean', { default: false })
});
