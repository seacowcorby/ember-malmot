import Component from '@glimmer/component';
import {
  tracked
} from "@glimmer/tracking";
import {
  action
} from '@ember/object';
import moveSVG from 'ember-animated/motions/move-svg';
import {
  parallel
} from 'ember-animated';
// import {
//   toLeft,
//   toRight
// } from 'ember-animated/transitions/move-over';
import {
  run,
  scheduleOnce
} from '@ember/runloop';

export default class MalmotCircleComponent extends Component {


  @tracked
  mousedownXLocation = null;
  @tracked
  mousedownYLocation = null;
  mouseIsDown = false;
  minimumDragDistance = 2;
  dragging = false;

  @tracked beaconX = 0;
  @tracked beaconY = 0;
  @tracked beaconR = 0;

  @tracked storeX = 0;
  @tracked storeY = 0;
  @tracked xOffset = 0;
  @tracked yOffset = 0;

  constructor() {
    super(...arguments);
    if (this.args.position) {
      this.initialX = Number(this.args.position.x);
      this.initialY = Number(this.args.position.y);

    } else {
      this.initialX = Number(this.args.x);
      this.initialY = Number(this.args.y);

    }
    this.storeX = this.initialX;
    this.storeY = this.initialY;
  }

  get bubble() {
    return {
      myX: this.cx,
      myY: this.cy,
      myR: this.r
    };
  }

  /// animation stuff
  * moveThem(context) {

    let {
      insertedSprites,
      keptSprites,
      removedSprites
    } = context;




    // eslint-disable-next-line require-yield
    keptSprites.forEach(
      parallel(
        moveSVG.property('cx'),
        moveSVG.property('cy'),
        moveSVG.property('r'),
      )
    );

    // insertedSprites.forEach(
    // moveSVG.property('cx'),
    // moveSVG.property('cy'),
    // moveSVG.property('r'),
    // );
  }




  @tracked initX = 0;
  @tracked initY = 0;
  @tracked initR = 10;

  /// end animation stuff

  // on initial load, get default values first, then after a delay, load the args
  @action
  initialiseForEntryAnimation() {

    this.initX = 0;
    this.initY = 0;
    this.initR = 10;

    scheduleOnce('afterRender', this, function () {
      this.initX = this.args.x;
      this.initY = this.args.y;
      this.initR = this.args.r;
    });


  }


  get cx() {
    if (this.args.draggable) {
      return this.storeX + this.xOffset;
    } else {
      return this.initX;
      // return this.args.x;
    }
  }

  get r() {
    return this.initR;
    // return this.args.r;
  }


  get cy() {
    if (this.args.draggable) {
      return this.storeY + this.yOffset;
    } else {
      return this.initY;
      // return this.args.y;
    }
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
    // console.log("Mouse down!", event)
  }

  @action
  handleMouseUp(event) {}

  @action
  mouseUpCallback(event) {
    this.mouseIsDown = false;
    this.dragging = false;
    this.storeX += this.xOffset;
    this.storeY += this.yOffset;
    this.xOffset = 0;
    this.yOffset = 0;

    console.log('Circle Mouse Up!', event);
  }

  @action
  handleDrag(event) {
    console.log('Dragging!', event);
  }

  @action
  mouseMoveCallback(event) {
    let mousemoveXLocation = event.clientX;
    let mousemoveYLocation = event.clientY;

    if (this.mouseIsDown === true) {
      let horizontalDistanceTravelled = mousemoveXLocation - this.mousedownXLocation;
      if (Math.abs(horizontalDistanceTravelled) > this.minimumDragDistance) {
        this.dragging = true;
      }
      if (this.dragging) {
        this.xOffset = horizontalDistanceTravelled;
      }
    }
    if (this.mouseIsDown === true) {
      let verticalDistanceTravelled = mousemoveYLocation - this.mousedownYLocation;
      if (Math.abs(verticalDistanceTravelled) > this.minimumDragDistance) {
        this.dragging = true;
      }
      if (this.dragging) {
        this.yOffset = verticalDistanceTravelled;
      }
    }
  }

  @action
  handleMouseMove(event) {

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
