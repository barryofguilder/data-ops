import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';
import QUALISYS_MAPPING_TYPE from 'data-ops/utils/qualisys-mapping-constants';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.create('conversion-function', {
    name: 'date_YYYYMMDDhhmm(<input>)',
    multipleParams: false
  });

  let conversionFunction1 = server.create('conversion-function', {
    name: 'date_YYYYMMDDhhmmss(<input>)',
    multipleParams: false
  });

  server.create('conversion-function', {
    name: 'Combine(<input1>, <input2>, ...)',
    multipleParams: true
  });

  let channels = server.createList('channel', 6);

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressCity',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'City',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressPostalCode',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'Zip',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressState',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'ST',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'DateOfBirth',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: 'DOB',
      conversionFunction: conversionFunction1,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'EthnicGroup',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'Gender',
      rawField: 'Sex',
      mappingType: MAPPING_TYPE.CODESET,
      codeset: 'AdministrativeSex',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'InsurancePlanType',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PatientClass',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PatientNameFamily',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PatientNameGiven',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PatientNameSecond',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PrimaryLanguage',
      rawField: 'Language',
      mappingType: MAPPING_TYPE.CODESET,
      codeset: 'Language',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmitDateTime',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: 'AdmitDate',
      conversionFunction: conversionFunction1,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmitSource',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'AdmitSource',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmittingDoctorID',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'DischargesDateTime',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'FacilityID',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'FacilityId',
      channel
    });

    // Don't add the Qualisys mappings for the last channel
    if (i < channels.length-1){
      server.create('qualisys-mapping', {
        mappingType: QUALISYS_MAPPING_TYPE.H_CAT_AGE,
        channel
      });
    }
  }

  // Clear out mappings for the last channel
  let fieldMappings = server.db.fieldMappings.where({ channelId: channels.length });
  for (let i = 0; i < fieldMappings.length; i++) {
    server.db.fieldMappings.update(fieldMappings[i].id, {
      mappingType: null,
      rawField: null,
      codeset: null,
      conversionFunction: null,
      customMapping: null
    });
  }
}
