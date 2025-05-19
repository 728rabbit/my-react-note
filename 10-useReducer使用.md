
`useReducer` 是 React 提供的一個 Hook，類似 Redux 的 reducer 概念。

-   它用一個「reducer 函數」來決定狀態如何改變
    
-   讓狀態更新邏輯集中，更容易管理複雜狀態或多種操作
    

## 1. 基本語法

    const [state, dispatch] = useReducer(reducer, initialState);
    
    function reducer(state, action) {
      switch(action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        default:
          return state;
      }
    }
    
`dispatch` 是用來觸發狀態改變的函數，裡面帶入 action 物件。

## 2. 用 Context + useReducer 共享狀態示範

這樣組合可以讓狀態集中管理，元件能共用並操作複雜狀態。

    import React, { createContext, useReducer, useContext } from 'react';
    
    // 1. 建立 Context
    const CounterContext = createContext();
    
    // 2. 定義 reducer
    function counterReducer(state, action) {
      switch(action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        default:
          throw new Error('未知的 action');
      }
    }
    
    // 3. 建立 Provider 包裹子元件，並提供 state 和 dispatch
    function CounterProvider({ children }) {
      const [state, dispatch] = useReducer(counterReducer, { count: 0 });
    
      return (
        <CounterContext.Provider value={{ state, dispatch }}>
          {children}
        </CounterContext.Provider>
      );
    }
    
    // 4. 使用 Context 的子元件，讀取 state 和觸發 dispatch
    function Counter() {
      const { state, dispatch } = useContext(CounterContext);
    
      return (
        <div>
          <p>計數：{state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>減少</button>
        </div>
      );
    }
    
    // 5. App 組件
    function App() {
      return (
        <CounterProvider>
          <Counter />
        </CounterProvider>
      );
    }
    
    export default App;
