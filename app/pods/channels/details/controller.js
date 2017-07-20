import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  error: Ember.inject.service(),

  fieldToBeEdited: null,
  showAllRecords: true,
  showErrors: Ember.computed.alias('error.showErrors'),

  allRecordsButtonClass: Ember.computed('showAllRecords', function() {
    return this.get('showAllRecords') ? 'active' : null;
  }),
  mappedRecordsButtonClass: Ember.computed('showAllRecords', function() {
    return this.get('showAllRecords') ? null : 'active';
  }),

  filteredBusinessKeys: Ember.computed('showAllRecords', 'model.businessKeys', function() {
    let businessKeys = this.get('model.businessKeys');

    if (this.get('showAllRecords')) {
      return businessKeys;
    }

    return businessKeys.filter((field) => {
      return Ember.isPresent(field.get('mappingType'));
    });
  }),

  filteredPatientRawFields: Ember.computed('showAllRecords', 'model.patientFields', function() {
    let patientFields = this.get('model.patientFields');

    if (this.get('showAllRecords')) {
      return patientFields;
    }

    return patientFields.filter((field) => {
      return Ember.isPresent(field.get('rawField.id'));
    });
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

  filteredEncounterRawFields: Ember.computed('showAllRecords', 'model.encounterFields', function() {
    let encounterFields = this.get('model.encounterFields');

    if (this.get('showAllRecords')) {
      return encounterFields;
    }

    return encounterFields.filter((field) => {
      return Ember.isPresent(field.get('rawField.id'));
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

  actions: {
    toggleRawErrors() {
      this.toggleProperty('error.showErrors');
    }
  }
});
