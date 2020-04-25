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


  get wrapperX() {
    if (this.animatePosition === 0) {
      // console.log("Returning 11");
      return 11;
    } else {
      // console.log("Returning 51");
      return 51;
    }
  }

  @action
  moveButtonHandler() {
    this.animatePosition = 1 - this.animatePosition;
  }
}
