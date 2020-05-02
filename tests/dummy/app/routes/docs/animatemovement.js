import Route from '@ember/routing/route';
import {
  json,
  csv
} from 'd3-fetch';



export default class AnimatemovementRoute extends Route {

  model() {

    // this works
    const codePromise = json('/resources/iso_3166_country_codes.json');
    const populationPromise = csv('/resources/population.csv');

    return Promise.all([codePromise, populationPromise]).then(promiseArr => {
      return {
        codes: promiseArr[0],
        populations: promiseArr[1]
      }
    });


  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }
}
