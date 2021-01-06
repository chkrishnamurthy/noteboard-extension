const dom = document.querySelector("body");
const Instance = new Mark(dom);

function debounce(callback) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...args);
    }, 200);
  };
}

var options = {
  className: "markstyle",
  separateWordSearch: true,
  filter: function (node, term, totalCounter, counter) {
    console.log(document.getSelection());
    document.getSelection();
    return true;
  },
};

const selectedText = () => {
  Instance.unmark();
  const term = document.getSelection().toString();
  Instance.mark(term, options);
};

let bounceBack = debounce(selectedText);
document.addEventListener("selectionchange", () => {
  bounceBack();
});
