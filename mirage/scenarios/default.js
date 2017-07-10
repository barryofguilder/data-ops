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
      mappingType: MAPPING_TYPE.RENAME,
      rawField: 'City',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressPostalCode',
      mappingType: MAPPING_TYPE.RENAME,
      rawField: 'Zip',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressState',
      mappingType: MAPPING_TYPE.RENAME,
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
      name: 'InsurancePlanType',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
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
      mappingType: MAPPING_TYPE.RENAME,
      rawField: 'AdmitSource',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'FacilityID',
      mappingType: MAPPING_TYPE.RENAME,
      rawField: 'FacilityId',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmittingDoctorID',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });
  }
}
