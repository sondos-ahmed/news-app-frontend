import axios from "axios";
import { useEffect, useState } from "react";

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
    .get(`api/articles`, { params: { sorted_by: "votes" } })
    .then(({ data: { articles } }) => {
      return articles[0];
    });
}

export function getLatestTechArticle() {
  return newsApp
    .get(`api/articles`, {
      params: { sorted_by: "created_at", topic: "coding" },
    })
    .then(({ data: { articles } }) => {
      return articles[0];
    });
}

export function getLatestSportsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sorted_by: "created_at", topic: "football" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
export function getMostRatedSportsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sorted_by: "votes", topic: "football" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
export function getOrderedCookingsArticles() {
  return newsApp
    .get(`api/articles`, {
      params: { sorted_by: "created_at", topic: "cooking" },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
}
