import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MalmotRectangleComponent extends Component {


  @action
  handleClick(event) {
     alert('Click!');
}
  }
