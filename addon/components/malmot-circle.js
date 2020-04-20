import Component from '@glimmer/component';
import {
  tracked
} from "@glimmer/tracking";
import {
  action
} from '@ember/object';

export default class MalmotCircleComponent extends Component {


  @action
  handleClick(event) {

    if (this.args.onClick) {
      this.args.onClick(event);
    } else {
      console.log("No registered click handler!");
    }
  }

  @action
  handleMouseDown(event) {
    console.log("Mouse down!", event)
  }

  @action
  handleMouseUp(event) {
    console.log('Mouse Up!', event);
  }

  @action
  handleMouseMove(event) {
    console.log('Mouse Up!', event);
  }

  @action
  registerMouseClickListener(element) {
    element.addEventListener('click', this.handleClick);
  }

  @action
  registerMouseMoveListener(element) {
    //element.addEventListener('click', this.handleMouseMove);
  }

  @action
  registerMouseDownListener(element) {
    //element.addEventListener('click', this.handleMouseDown);
  }

  @action
  registerMouseUpListener(element) {
    //element.addEventListener('click', this.handleMouseUp);
  }
}
