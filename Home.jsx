import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);

  async function getAPIData() {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        props.search ? props.search : props.q
      }&pageSize=12&page=${page}&language=${
        props.language
      }&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`
    );
    response = await response.json();
    if (response.articles) {
      setArticles(response.articles.filter((x) => x.title !== "[Removed]"));
      setTotalResults(response.totalResults);
    }
  }
  async function fetchMoreData() {
    setPage(page + 1);
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        props.search ? props.search : props.q
      }&pageSize=12&page=${page}&language=${
        props.language
      }&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`
    );
    response = await response.json();
    if (response.articles) {
      setArticles(
        articles.concat(
          response.articles.filter((x) => x.title !== "[Removed]")
        )
      );
    }
  }
  useEffect(() => {
    getAPIData()
  },[props])
  return (
    <div className="container-fluid">
      <h5 className="background text-center p-2 my-2 text-capitalize">
        {props.search ? props.search : props.q} News Articles
      </h5>
      <InfiniteScroll
        className="scroller-component"
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={
          <div className="my-5 py-5 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all. please, wait for more results...</b>
          </p>
        }
      >
        <div className="row">
          {articles.map((item, index) => {
            return (
              <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <NewsItem
                  title={item.title}
                  source={item.source.name}
                  date={item.publishedAt}
                  pic={item.urlToImage}
                  description={item.description}
                  url={item.url}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
