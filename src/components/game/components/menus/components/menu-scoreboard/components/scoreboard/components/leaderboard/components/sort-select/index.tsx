import * as React from 'react';

// styles
import './styles.css';

const SortSelect = ({ handleSelectChange }: any) => {

  return (
    <div className='sort-select-container'>
      Filter by:
      <div className='sort-select-body'>
        <select onChange={handleSelectChange} defaultValue='acceptedJobsNumber'>
          <option></option>
          <option value='acceptedJobsNumber'>validated job offers</option>
          <option value='applicantsNumber'>number of applicants</option>
        </select>
      </div>
    </div>
  )

}

export default SortSelect;