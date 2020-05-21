import * as React from 'react';

const FilterSelect = ({ handleSelectChange }: any) => {



  return (
    <div>
      Filter by:
      <select onChange={handleSelectChange} defaultValue='acceptedJobsNumber'>
        <option></option>
        <option value='acceptedJobsNumber'>validated job offers</option>
        <option value='applicantsNumber'>number of applicants</option>
      </select>
    </div>
  )

}

export default FilterSelect;