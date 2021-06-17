import React, { useState, useEffect } from 'react';

const Search = () => {
  const [term, setTerm] = useState('');

  // could be keyword function ie function hoge() {}
  useEffect(() => {
    console.log('abc')
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
};

export default Search;