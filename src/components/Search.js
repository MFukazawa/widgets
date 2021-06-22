import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  // start with empty string
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: term,
  //       },
  //     });

  //     setResults(data.query.search);
  //   };

  //   const timeoutId = setTimeout(() => {
  // if we start with a default term in state ↓
  // if (term && !results.length) { search() } else {...
  //   if (term) {
  //     search();
  //   }
  // }, 500);

  // return () => {
  //   clearTimeout(timeoutId);
  // };
  // if starting with default term & using results.length, include results.length here
  // }, [term]);

  // const [test, setTest] = useState('');
  // console.log('I run with every render');
  // useEffect(() => {
  //   console.log('I ONLY RUN ONCE');
  // }, []);
  // useEffect(() => {
  //   console.log('I run at initial render and after rerender ');
  // });
  // useEffect(() => {
  //   console.log(
  //     'I run at initial render AND after rerender if data has changed since last rerender'
  //   );
  // }, [test]);

  const renderedResults = results.map((result) => {
    return (
      <div className='item' key={result.pageid}>
        <div className='right floated content'>
          <a
            className='ui button'
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target='__blank'
          >
            Go
          </a>
        </div>
        <div className='content'>
          <div className='header'>{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Search Term</label>
          <input
            className='input'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className='ui celled list'>{renderedResults}</div>
    </div>
  );
};

export default Search;
