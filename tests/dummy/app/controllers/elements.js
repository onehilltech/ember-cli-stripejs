import Controller from '@ember/controller';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";

export default class ElementsController extends Controller {
  @tracked
  clearCard;

  @action
  didCardChange (card) {
    console.log (card);
  }

  @action
  doClearCard () {
    this.clearCard = true;
  }
}
