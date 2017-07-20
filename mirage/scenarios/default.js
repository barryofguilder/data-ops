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
      server.create('raw-field', { name: 'Addr1', columnNumber: 11, channel });
      server.create('raw-field', { name: 'Addr2', columnNumber: 12, channel });
      rawAdmitDate = server.create('raw-field', { name: 'AdmitDate', columnNumber: 17, channel });
      rawAdmitSource = server.create('raw-field', { name: 'AdmitSource', columnNumber: 19, channel });
      server.create('raw-field', { name: 'AdmitTime', columnNumber: 18, channel });
      rawAttendingDr = server.create('raw-field', { name: 'AttendingDrId', columnNumber: 20, channel });
      rawCity = server.create('raw-field', { name: 'City', columnNumber: 13, channel });
      rawDob = server.create('raw-field', { name: 'DOB', columnNumber: 10, channel });
      server.create('raw-field', { name: 'Email', columnNumber: 21, channel });
      rawFacilityId = server.create('raw-field', { name: 'FacilityId', columnNumber: 22, channel });
      rawFacilityName = server.create('raw-field', { name: 'FacilityName', columnNumber: 23, channel });
      server.create('raw-field', { name: 'FirstName', columnNumber: 6, channel });
      rawLanguage = server.create('raw-field', { name: 'Language', columnNumber: 16, channel });
      server.create('raw-field', { name: 'LastName', columnNumber: 8, channel });
      server.create('raw-field', { name: 'MiddleName', columnNumber: 7, channel });
      rawMrn = server.create('raw-field', { name: 'MRN', columnNumber: 4, channel });
      server.create('raw-field', { name: 'PatientClass', columnNumber: 5, channel });
      rawSex = server.create('raw-field', { name: 'Sex', columnNumber: 9, channel });
      rawSt = server.create('raw-field', { name: 'ST', columnNumber: 14, channel });
      rawVisitDate = server.create('raw-field', { name: 'VisitDate', columnNumber: 3, channel });
      rawVisitNumber = server.create('raw-field', { name: 'VisitNumber', columnNumber: 2, channel });
      rawVisitType = server.create('raw-field', { name: 'VisitType', columnNumber: 1, channel });
      rawZip = server.create('raw-field', { name: 'Zip', columnNumber: 15, channel });
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
