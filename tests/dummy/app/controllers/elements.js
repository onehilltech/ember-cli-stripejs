import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ElementsController extends Controller {
  @action
  didCardChange (card) {
    console.log (card);
  }
}
