import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const Post = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updatePost = async () => {
    props.setProgress(10);
    
    const url = `http://localhost:8004/api/v1/posts/${props.pageSize}/${page}`;
    setLoading(true);
    
    try {
      const response = await fetch(url, {
        method: 'GET', // or any other HTTP method you're using
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
  
      props.setProgress(30);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const parseData = await response.json();
      
      props.setProgress(70);
      setArticles(parseData.data.articles);
      setTotalResults(parseData.data.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state here
      setLoading(false);
    }
  }
  
  useEffect(() => {
    updatePost()
  }, [])

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `http://localhost:8004/api/v1/posts/${props.pageSize}/${nextPage}`;
    setPage(nextPage);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const parseData = await response.json();
      
      // Concatenate new articles with existing ones
      setArticles(articles.concat(parseData.data.articles));
    } catch (error) {
      console.error('Error fetching data for next page:', error);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center text-5xl mb-6 mt-8 font-serif text-blue-800">Posts </h1>
      <div className="row">
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {articles.map((element) => {
                return (
                  element ?
                    <div className="col-md-4" key={element.url}>
                      <PostItem
                        title={element.title}
                        description={element.description}
                        url={element.urlToImage ? element.urlToImage : "https://abbeysecurity.co.uk/wp-content/uploads/2018/01/Cyber-Security-Hacker.jpeg"}
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                    : null
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );

}

Post.defaultProps = {
  pageSize: 5
}

Post.propTypes = {
  pageSize: PropTypes.number
}

export default Post;
