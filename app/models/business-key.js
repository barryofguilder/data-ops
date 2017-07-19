import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  rawFields: DS.hasMany('raw-field'),
  literalValue: DS.attr('string'),

  channel: DS.belongsTo('channel'),

  mappingDisplay: Ember.computed('literalValue', 'rawFields.@each.name', function() {
    let literalValue = this.get('literalValue');

    if (Ember.isPresent(literalValue)) {
      return literalValue;
    }

    if (this.get('rawFields.length') === 0) {
      return '';
    }

    if (this.get('rawFields.length') === 1) {
      return this.get('rawFields.firstObject.name');
    }

    let rawFields = this.get('rawFields');
    let inputs = '';

    rawFields.forEach((rawField) => {
      if (Ember.isPresent(inputs)) {
        inputs += ', ';
      }

      inputs += rawField.get('name');
    });

    return `Combine(${inputs})`;
  })
});
