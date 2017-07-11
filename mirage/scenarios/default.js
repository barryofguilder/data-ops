import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let channels = server.createList('channel', 6);

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'PatientBK',
      mappingType: MAPPING_TYPE.CUSTOM,
      customMapping: 'CONCAT_WS(\'\',MRN,DOB)',
      channel
    });

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
      conversionFunction: 'date_YYYYMMDDhhmmss(<input>)',
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
      mappingType: MAPPING_TYPE.CODESET,
      codeset: 'Language',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmitDateTime',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: 'AdmitDate',
      conversionFunction: 'date_YYYYMMDDhhmmss(<input>)',
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
  }

  // Clear out mappings for the last channel
  let mappings = server.db.fieldMappings.where({ channelId: channels.length });
  for (let i = 0; i < mappings.length; i++) {
    server.db.fieldMappings.update(mappings[i].id, {
      mappingType: null,
      rawField: null,
      codeset: null,
      conversionFunction: null,
      customMapping: null
    });
  }
}
