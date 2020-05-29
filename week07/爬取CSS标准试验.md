```
const standards = [];
[...document.getElementById('container').children]
  .filter((e) => e.getAttribute('data-tag').includes('css'))
  .forEach((e) => {
    standards.push({
      tag: e.getAttribute('data-tag'),
      profile: e.children[0].innerText,
      name: e.children[1].innerText,
      url: e.children[1].children[0].href,
    });
  });
  JSON.stringify(standards,null,2);
```
```
let iframe = document.createElement('iframe');
document.body.innerHTML = '';
document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    };
    element.addEventListener(event, handler);
  });
}

void (async function () {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, 'load');
  }
})();
```
