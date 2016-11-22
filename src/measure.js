import Utils from './utils';

export default class Measure {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;
    this.rect = Utils.clientRect(this.element);
    this.width = this.rect.width;
    this.height = this.rect.height;
    this.x = this.rect.left;
    this.y = this.rect.top;
  }

  start() {
    const that = this;
    setInterval(() => {
      that.rect = this.element.getBoundingClientRect();
      that.x = that.rect.left;
      that.y = that.rect.top;
      const ratio = (that.scrollAmount('x') * that.scrollAmount('y')) / 100;
      that.callback(ratio);
    }, 100);
  }

  scrollAmount(axis) {
    const viewportSize = Utils.viewportSize;
    let scroll = 0;
    let scrollAddBounds = 0;
    let scrollAddDisplay = 0;
    let frameSize = 0;
    let scrollAddBoundsAddFrameSize = 0;
    let percentage = 0;

    if (axis === 'x') {
      // スクロール量の取得
      scroll = document.documentElement.scrollLeft || document.body.scrollLeft;
      // スクロール量(px) + 表示領域topから広告枠topまでの距離(px)
      scrollAddBounds = scroll + this.x;
      // スクロール量(px) + 表示領域サイズ(px)
      scrollAddDisplay = scroll + viewportSize.width;
      // 枠の大きさ
      frameSize = this.width;
    } else if (axis === 'y') {
      // スクロール量の取得
      scroll = document.documentElement.scrollTop || document.body.scrollTop;
      // スクロール量(px) + 表示領域topから広告枠topまでの距離(px)
      scrollAddBounds = scroll + this.y;
      // スクロール量(px) + 表示領域サイズ(px)
      scrollAddDisplay = scroll + viewportSize.height;
      // 枠の大きさ
      frameSize = this.height;
    }

    // スクロール量(px) + 表示領域topから広告表示枠topまで(px) + 広告枠のsize(px)
    scrollAddBoundsAddFrameSize = scrollAddBounds + frameSize;
    if (scrollAddBounds <= scrollAddDisplay && scroll <= scrollAddBoundsAddFrameSize) {
      const percentageA = ((scrollAddDisplay - scrollAddBounds) / frameSize) * 100;
      const percentageB = ((scrollAddBoundsAddFrameSize - scroll) / frameSize) * 100;

      if (percentageA > 100) {
        percentage = percentageB;
      }

      if (percentageB > 100) {
        percentage = percentageA;
      }

      if (percentageA > 100 && percentageB > 100) {
        percentage = 100;
      }
    }
    return percentage;
  }
}
