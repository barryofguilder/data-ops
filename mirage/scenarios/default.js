import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';
import QUALISYS_MAPPING_TYPE from 'data-ops/utils/qualisys-mapping-constants';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // Conversion Functions
  //

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

  // Channels
  //

  let channels = server.createList('channel', 6);

  // Field Mappings
  //

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];
    let rawAdmitDate, rawAdmitSource, rawCity, rawDob, rawFacilityId, rawLanguage, rawSex, rawSt, rawZip;

    if (i !== channels.length - 1) {
      server.create('raw-field', { name: 'Addr1', channel });
      server.create('raw-field', { name: 'Addr2', channel });
      rawAdmitDate = server.create('raw-field', { name: 'AdmitDate', channel });
      rawAdmitSource = server.create('raw-field', { name: 'AdmitSource', channel });
      server.create('raw-field', { name: 'AdmitTime', channel });
      rawCity = server.create('raw-field', { name: 'City', channel });
      rawDob = server.create('raw-field', { name: 'DOB', channel });
      server.create('raw-field', { name: 'Email', channel });
      rawFacilityId = server.create('raw-field', { name: 'FacilityId', channel });
      server.create('raw-field', { name: 'FirstName', channel });
      rawLanguage = server.create('raw-field', { name: 'Language', channel });
      server.create('raw-field', { name: 'LastName', channel });
      server.create('raw-field', { name: 'MiddleName', channel });
      server.create('raw-field', { name: 'MRN', channel });
      server.create('raw-field', { name: 'PatientClass', channel });
      rawSex = server.create('raw-field', { name: 'Sex', channel });
      rawSt = server.create('raw-field', { name: 'ST', channel });
      rawZip = server.create('raw-field', { name: 'Zip', channel });
    }

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressCity',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: rawCity,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressPostalCode',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: rawZip,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'AddressState',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: rawSt,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.PATIENT,
      name: 'DateOfBirth',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: rawDob,
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
      rawField: rawSex,
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
      rawField: rawLanguage,
      mappingType: MAPPING_TYPE.CODESET,
      codeset: 'Language',
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmitDateTime',
      mappingType: MAPPING_TYPE.FUNCTION,
      rawField: rawAdmitDate,
      conversionFunction: conversionFunction1,
      channel
    });

    server.create('field-mapping', {
      fieldType: FIELD_TYPE.ENCOUNTER,
      name: 'AdmitSource',
      mappingType: MAPPING_TYPE.PASSTHROUGH,
      rawField: rawAdmitSource,
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
      rawField: rawFacilityId,
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
