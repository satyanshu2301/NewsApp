import React from "react";

export default function NewsItem(props) {
  return (
    <div className="card">
      <img
        src={props.pic ? props.pic : "/images/noimage.jpeg"}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className="items">
          <p>{props.source}</p>
          <p>{new Date(props.date).toLocaleDateString()}</p>
        </div>
        <hr />
        <p className="card-text">{props.description}</p>
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary background mybtn text-dark w-100"
        >
          Read Full Articles
        </a>
      </div>
    </div>
  );
}
