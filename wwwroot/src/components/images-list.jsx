import ImageCard from './image-card'


const ImagesList = ({ images, tags, selectedTagIds, errorMessage, onToggleTag }) => {
  return (
    <>
      { errorMessage &&
        <div className="alert alert-danger" role="alert">
          { errorMessage }
        </div>
      }
      <div className="images-list mt-5 w-100 row">
        {images.map((item) => {
          return (
            <ImageCard
              key={`${item.id}-imageCard`}
              allTags={tags}
              image={item}
              selectedTagIds={selectedTagIds}
              onToggleTag={onToggleTag}
            />
          )
        })}
      </div>
    </>
  )
}

export default ImagesList
