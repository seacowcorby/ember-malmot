import Component from '@glimmer/component';
import {
  action
} from '@ember/object';

export default class CircleWrapper extends Component {

  someText = 'someText';

  @action
  clickHandler(event) {
    alert("You clicked the circle.");
    // We now have access to `this`
  }
}
