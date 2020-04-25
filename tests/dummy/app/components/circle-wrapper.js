import Component from '@glimmer/component';
import {
  action
} from '@ember/object';
import {
  tracked
} from "@glimmer/tracking";

export default class CircleWrapper extends Component {

  someText = 'someText';

  @action
  clickHandler(event) {
    alert("You clicked the circle.");
    // We now have access to `this`
  }

  @tracked animatePosition = 0;

  get wrapperY() {
    return 11 + (5 * this.animatePosition);
  }

  get wrapperX() {
    return 11 + (40 * this.animatePosition);
  }

  @action
  moveButtonHandler() {
    this.animatePosition = 1 - this.animatePosition;
  }
}
