import { useEffect, useState } from "react";
import { getArticleById } from "../api.js";
import { useParams } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState();
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then(({ data: { article } }) => {
      console.log(article);
      setArticle(article);
    });
  }, [article_id]);
  return (
    <section>
      <h3>{article?.title}</h3>
    </section>
  );
}

export default Article;
