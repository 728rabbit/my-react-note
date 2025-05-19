**需要使用 useEffect**

    import React, { useState, useEffect } from 'react';

	// F5, 會 reset all
    const [tasks, setTasks] = useState([]);
    
    // 初始時，讀取 localStorage
    useEffect(() => {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    }, []);
  
    // 監聽 tasks 改變，自動儲存，寫入 localStorage
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

改進版本

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
