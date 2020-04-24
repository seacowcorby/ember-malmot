import Component from '@glimmer/component';
import {
  tracked
} from "@glimmer/tracking";
import {
  action
} from '@ember/object';

export default class MalmotCircleComponent extends Component {

 
  @tracked
  mousedownXLocation = null;
  @tracked
  mousedownYLocation = null;
  mouseIsDown = false;
  minimumDragDistance = 2;
  dragging = false;

  @tracked xOffset = 0;
  @tracked yOffset = 0;

  constructor() {
    super(...arguments);
    this.initialX = Number(this.args.x);
    this.initialY = Number(this.args.y);
  }

  get cx() {
    return this.initialX - this.xOffset;
  }


  get cy() {
    return this.initialY  - this.yOffset;
  }


  @action 
  handleClick(event) { 

    if (this.args.onClick) {
      //   this.args.onClick(event);
    } else {
      console.log("No registered click handler!");
    }
  }



  @action
  handleMouseDown(event) {

    this.args.svg.mouseDownCallback(event, this, this.mouseMoveCallback, this.mouseUpCallback);

    this.mousedownXLocation = event.clientX;
    this.mousedownYLocation = event.clientY;
    this.mouseIsDown = true; 
    console.log("Mouse down!", event)
  }

  @action
  handleMouseUp(event) {
    // this.mouseIsDown = false;
    // this.dragging = false;
    // console.log('Circle Mouse Up!', event);
  }

  @action
  mouseUpCallback(event) {
    this.mouseIsDown = false;
    this.dragging = false;
    console.log('Circle Mouse Up!', event);
  }

  @action
  handleDrag(event) {
    console.log('Dragging!', event);
  }

  @action
  mouseMoveCallback(event) {
    console.log('Circle callback called');
    let mousemoveXLocation = event.clientX;
    //let mousemoveYLocation = event.clientY;

    if (this.mouseIsDown === true) {
      let horizontalDistanceTravelled = this.mousedownXLocation - mousemoveXLocation;
      if (Math.abs(horizontalDistanceTravelled) > this.minimumDragDistance) {
        this.dragging = true;
      }
      if (this.dragging) {
        this.xOffset = horizontalDistanceTravelled;
        //console.log(`Dragged ${horizontalDistanceTravelled} pixels`)
      }
    }
  }

  @action 
  handleMouseMove(event) {
    // let mousemoveXLocation = event.clientX;
    // //let mousemoveYLocation = event.clientY;

    // if (this.mouseIsDown === true) {
    //   let horizontalDistanceTravelled = this.mousedownXLocation - mousemoveXLocation;
    //   if (Math.abs(horizontalDistanceTravelled) > this.minimumDragDistance) {
    //     this.dragging = true;
    //   }
    //   if (this.dragging) {
    //     this.xOffset = horizontalDistanceTravelled;
    //     //console.log(`Dragged ${horizontalDistanceTravelled} pixels`)
    //   }
    // }
  }

  @action
  registerMouseClickListener(element) {

    element.addEventListener('click', this.handleClick);
  }

  @action
  registerMouseDragListener(element) {
    element.addEventListener('drag', this.handleDrag);
  }

  @action
  registerMouseMoveListener(element) {
    element.addEventListener('mousemove', this.handleMouseMove);
  }

  @action
  registerMouseDownListener(element) {
    element.addEventListener('mousedown', this.handleMouseDown);
  }

  @action
  registerMouseUpListener(element) {
    element.addEventListener('mouseup', this.handleMouseUp);
  }
}
