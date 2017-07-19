import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

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

  let conversionDate = server.create('conversion-function', {
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

  for (let i = 0; i < channels.length; i++) {
    let channel = channels[i];
    let rawAdmitDate, rawAdmitSource, rawCity, rawDob, rawFacilityId, rawLanguage;
    let rawSex, rawSt, rawZip, rawMrn, rawVisitDate, rawVisitNumber, rawFacilityName;
    let rawVisitType, rawAttendingDr;

    if (i !== channels.length - 1) {
      server.create('raw-field', { name: 'Addr1', channel });
      server.create('raw-field', { name: 'Addr2', channel });
      rawAdmitDate = server.create('raw-field', { name: 'AdmitDate', channel });
      rawAdmitSource = server.create('raw-field', { name: 'AdmitSource', channel });
      server.create('raw-field', { name: 'AdmitTime', channel });
      rawAttendingDr = server.create('raw-field', { name: 'AttendingDrId', channel });
      rawCity = server.create('raw-field', { name: 'City', channel });
      rawDob = server.create('raw-field', { name: 'DOB', channel });
      server.create('raw-field', { name: 'Email', channel });
      rawFacilityId = server.create('raw-field', { name: 'FacilityId', channel });
      rawFacilityName = server.create('raw-field', { name: 'FacilityName', channel });
      server.create('raw-field', { name: 'FirstName', channel });
      rawLanguage = server.create('raw-field', { name: 'Language', channel });
      server.create('raw-field', { name: 'LastName', channel });
      server.create('raw-field', { name: 'MiddleName', channel });
      rawMrn = server.create('raw-field', { name: 'MRN', channel });
      server.create('raw-field', { name: 'PatientClass', channel });
      rawSex = server.create('raw-field', { name: 'Sex', channel });
      rawSt = server.create('raw-field', { name: 'ST', channel });
      rawVisitDate = server.create('raw-field', { name: 'VisitDate', channel });
      rawVisitNumber = server.create('raw-field', { name: 'VisitNumber', channel });
      rawVisitType = server.create('raw-field', { name: 'VisitType', channel });
      rawZip = server.create('raw-field', { name: 'Zip', channel });
    }

    // Business Keys
    //

    let patientRawFields;

    if (rawMrn) {
      patientRawFields = [ rawMrn, rawDob ];
    }

    server.create('business-key', {
      name: 'Patient',
      rawFields: patientRawFields,
      channel
    });

    let encounterRawFields;

    if (rawVisitNumber) {
      encounterRawFields = [ rawVisitNumber, rawVisitDate, rawFacilityId ];
    }

    server.create('business-key', {
      name: 'Encounter',
      rawFields: encounterRawFields,
      channel
    });

    let facilityRawFields;

    if (rawFacilityName) {
      facilityRawFields = [ rawFacilityName, rawFacilityId ];
    }

    server.create('business-key', {
      name: 'Facility',
      rawFields: facilityRawFields,
      channel
    });

    let locationRawFields;

    if (rawFacilityName) {
      locationRawFields = [ rawFacilityName, rawFacilityId, rawVisitType ];
    }

    server.create('business-key', {
      name: 'Location',
      rawFields: locationRawFields,
      channel
    });

    let questionRawFields;

    if (rawAttendingDr) {
      questionRawFields = [ rawAttendingDr ];
    }

    server.create('business-key', {
      name: 'Question POD',
      rawFields: questionRawFields,
      channel
    });

    // Field Mappings
    //

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
      conversionFunction: conversionDate,
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
      conversionFunction: conversionDate,
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
