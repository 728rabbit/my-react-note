// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from 'react-router-dom';

// 建立登入狀態 Context
const AuthContext = createContext();

// 提供登入狀態與操作
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // App 載入時，嘗試從 localStorage 讀取登入狀態
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 登入函式（假登入，直接存 username）
  const login = (username) => {
    setUser({ username });
    localStorage.setItem('user', JSON.stringify({ username }));
  };

  // 登出函式
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 受保護路由組件
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Login 頁面
function Login() {
  const [username, setUsername] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/tasks');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert('請輸入使用者名稱');
    login(username.trim());
  };

  return (
    <div>
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="輸入使用者名稱"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}

// TaskList 頁面
function TaskList() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([
    { id: 1, text: '學習 React', done: false },
    { id: 2, text: '寫小專案', done: true },
  ]);

  const toggleDone = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <h2>{user.username} 的任務列表</h2>
      <button onClick={logout}>登出</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label style={{ textDecoration: task.done ? 'line-through' : '' }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
      <Link to="/login">回登入頁</Link>
    </div>
  );
}

// App 主組件，包含路由
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
