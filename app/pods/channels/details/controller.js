import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  fieldToBeEdited: null,
  qualisysMappingToBeEdited: null,
  showAllRecords: true,

  allRecordsButtonClass: Ember.computed('showAllRecords', function() {
    return this.get('showAllRecords') ? 'active' : null;
  }),
  mappedRecordsButtonClass: Ember.computed('showAllRecords', function() {
    return this.get('showAllRecords') ? null : 'active';
  }),

  filteredPatientFields: Ember.computed('showAllRecords', 'model.patientFields', function() {
    let patientFields = this.get('model.patientFields');

    if (this.get('showAllRecords')) {
      return patientFields;
    }

    return patientFields.filter((field) => {
      return Ember.isPresent(field.get('mappingType'));
    });
  }),

  filteredEncounterFields: Ember.computed('showAllRecords', 'model.encounterFields', function() {
    let encounterFields = this.get('model.encounterFields');

    if (this.get('showAllRecords')) {
      return encounterFields;
    }

    return encounterFields.filter((field) => {
      return Ember.isPresent(field.get('mappingType'));
    });
  }),

  filteredQualisysMappings: Ember.computed('model.qualisysMappings.@each.isNew', function() {
    return this.get('model.qualisysMappings').filterBy('isNew', false);
  }),
  qualisysMappingsSort: ['mappingType'],
  sortedQualisysMappings: Ember.computed.sort('filteredQualisysMappings', 'qualisysMappingsSort'),

  actions: {
    addQualisysMapping() {
      let channel = this.get('model');
      let mapping = this.get('store').createRecord('qualisys-mapping', { channel });

      this.set('qualisysMappingToBeEdited', mapping);
    },

    removeQualisysMapping(mapping) {
      mapping.destroyRecord();
    }
  }
});
