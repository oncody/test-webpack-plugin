if(module.hot) {
  console.log('hot');
  module.hot.accept();
}

require('./aaaa');

function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');

  element.innerHTML = 'sllo webpack';

  btn.innerHTML = 'Click me and check the console!';

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if(module.hot) {
  console.log('hot');
  module.hot.accept();
}