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
    <div>
      <h4>Search for a player</h4>
      <input type='text' name='search' value={search} onChange={handleChange} placeholder='insert name or email...' />
      <button onClick={handleClick}>Search</button>
      <div>
        {playerInfos?.recruiter?.playerName && (
          <div>
            <h5>recruiter</h5>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Total applicants</th>
                  <th>Total validated job offers</th>
                </tr>
                <tr>
                  <td className='table-data-total'>{playerInfos.recruiter.playerName}</td>
                  <td className='table-data-total'>{playerInfos.recruiter.acceptedJobsNumber}</td>
                  <td className='table-data-total'>{playerInfos.recruiter.acceptedJobsNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
        }
      </div>
      <div>
        {playerInfos?.applicant?.playerName && (
          <div>
            <h5>applicant</h5>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Total applied jobs</th>
                </tr>
                <tr>
                  <td className='table-data-total'>{playerInfos.applicant.playerName}</td>
                  <td className='table-data-total'>{playerInfos.applicant.appliedJobs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default SearchPlayerKpis;