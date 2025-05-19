## 用 npm安裝

    npm install react-router-dom@6

## 基本範例

    import React from 'react';
    import {
      BrowserRouter as Router,
      Routes,
      Route,
      Link,
    } from 'react-router-dom';
    
    function Home() {
      return <h2>首頁</h2>;
    }
    
    function About() {
      return <h2>關於我們</h2>;
    }
    
    function Contact() {
      return <h2>聯絡我們</h2>;
    }
    
    function App() {
      return (
        <Router>
          <nav>
            {/* 用 Link 代替 a tag，避免全頁刷新 */}
            <Link to="/">首頁</Link> |{' '}
            <Link to="/about">關於</Link> |{' '}
            <Link to="/contact">聯絡</Link>
          </nav>
    
          <hr />
    
          {/* Routes 內放不同 Route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      );
    }
    
    export default App;

## 重點

-   `BrowserRouter`（簡稱 `Router`）包裹整個應用，管理路由狀態
    
-   `Link` 元素用嚟導航，會用 JS 控制，無刷新頁面
    
-   `Routes` 裡面包 `Route`，定義 URL 路徑對應顯示嘅元件
    
-   `Route` 用 `element` 屬性指定要渲染嘅組件
