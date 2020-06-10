import * as React from 'react';

// modules
import { useLazyQuery } from '@apollo/client';

// styles
import './styles.css'

// apollo
import { GET_PLAYER_KPIS_BY_SEARCH } from '../../../../../../../../../../../../graphql/queries/server/getPlayerKpisBySearch';

const SearchPlayerKpis = () => {

  // state
  const [search, setSearch] = React.useState('');
  const [playerInfos, setPlayerInfos] = React.useState({
    recruiter: {
      id: '',
      playerName: '',
      email: '',
      acceptedJobsNumber: 0,
      applicantsNumber: 0,
    },
    applicant: {
      id: '',
      playerName: '',
      email: '',
      appliedJobs: 0
    }
  })

  // queries
  const [getPlayerKpisBySearch, { loading, error, data }] = useLazyQuery(GET_PLAYER_KPIS_BY_SEARCH, {
    fetchPolicy: "no-cache",
  })

  // effect

  React.useEffect(() => {
    if (data) {
      setPlayerInfos(data.playerKpisBySearch)
    }

  }, [data])

  // handlers
  function handleChange(e: any) {
    setSearch(e.target.value)
  }

  function handleClick(e: any) {
    getPlayerKpisBySearch({
      variables: {
        search,
      },
    })
  }

  return (
    <div className='search-player-kpis-containter'>
      <h4 className='search-player-title'>Search for a player</h4>
      <div className='search-player-form'>
        {/* <label>
          Enter an email or a player userName
        </label> */}
        <input className='search-player-form-input' type='text' name='search' value={search} onChange={handleChange} placeholder='Insert email...' />
        <button className='search-player-form-button' onClick={handleClick}>Search</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {playerInfos === null && <p className='search-player-data-null'>No player found</p>}
        {playerInfos?.recruiter?.email && (
          <div>
            <h5>Result</h5>
            <div>
              {playerInfos.recruiter.email}
              {playerInfos.recruiter.playerName && <div>{playerInfos.recruiter.playerName}</div>}
              <div className='search-player-result-details'>
                Total number of accepted job offers: {playerInfos.recruiter.acceptedJobsNumber}
              </div>
              <div className='search-player-result-details'>
                Total number of applicants: {playerInfos.recruiter.applicantsNumber}
              </div>
              {playerInfos?.applicant?.playerName && <div className='search-player-result-details'>
                Total number of applied jobs: {playerInfos.applicant.appliedJobs}
              </div>}
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default SearchPlayerKpis;