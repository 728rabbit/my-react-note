當多個元件需要共用同一筆資料時，直接用 props 傳來傳去會很麻煩。此時可以用：

-   **提升狀態（Lifting State Up）**：把狀態放到最近的共同父元件，再由父元件透過 props 傳下去， 類似 class extend 概念。
    
-   **Context API**：React 內建的跨元件資料共享方法，不用層層傳 props。

---

    import React, { createContext, useContext, useState } from 'react';
    
    // 1. 建立 Context 容器（存放共享狀態）
    const MyContext = createContext();
    
    function MyProvider({ children }) {
      // 2. 定義狀態，這是要分享給子元件的資料
      const [value, setValue] = useState('Hello from Context');
    
      // 3. 透過 Provider 包裹子元件，把狀態和改狀態的函數放入 value 裡傳下去
      return (
        <MyContext.Provider value={{ value, setValue }}>
          {children}
        </MyContext.Provider>
      );
    }
    
    function Child() {
      // 4. 在需要用狀態的元件，用 useContext 拿到剛剛共享的狀態跟改變狀態的方法
      const { value, setValue } = useContext(MyContext);
    
      // 5. 用狀態 value 顯示文字，用 setValue 改變狀態（按鈕點擊）
      return (
        <div>
          <p>{value}</p>
          <button onClick={() => setValue('New Value!')}>改變 Context 值</button>
        </div>
      );
    }
    
    function App() {
      // 6. 用 MyProvider 包住子元件，讓所有被包裹的元件都能拿到 Context
      return (
        <MyProvider>
          <Child />
        </MyProvider>
      );
    }
    
    export default App;
