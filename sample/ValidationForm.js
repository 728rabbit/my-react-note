import React, { useState } from 'react';

function ValidationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value.trim()) error = '姓名是必填';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email 是必填';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email 格式不正確';
    } else if (name === 'password') {
      if (!value) error = '密碼是必填';
      else if (value.length < 6) error = '密碼至少6位';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    console.log('check input');
    // 即時驗證
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      const errorMsg = validateField(name, value);

      if (errorMsg) newErrors[name] = errorMsg;
      else delete newErrors[name];

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('提交成功: ' + JSON.stringify(form));
      // 你可以在這裡做API呼叫或其他操作
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>姓名：
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
          />
        </label>
        {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
      </div>

      <div>
        <label>Email：
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
          />
        </label>
        {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
      </div>

      <div>
        <label>密碼：
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
          />
        </label>
        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
      </div>

      <button type="submit">提交</button>
    </form>
  );
}

export default ValidationForm;