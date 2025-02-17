import { useState, useEffect } from 'react';

/**
 * SearchParamsDemo Component
 * 
 * This component demonstrates the management of URL search parameters in a React application.
 * Features:
 * - Set and update URL parameters
 * - Clear individual parameters
 * - Clear all parameters
 * - Sync URL parameters with form state
 */
const Test = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  
  /**
   * Effect hook to initialize form fields from URL parameters on component mount
   * This ensures the form state matches URL parameters when the page loads
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nameParam = searchParams.get('name');
    const ageParam = searchParams.get('age');
    
    // Only update state if parameters exist in URL
    if (nameParam) setName(nameParam);
    if (ageParam) setAge(ageParam);
  }, []);
  
  /**
   * Updates the URL with provided search parameters
   */
  const updateURL = (params) => {
    const newUrl = `${window.location.pathname}${params ? `?${params}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  /**
   * Handles form submission by updating URL with current form values
   * This function collects all non-empty form values and updates the URL
   */
  const handleSubmit = () => {
    const searchParams = new URLSearchParams();
    // Only add parameters if they have values
    if (name) searchParams.set('name', name);
    if (age) searchParams.set('age', age);
    updateURL(searchParams.toString());
  };

  /**
   * Clears the name parameter from both state and URL
   * Preserves other parameters if they exist
   */
  const clearNameParam = () => {
    setName('');
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('name');
    updateURL(searchParams.toString());
  };

  /**
   * Clears the age parameter from both state and URL
   * Preserves other parameters if they exist
   */
  const clearAgeParam = () => {
    setAge('');
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('age');
    updateURL(searchParams.toString());
  };

  /**
   * Clears all parameters and resets form state
   * Removes all search parameters from URL
   */
  const clearAllParams = () => {
    setName('');
    setAge('');
    updateURL('');
  };
  
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
            <button
              onClick={clearNameParam}
              className="btn btn-danger"
              title="Clear name parameter"
            >
              Clear
            </button>
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
            <button
              onClick={clearAgeParam}
              className="btn btn-danger"
              title="Clear age parameter"
            >
              Clear
            </button>
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
          
          <button
            onClick={clearAllParams}
            className="btn btn-danger"
            title="Clear all parameters"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;