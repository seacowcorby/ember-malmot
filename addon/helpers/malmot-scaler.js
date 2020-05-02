import {
  helper
} from '@ember/component/helper';

export default helper(function malmotScaler(params /*, hash*/ ) {
  let [scaler, input] = params;

  return scaler(input);
  //return 42;
});
