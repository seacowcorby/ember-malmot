import Controller from '@ember/controller';
import {
  action
} from '@ember/object';
import {
  tracked
} from "@glimmer/tracking";
import {
  filterBy
} from '@ember/object/computed';

export default class AnimatemovementController extends Controller {

  someText = 'someText';

  @tracked animatePosition = 0;

  get simpleY() {
    return 11 + (5 * this.animatePosition);
  }

  get simpleX() {
    return 11 + (40 * this.animatePosition);
  }

  get simpleR() {
    return 10 + (15 * this.animatePosition);
  }

  @action
  moveButtonHandler() {
    this.animatePosition = 1 - this.animatePosition;
  }

  get afghanCode() {
    if (this.model.codes && this.model.codes.length > 0) {
      console.log(this.model);
      return this.model.codes[0].alpha_3;
    } else {
      return "Not loaded properly";
    }
  }

  get threeCountries() {
    return this.countryData.filter((c) => {
      if (c.code) {
        return c.code.numeric == 108 || c.code.numeric == 222 || c.code.numeric == 807;
      } else {
        return false;
      }
    });
  }

  get countryData() {
    const countryString = 'Country/Area';

    let codeIndex = {};
    this.model.codes.forEach(code => {
      codeIndex[code.numeric] = code;
    });

    let countryPopulations = this.model.populations.filter((pop) => {
      return pop['Type'] === countryString;
    });

    let countryResult = [];

    countryPopulations.forEach(country => {
      let countryCode = country['Country code'];
      let code = codeIndex[countryCode];
      countryResult.push({
        code: code,
        populations: country
      });
    });

    return countryResult;
  }
}
