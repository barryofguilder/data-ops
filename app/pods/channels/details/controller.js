import Ember from 'ember';

export default Ember.Controller.extend({
  fieldToBeEdited: null,
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
  })
});
