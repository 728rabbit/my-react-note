## fetch  寫法

    import { useState, useEffect } from 'react';
    
    function PostList() {
      const [posts, setPosts] = useState([]);
    
      useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts') // 模擬 API
          .then(res => res.json())
          .then(data => {
            setPosts(data.slice(0, 5)); // 只取前5個
          })
          .catch(err => {
            console.error('Fetch error:', err);
          });
      }, []);
    
      return (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      );
    }
    
    export default PostList;


## axios 寫法 (npm install axios)

    import axios from 'axios';
    import { useState, useEffect } from 'react';
    
    function PostList() {
      const [posts, setPosts] = useState([]);
    
      useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(res => {
            setPosts(res.data.slice(0, 5));
          })
          .catch(err => {
            console.error('Axios error:', err);
          });
      }, []);
    
      return (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      );
    }
