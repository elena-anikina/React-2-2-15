import React from "react";
import './input.css';
import { Input } from 'antd';


const InputSearch = ({inputChange, inputValue}) => {
    return (
        <Input placeholder="Type to search..." value={inputValue} onChange={inputChange} autoFocus className="input" />
    );
};

export default InputSearch;