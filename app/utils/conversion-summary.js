import Ember from 'ember';

export default function(conversionFunction, fieldName, fieldParams) {
  if (Ember.isEmpty(conversionFunction) || Ember.isEmpty(conversionFunction.get('id')) || Ember.isEmpty(fieldName)) {
    return '';
  }

  if (conversionFunction.get('multipleParams')) {
    return displayForMultipleParams(conversionFunction.get('name'), fieldParams);
  }

  //try {
    return conversionFunction.get('name').replace('<input>', fieldName);
  // } catch(e) {
  //   return '';
  // }
}

function displayForMultipleParams(conversionFunctionName, fieldParams) {
  if (Ember.isEmpty(fieldParams)) {
    return '';
  }

  let inputs = '';

  fieldParams.forEach((fieldParam) => {
    if (Ember.isPresent(inputs)) {
      inputs += ', ';
    }

    inputs += fieldParam;
  });

  return conversionFunctionName.replace('<input1>, <input2>, ...', inputs);
}
