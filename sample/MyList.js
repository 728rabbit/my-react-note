import React, { useState, useEffect } from 'react';

function MyList() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return []; // 萬一 JSON 壞咗，都唔會爆
        }
    });

    // 監聽 tasks 改變，自動儲存，寫入 localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const handleAddTask = () => {
        if (task.trim() === '') return;

        setTasks([...tasks, { text: task.trim(), completed: false }]);
        setTask(''); 
    };

    const handleDeleteTask = (indexToRemove) => {
        const newTasks = tasks.filter((_, index) => index !== indexToRemove);
        setTasks(newTasks);
    };

    const toggleComplete = (indexToToggle) => {
        const newTasks = tasks.map((task, index) => (index === indexToToggle) ? { ...task, completed: !task.completed } : task);
        setTasks(newTasks);
    };

  return (
    <div style={{ padding: '20px' }}>
        <h1><Counter/></h1>

        <input type="text" value={task} // bind value
        onChange={(e) => setTask(e.target.value)} // Update state when input changes
        />
        <button onClick={ handleAddTask }>Add</button>

        <p>You entered: {task}</p>

        <ul>
            { tasks.length > 0 && tasks.map((item, index) => (
            // key={index} 不是必須，但非常建議加上, 相對於唯一識別ID 
            // key 是用來幫 React 追蹤每一個元素的唯一性，讓它知道哪些項目有變動、哪些是新增/刪除
            <TaskItem  
            key={index}
            task={item} 
            index={index} 
            onToggle={toggleComplete}
            onDelete={handleDeleteTask} />
            ))}
        </ul>
    </div>
  );
}

// Can be disassembled into small components. e.g.: TaskItem.js
function TaskItem({ task, index, onToggle, onDelete }) {
  return (
    <li key={index}>
        <span style={{ color: (task.completed? 'green':'red')}}>{ task.text }</span>
        <button onClick={ () => onToggle(index) } style={{ marginLeft: '10px' }}>Done</button>
        <button onClick={ () => onDelete(index) } style={{ marginLeft: '10px' }}>Delete</button>
    </li>
  );
}

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

export default MyList;
