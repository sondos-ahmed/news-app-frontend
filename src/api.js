import axios from "axios";

const newsApp = axios.create({
  baseURL: "https://helpful-foal-tie.cyclic.app/",
});

export function getAllTopics() {
  return newsApp.get(`api/topics`);
}

export function getAllArticles() {
  return newsApp.get(`api/articles`).then(({ data: { articles } }) => {
    return articles;
  });
}

export function getHotArticle() {
  return newsApp
    .get(`api/articles`, { params: { sort_by: "votes" } })
    .then(({ data: { articles } }) => {
      console.log(articles);
      return articles[0];
    });
}

export function getLatestTechArticle() {
  return newsApp
    .get(`api/articles`, {
      params: { sort_by: "created_at", topic: "coding" },
    })
    .then(({ data: { articles } }) => {
      return articles[0];
    });
}

export function getLatestSportsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sort_by: "created_at", topic: "football" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
export function getMostRatedSportsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sort_by: "votes", topic: "football" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
export function getOrderedCookingsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sort_by: "created_at", topic: "cooking" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
///////// Ticket 5  View an individual article///////////

export function getArticleById(article_id) {
  return newsApp.get(`api/articles/${article_id}`).then((res) => {
    const newArticle = { ...res.data.article };
    const date = new Date(newArticle.created_at);
    newArticle.created_at = date.toDateString();

    return newArticle;
  });
}

///////// Ticket 6  View a list of comments associated with an article///////////
export function getArticleComments(article_id) {
  return newsApp
    .get(`api/articles/${article_id}/comments`)
    .then(({ data: comments }) => {
      let newComments = [...comments.comments];
      newComments = newComments.map((comment) => {
        const eachComment = { ...comment };
        const commentDate = eachComment.created_at;
        const date = new Date(commentDate);
        eachComment.created_at = date.toDateString();
        return eachComment;
      });
      return newComments;
    });
}

/////////Ticket 7 Vote on an article/////////////////////

export function patchArticleVotes(article_id) {
  return newsApp
    .patch(`/api/articles/${article_id}`, { inc_votes: 1 })
    .then((res) => {});
}
