import * as React from 'react';

// modules
import { useLazyQuery } from '@apollo/client';

// apollo
import { GET_PLAYER_KPIS_BY_SEARCH } from '../../../../../../../../../../../../graphql/queries/server/getPlayerKpisBySearch';

const SearchBar = () => {

  // state
  const [search, setSearch] = React.useState('');

  // queries
  const [getPlayerKpisBySearch, { loading, error, data }] = useLazyQuery(GET_PLAYER_KPIS_BY_SEARCH)

  // handlers
  function handleChange(e: any) {
    setSearch(e.target.value)
  }

  function handleClick(e: any) {
    getPlayerKpisBySearch({
      variables: {
        search,
        fetchPolicy: 'no-cache',
      }
    })
  }



  return (
    <div>
      <input type='text' name='search' value={search} onChange={handleChange} placeholder='insert name or email...' />
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default SearchBar;