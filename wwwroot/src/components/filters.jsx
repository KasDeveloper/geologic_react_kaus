
const Filters = ({ tags, selectedTagIds, onClearTags }) => {
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
          <div className='row'>
            <div class="input-group" style={{ maxWidth: '9rem' }}>
              <div class="input-group-prepend">
                <span class="input-group-text">&gt;=</span>
              </div>
              <input type="number" class="form-control" step="0.1" />
            </div>
            <div class="input-group" style={{ maxWidth: '9rem' }}>
              <input type="number" class="form-control" step="0.1" />
              <div class="input-group-append">
                <span class="input-group-text">&lt;=</span>
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
                <div class="input-group" style={{ maxWidth: '10rem' }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">&gt;=</span>
                  </div>
                  <input type="number" class="form-control" step="100" />
                </div>
                <div class="input-group" style={{ maxWidth: '10rem' }}>
                  <input type="number" class="form-control" step="100" />
                  <div class="input-group-append">
                    <span class="input-group-text">&lt;=</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <div className='row'>
                <h5 className='col mb-0 pb-0 mt-2'>Height:</h5>
                <div class="input-group" style={{ maxWidth: '10rem' }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">&gt;=</span>
                  </div>
                  <input type="number" class="form-control" step="100" />
                </div>
                <div class="input-group" style={{ maxWidth: '10rem' }}>
                  <input type="number" class="form-control" step="100" />
                  <div class="input-group-append">
                    <span class="input-group-text">&lt;=</span>
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
