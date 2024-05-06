import React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
const SelectType = ({ value, onChange, error, ...props }: any) => {

    const [types, setTypes] = useState([]);

    const fetchTypes = async () => {
      try {
        const response = await api.get('/types');
        setTypes(response.data);
      } catch (error) {
        console.error("Erro ao buscar os tipos:", error);
      }
    };
  
    useEffect(() => {
      fetchTypes();
    }, []); 

  return (
    <div>
      <select
        name="type"
        value={value}
        onChange={onChange}
        className={`beautifulInput ${!value && error ? 'error' : ''}`}
        {...props}
      >
        <option value="" disabled>Escolha um tipo</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
};

export default SelectType;