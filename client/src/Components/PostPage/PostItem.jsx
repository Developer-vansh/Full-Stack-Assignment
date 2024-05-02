import React from 'react';

const PostItem = (props) => {
  let { title, desc, url, newsurl, author, date, source } = props;
  return (
    <div className="container my-3">
      <div className="card border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img src={url} className="card-img-top object-cover h-64 sm:h-48 hover:opacity-75 transition duration-300 ease-in-out" alt="Post Image" />

        <div className="card-body">
          <h5 className="card-title text-lg font-bold hover:text-blue-600 transition duration-300 ease-in-out">{title}</h5>
          <p className="card-text">{desc}</p>
          <p className="card-text text-sm text-gray-600">
            By {!author ? 'unknown' : author} on {new Date(date).toDateString()}
          </p>
          <a
            href={newsurl}
            target="_blank"
            rel="noopener noreferrer"
            className=" mt-4 btn btn-sm btn-primary hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
