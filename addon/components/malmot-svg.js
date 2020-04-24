import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class MalmotSvgComponent extends Component {

  @tracked trackingMovement = false;
  @tracked mouseMoveCallbacks = [];
  @tracked mouseUpCallbacks = [];
  @tracked mouseCallbacks = [];

  @action
  handleMouseDown(event) {
    console.log("Parent Mouse down!", event)
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
    // this.mouseUpCallbacks.forEach(callback => {
    //   callback(event);
    // });
    // this.mouseMoveCallbacks = [];
    // this.mouseUpCallbacks = [];
  }

  @action
  handleMouseMove(event) {
    this.mouseCallbacks.forEach(
      registeredElement => {
        registeredElement.mouseMoveCallback(event);
      }
    );

    // if (this.trackingMovement) { 
    //   // console.log("Parent Mouse move!", event);
    //   this.mouseMoveCallbacks.forEach(callback => {
    //     callback(event);
    //   });
    // }
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
  mouseDownCallback( event, sourceElement, mouseMoveCallback, mouseUpCallback) {
    this.trackingMovement = true;

    this.mouseMoveCallbacks[sourceElement] = mouseMoveCallback;
    this.mouseUpCallbacks[sourceElement] = mouseUpCallback;

    this.mouseCallbacks.push({
      element: sourceElement,
      mouseMoveCallback: mouseMoveCallback,
      mouseUpCallback: mouseUpCallback
    });
    // element.addEventListener('mousemove', this.handleMouseMove);
    // element.addEventListener('mouseup', this.handleMouseUp);
  }

}
