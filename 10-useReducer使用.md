
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

## 3.一個用 **Context + useReducer** 做的簡易 Todo List 範例，包含新增、刪除、切換完成狀態三大功能

    import React, { createContext, useReducer, useContext, useState } from 'react';
    
    // 1. 建立 Context
    const TodoContext = createContext();
    
    // 2. 定義 reducer，管理 todo 狀態
    function todoReducer(state, action) {
      switch (action.type) {
        case 'add':
          return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'toggle':
          return state.map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          );
        case 'delete':
          return state.filter(todo => todo.id !== action.payload);
        default:
          throw new Error('未知的 action');
      }
    }
    
    // 3. Provider 包裹子元件並提供 state 和 dispatch
    function TodoProvider({ children }) {
      const [state, dispatch] = useReducer(todoReducer, []);
    
      return (
        <TodoContext.Provider value={{ state, dispatch }}>
          {children}
        </TodoContext.Provider>
      );
    }
    
    // 4. TodoList 元件，使用 Context 讀寫 todo 狀態
    function TodoList() {
      const { state, dispatch } = useContext(TodoContext);
      const [input, setInput] = useState('');
    
      const handleAdd = () => {
        if (!input.trim()) return;
        dispatch({ type: 'add', payload: input.trim() });
        setInput('');
      };
    
      return (
        <div>
          <h2>Todo List (Context + useReducer)</h2>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入任務"
          />
          <button onClick={handleAdd}>新增</button>
    
          <ul>
            {state.map(todo => (
              <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
                {todo.text}
                <button onClick={() => dispatch({ type: 'toggle', payload: todo.id })}>
                  {todo.completed ? '還原' : '完成'}
                </button>
                <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>刪除</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // 5. App 組件
    function App() {
      return (
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      );
    }
    
    export default App;
