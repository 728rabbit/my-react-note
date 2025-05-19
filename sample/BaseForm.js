import React, { useState } from 'react';

function FormExample() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('male');

  const handleSubmit = (e) => {
    e.preventDefault(); // 防止頁面重載
    alert(`Name: ${name}, Description: ${description}, Gender: ${gender}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: 
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <br />
      
      <label>
        Description: 
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </label>
      <br />

      <label>
        Gender:
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormExample;
