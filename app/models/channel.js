import DS from 'ember-data';
import Ember from 'ember';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('string'),
  businessKeys: DS.hasMany('business-key'),
  fields: DS.hasMany('field-mapping'),
  patientFields: Ember.computed.filterBy('fields', 'fieldType', FIELD_TYPE.PATIENT),
  encounterFields: Ember.computed.filterBy('fields', 'fieldType', FIELD_TYPE.ENCOUNTER),
  rawFileDelimeter: DS.attr('string')
});
