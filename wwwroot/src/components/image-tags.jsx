const ImageTags = ({ allTags, tags, selectedTagIds, onToggleTag }) => {
  return (
    <>
      { allTags?.length &&
        <div className="image-tags w-100">
          {tags.map((id) => {
            const tag = allTags.find((obj) => obj.id === id);
            if (!tag) {
              console.log('failed to find ' + id)
            }
            const isSelected = selectedTagIds?.includes(tag?.id)
            return (
              <>
                { tag &&
                  <button
                    type="button"
                    className={`me-2 mt-2 btn ${
                      isSelected ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => onToggleTag(tag.id)}
                  >
                    { tag.name }
                  </button>
                }
              </>
            )
          })}
        </div>
      }
    </>
  )
}

export default ImageTags
