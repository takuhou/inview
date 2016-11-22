import Measure from './measure';

export default class Inview {
  constructor(json) {
    this.element = document.querySelector(json.selector);
    this.callback = json.callback;
  }

  start() {
    const measure = new Measure(this.element, this.callback);
    measure.start();
  }
}
