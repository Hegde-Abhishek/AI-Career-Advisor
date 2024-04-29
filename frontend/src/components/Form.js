import React, { useState } from 'react';

const Form = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ''}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
