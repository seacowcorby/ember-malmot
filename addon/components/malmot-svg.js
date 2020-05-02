import Component from '@glimmer/component';
import {
  tracked
} from "@glimmer/tracking";
import {
  action
} from '@ember/object';
import {
  toLeft,
  toRight
} from 'ember-animated/transitions/move-over';

export default class MalmotSvgComponent extends Component {





  @tracked trackingMovement = false;
  @tracked mouseCallbacks = [];

  @action
  handleMouseDown(event) {
    //console.log("Parent Mouse down!", event)
  }

  @action
  mySpanRules({
    oldItems,
    newItems
  }) {
    if (oldItems[0] < newItems[0]) {
      return toLeft;
    } else {
      return toRight;
    }
  }


  @action
  handleMouseUp(event) {
    this.trackingMovement = false;
    //console.log("Parent Mouse up!", event);

    this.mouseCallbacks.forEach(
      registeredElement => {
        registeredElement.mouseUpCallback(event);
      }
    );

    this.mouseCallbacks = [];
  }

  @action
  handleMouseLeave(event) {
    this.trackingMovement = false;
    //console.log("Parent Mouse up!", event);

    this.mouseCallbacks.forEach(
      registeredElement => {
        registeredElement.mouseUpCallback(event);
      }
    );

    this.mouseCallbacks = [];
  }

  @action
  handleMouseMove(event) {
    this.mouseCallbacks.forEach(
      registeredElement => {
        registeredElement.mouseMoveCallback(event);
      }
    );
  }

  @action
  registerMouseMoveListener(element) {
    element.addEventListener('mousemove', this.handleMouseMove);
  }

  @action
  registerMouseDownListener(element) {
    //element.addEventListener('mousedown', this.handleMouseDown);
  }

  @action
  registerMouseUpListener(element) {
    element.addEventListener('mouseup', this.handleMouseUp);
  }

  @action
  registerMouseLeaveListener(element) {
    element.addEventListener('mouseleave', this.handleMouseLeave);
  }

  @action
  mouseDownCallback(event, sourceElement, mouseMoveCallback, mouseUpCallback) {
    this.trackingMovement = true;

    this.mouseCallbacks.push({
      element: sourceElement,
      mouseMoveCallback: mouseMoveCallback,
      mouseUpCallback: mouseUpCallback
    });
  }

}
