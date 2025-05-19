✅ 讀寫 `localStorage` / API

一開始 load 時取資料，或者儲存資料

✅ API 請求 / fetch

向後端 server 拿資料

✅ 設定事件監聽器（如：`window.addEventListener`）

例如監聽鍵盤按鍵、scroll、resize

✅ 設定計時器（如 `setInterval`, `setTimeout`）

自動刷新、倒數計時功能

✅ 清理副作用（component unmount 時執行）

釋放資源，例如移除監聽、清除計時器

✅ 根據 state 變化執行某些邏輯

例如當 `count` 改變時自動執行某段程式碼


📌 基本語法

    useEffect(() => {
      // 這裡寫副作用邏輯（讀資料、fetch、setInterval 等等）
    }, [依賴變數]);

💡 例子：畫面載入時 fetch 一次 API

    useEffect(() => {
      fetch('https://api.example.com/data')
        .then(res => res.json())
        .then(data => setData(data));
    }, []); // [] 代表只跑一次（就似 componentDidMount）

💡 例子：state 改變就執行

    useEffect(() => {
      console.log('count changed:', count);
    }, [count]); // 每次 count 改變，就會重新執行

💡 例子：設 interval，並記得清理 （React 格式）

    import { useState, useEffect } from 'react';
	
	function Counter() {
	  const [count, setCount] = useState(0);

	  useEffect(() => {
	    const timer = setInterval(() => {
	      setCount(prev => prev + 1); // ✅ 正確：用 prev 拿最新值
	    }, 1000);

	    return () => clearInterval(timer); // ✅ 清除 interval
	  }, []); // ✅ 只做一次（component mount 時）

	  return <h1>{count}</h1>;
	}

-   `useEffect(..., [])` 表示只會在**component mount 時執行一次**
    
-   當中開咗一個 `setInterval`，所以每 1 秒都會做一次 `setCount(...)`
    
-   **而 `return () => clearInterval(...)` 只係註冊咗 cleanup function，唔會即刻執行！**
    
-   呢個 cleanup function 會喺：
    
    -   component 被移除（unmount）時執行
        
    -   或者依賴變數改變時執行（如果你有依賴）
