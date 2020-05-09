import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class DocsMalmotcircleController extends Controller {

  someText = 'someText';

  @action
  clickHandler(event) {
    alert("You clicked the circle.");
    // We now have access to `this`
  }

  @tracked animatePosition = 0;

  get componentY() {
    return 11 + (5 * this.animatePosition);
  }

  get componentX() {
    console.log("Updating X value");
    return 20 + (40 * this.animatePosition);
  }

  get componentR() {
    return 10 + (15 * this.animatePosition);
  }

  @action
  moveButtonHandler() {
    this.animatePosition = 1 - this.animatePosition;
  }
}
