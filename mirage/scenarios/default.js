import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let channels = server.createList('channel', 6);

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];

    server.create('field-mapping', {
      name: 'PatientBK',
      mappingType: MAPPING_TYPE.CUSTOM,
      customMapping: 'CONCAT_WS(\'\',MRN,DOB)',
      channel
    });

    server.create('field-mapping', {
      name: 'AddressCity',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'City',
      channel
    });

    server.create('field-mapping', {
      name: 'AddressPostalCode',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'Zip',
      channel
    });

    server.create('field-mapping', {
      name: 'AddressState',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: 'ST',
      channel
    });

    server.create('field-mapping', {
      name: 'DateOfBirth',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: 'DOB',
      conversionFunction: 'date_YYYYMMDDhhmmss(<input>)',
      channel
    });

    server.create('field-mapping', {
      name: 'EthnicGroup',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });

    server.create('field-mapping', {
      name: 'InsurancePlanType',
      mappingType: MAPPING_TYPE.NOT_MAPPED,
      channel
    });
  }
}
