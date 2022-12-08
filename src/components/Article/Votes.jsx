import { patchArticleVotes } from "../../api.js";

function Votes({ article_id, setShow, rating, setRating }) {
  function handelRating() {
    setRating((currentRating) => {
      const newRating = currentRating + 1;
      return newRating;
    });
    patchArticleVotes(article_id)
      .then(() => {
        setShow(false);
      })
      .catch(() => {
        setShow(true);
      });
  }
  return (
    <button type='button' onClick={handelRating}>
      <span className='star  border p-2'>{rating} &#9733;</span>{" "}
    </button>
  );
}

export default Votes;
