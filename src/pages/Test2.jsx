import React, { useState } from 'react'
import { useSearchParams } from 'react-router';

const Test2 = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        setSearchParams({name:name , age:age})

    }
    

  return (
    // Main container with Bootstrap styling
    <div className="container mt-4">
      {/* Name Field Row */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name:</label>
          {/* Input group for name field and its clear button */}
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter name"
            />
            {/* <button
              onClick={clearNameParam}
              className="btn btn-danger"
              title="Clear name parameter"
            >
              Clear
            </button> */}
          </div>
        </div>
      </div>
      
      {/* Age Field Row */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Age:</label>
          {/* Input group for age field and its clear button */}
          <div className="input-group">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              placeholder="Enter age"
            />
            {/* <button
              onClick={clearAgeParam}
              className="btn btn-danger"
              title="Clear age parameter"
            >
              Clear
            </button> */}
          </div>
        </div>
      </div>
      
      {/* Action Buttons Row */}
      <div className="row">
        <div className="col">
          <button
            onClick={handleSubmit}
            className="btn btn-primary me-2"
            title="Update URL with current values"
          >
            Update URL Parameters
          </button>
          
          {/* <button
            onClick={clearAllParams}
            className="btn btn-danger"
            title="Clear all parameters"
          >
            Clear All
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Test2