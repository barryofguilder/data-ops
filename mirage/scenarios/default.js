import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let channels = server.createList('channel', 6);

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];

    server.create('patient-field', {
      name: 'PatientBK',
      mappingType: MAPPING_TYPE.CUSTOM,
      customMapping: 'CONCAT_WS(\'\',MRN,DOB)',
      channel
    });

    server.create('patient-field', {
      name: 'AddressCity',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'City',
      channel
    });

    server.create('patient-field', {
      name: 'AddressPostalCode',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'Zip',
      channel
    });

    server.create('patient-field', {
      name: 'AddressState',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'ST',
      channel
    });

    server.create('patient-field', {
      name: 'DateOfBirth',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: 'DOB',
      conversionFunction: 'date_YYYYMMDDhhmmss(<input>)',
      channel
    });

    server.create('patient-field', {
      name: 'EthnicGroup',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });

    server.create('patient-field', {
      name: 'InsurancePlanType',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });
  }
}
