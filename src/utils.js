export default class Utils {
  static clientRect(element) {
    const rect = element.getBoundingClientRect();
    return rect;
  }
  static get viewportSize() {
    const size = {};
    size.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    size.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return size;
  }
}
