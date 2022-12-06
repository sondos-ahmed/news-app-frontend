import { useEffect } from "react";
import { getArticleById } from "../api.js";
import { useParams } from "react-router-dom";

function Article() {
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then(({ data: { article } }) => {
      console.log(article);
    });
  }, [article_id]);
  return (
    <section>
      <h3>Under development </h3>
    </section>
  );
}

export default Article;
