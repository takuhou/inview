import Inview from './src/inview';

(() => {
  window.Inview = window.Inview || {
    start: (json) => {
      const inview = new Inview(json);
      inview.start();
    },
  };
})();
