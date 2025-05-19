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


## 1. 路由參數

有時你想用網址帶參數，例如顯示不同產品或用戶詳情：

    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
    
    function Product() {
      const { id } = useParams();  // 取得網址參數
      return <h2>產品編號: {id}</h2>;
    }
    
    function App() {
      return (
        <Router>
          <nav>
            <Link to="/">首頁</Link> |{' '}
            <Link to="/product/1">產品1</Link> |{' '}
            <Link to="/product/2">產品2</Link>
          </nav>
    
          <Routes>
            <Route path="/" element={<h2>首頁</h2>} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Router>
      );
    }
    
    export default App;

## 2. 導向 Redirect（React Router v6 用 `Navigate`）

    import { Navigate } from 'react-router-dom';
    
    function PrivatePage({ isLoggedIn }) {
      if (!isLoggedIn) {
        return <Navigate to="/" replace />;  // 導向首頁
      }
      return <h2>私密頁面</h2>;
    }

## 3. 巢狀路由 (Nested Routes)

    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
    
    function Dashboard() {
      return (
        <div>
          <h2>管理後台</h2>
          <nav>
            <Link to="stats">統計</Link> | <Link to="settings">設定</Link>
          </nav>
          <Outlet />  {/* 這裡會顯示子路由元件 */}
        </div>
      );
    }
    
    function Stats() {
      return <h3>統計數據頁</h3>;
    }
    
    function Settings() {
      return <h3>設定頁</h3>;
    }
    
    function App() {
      return (
        <Router>
	       <nav>
			<Link  to="/">首頁</Link>
			<Link  to="/dashboard">dashboard</Link>
		   </nav>
	       <Routes>
            <Route path="/" element={<h2>首頁</h2>} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="stats" element={<Stats />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      );
    }
    
    export default App;
