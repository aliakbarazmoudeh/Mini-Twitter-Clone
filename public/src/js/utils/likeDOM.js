const likeDOM = (e) => {
  e.preventDefault();
  let likeSVG;
  e.target.classList.length === 0
    ? (likeSVG = e.target.parentElement)
    : (likeSVG = e.target);
  let status = likeSVG.classList.contains('alreadyLiked');
  let countDOM = likeSVG.nextSibling.nextSibling;
  let countNum = Number(likeSVG.nextSibling.nextSibling.textContent);
  if (status) {
    likeSVG.classList.remove('alreadyLiked');
    likeSVG.classList.add('notLiked');
    countDOM.textContent = countNum - 1;
  } else {
    likeSVG.classList.remove('notLiked');
    likeSVG.classList.add('alreadyLiked');
    countDOM.textContent = countNum + 1;
  }
};

export default likeDOM;
