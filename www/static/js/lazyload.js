let images = document.getElementById('article').getElementsByTagName('img');
// let comments = document.getElementById('comments');
// let lazyloadDOM = Array.from(images).concat(comments);
// console.log(images);
let lazyloadDOM = Array.from(images);
let onscrollF = function(event) {
  console.log(images);
  let scrollTop = window.scrollY;
  let innerHeight = window.innerHeight;
  let scrollBottomHeight = scrollTop + innerHeight;
  for (let i = 0; i < lazyloadDOM.length; i++) {
    let dom = lazyloadDOM[i];
    console.log(dom)
    if (dom.offsetTop < scrollBottomHeight + 300) {
      let src = dom.getAttribute('data-src');
      if (src) {
        dom.setAttribute('src', src);
      }
      let className = dom.getAttribute('class');
      if (className) {
        className += ' load';
      }
      else {
        className = 'load';
      }
      dom.setAttribute('class', className);
      lazyloadDOM.splice(i, 1);
      i = 0;
      if (lazyloadDOM.length === 0) {
        document.removeEventListener('scroll', onscrollF);
      }
    } else {
      break;
    }
  }
};
document.addEventListener('scroll', onscrollF);
onscrollF();