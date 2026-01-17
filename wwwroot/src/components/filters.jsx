
const Filters = ({ tags, selectedTagIds, onClearTags, filters, onFilterChange }) => {
  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id))
  return (
    <div className='filters-container container mt-3'>
      <h1 className="mb-3 text-center">Kaus GeoLogic React</h1>
      <div className='row mb-2 w-100'>
        <div className='col-3 text-end'>
          <h3>Tags:</h3>
        </div>
        <div className='col-8'>
          {selectedTags.length
            ? selectedTags.map((tag) => tag.name).join(', ')
            : 'None selected'}
          {selectedTagIds.length > 0 && (
            <button
              type="button"
              className="btn btn-link ms-2 p-0 align-baseline"
              onClick={onClearTags}
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className='row mb-2 w-100'>
        <div className='col-3 text-end'>
          <h3>File Size:</h3>
        </div>
        <div className='col-8'>
          <div className='row g-2'>
            <div className="input-group" style={{ maxWidth: '9rem' }}>
              <div className="input-group-prepend">
                <span className="input-group-text">&gt;=</span>
              </div>
              <input
                name="sizeMin"
                type="number"
                className="form-control"
                step="0.1"
                value={filters.sizeMin}
                onChange={(e) => onFilterChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="input-group" style={{ maxWidth: '9rem' }}>
              <input
                name="sizeMax"
                type="number"
                className="form-control"
                step="0.1"
                value={filters.sizeMax}
                onChange={(e) => onFilterChange(e.target.name, e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">&lt;=</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row w-100'>
        <div className='col-3 text-end'>
          <h3>Dimensions:</h3>
        </div>
        <div className='col-8'>
          <div className='row'>
            <div className='col-auto'>
              <div className='row'>
                <h5 className='col mb-0 pb-0 mt-2'>Width:</h5>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">&gt;=</span>
                  </div>
                  <input
                    name="widthMin"
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.widthMin}
                    onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <input
                    name="widthMax"
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.widthMax}
                    onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">&lt;=</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <div className='row'>
                <h5 className='col mb-0 pb-0 mt-2'>Height:</h5>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">&gt;=</span>
                  </div>
                  <input
                    name="heightMin"
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.heightMin}
                    onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <input
                    name="heightMax"
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.heightMax}
                    onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">&lt;=</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
