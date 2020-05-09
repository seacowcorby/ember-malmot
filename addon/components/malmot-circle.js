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

  /**
   * Draggable dscribes if a shape can be dragged. The default is
   * false.
   */
  @tracked draggable = false;

  /** When a click event is present as well as the shape being draggable
   * we can set the maximum number of pixels a shape can move before
   * the onClick action is no longer fired. maxClickMove holds the
   * maximum drag distance before the click event is disabled
   */
  @tracked maxClickMoveEnabled = false;
  @tracked maxClickMove = 0;


  /**
   * These are the location where the last mouse down event ocurred if
   * it was on this shape. This can be used to calculate drag distances
   */
  @tracked
  mousedownXLocation = null;
  @tracked
  mousedownYLocation = null;

  /** Indicates if the mouse is currently down. This is used to
   * determine what we should do with the dragging. This should be
   * replaced with mouse move button information eventually. */
  mouseIsDown = false;

  /** MinimumDragDistance adds a bit of stickiness to the drag. It will only shift
   * the item once the drag has move more than this distance. In combination with
   * maxClickMove, this helps stop inadvertent drag events when a click is performed.
   */
  minimumDragDistance = 2;

  /** Indicates if the shape is currently being dragged */
  dragging = false;

  /*
  * The beacon describes the source of the shape
  * when it first appears. These are used if a shape
  * is being animated int.
  */
  @tracked beaconX = 0;
  @tracked beaconY = 0;
  @tracked beaconR = 0;



  /*
  * Store X and Y maintain location for dragging. Specifically, they store the
  * location of X and Y when a drag event started, and then reset the the end
  * of the drag event
  *
  * xOffset and yOffset and the drag offsets from storeX and storeY
   */
  @tracked storeX = 0;
  @tracked storeY = 0;
  @tracked xOffset = 0;
  @tracked yOffset = 0;

  /**
   * Should the initial positioning be animated or not. If it is, it will
   * animate in from the beacon location, otherwise it just appears in location
   */
  @tracked animateInitial = false;
  @tracked animateChanges = false;

  /** Paramater initialisation
   *
   * When the component is created, the geometric values are pushed in
   * via the args.
   *
   * If we are animating the shape into place, default values are loaded
   * into initX, then a job sets it to the contents of args.x. Animation will the make it move into position. See the initialiseForEntryAnimation
   * method for how this is done.
   */

  @tracked initX = 0;
  @tracked initY = 0;
  @tracked initR = 10;


  constructor() {
    super(...arguments);

    if (this.args.draggable === "true") {
      this.draggable = true;
    } else {
      this.draggable = false;
    }

    if (this.args.animateInitialPosition === "true") {
      this.animateInitial = true;
      // have to animate all changes if animate in
      this.animateChanges = true;
    } else {
      this.animateInitial = false;
    }

    if (this.args.animatePositionChange === "true") {
      this.animateChanges = true;
    } else {
      this.animateChanges = false;
    }


    if(this.args.maxClickMove) {
      this.maxClickMoveEnabled = true
      this.maxClickMove = Number(this.args.maxClickMove)
    }

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



  /**
   * This is the content that actually gets pushed into the template.
   */
  get bubble() {
    return {
      myX: this.cx,
      myY: this.cy,
      myR: this.r
    };
  }

  /* Sprite animation */
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
  }
  /* End sprite animation */

  // on initial load, get default values first, then after a delay, load the args
  @action
  initialiseForEntryAnimation() {
    if (this.animateInitial) {
      this.initX = 0;
      this.initY = 0;
      this.initR = 10;

      scheduleOnce('afterRender', this, function () {
        this.initX = this.args.x;
        this.initY = this.args.y;
        this.initR = this.args.r;
      });
    } else {
      this.initX = this.args.x;
      this.initY = this.args.y;
      this.initR = this.args.r;
    }
  }



  get cx() {
    if (this.args.draggable) {
      return this.storeX + this.xOffset;
    } else {
      if (this.animateChanges ) {
        if (this.animateInitial) {
          return this.initX;
        } else {
          return this.args.x;
        }

      } else {
        return this.initX;
      }
    }
  }

  get r() {
      if (this.animateChanges ) {
        if (this.animateInitial) {
          return this.initR;
        } else {
          return this.args.r;
        }
      }
      else {
        return this.initR;
      }
  }


  get cy() {
    if (this.args.draggable) {
      return this.storeY + this.yOffset;
    } else {
      if (this.animateChanges ) {
        if (this.animateInitial) {
          return this.initY;
        } else {
          return this.args.y;
        }

      } else {
        return this.initY;
      }
    }
  }


  @action
  handleClick(event) {
    if (this.maxClickMoveEnabled) {
      return;
    }

    if (this.args.onClick) {
        this.args.onClick(event);
    } else {
      console.log("No registered click handler!");
    }
  }

  handleClickWithMaxMove(event) {
    if (this.args.onClick) {
      if (Math.abs(this.xOffset) > this.maxClickMove ||
        Math.abs(this.yOffset) > this.maxClickMove) {
        console.log("Swallowing click, moved too far")
      }
      else {
        this.args.onClick(event);
      }
    } else {
      console.log("No registered click handler!");
    }
  }


  @action
  handleMouseDown(event) {

    /* If the shape is draggable, we need to register with the parent
       svg in order to handle drag actions if the mouse moves beyond the
       context of this shape.
     */
    if (this.draggable) {
      this.args.svg.mouseDownCallback(event, this, this.mouseMoveCallback, this.mouseUpCallback);
    }

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

    if (this.maxClickMoveEnabled) {
      this.handleClickWithMaxMove(event);
    }

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
