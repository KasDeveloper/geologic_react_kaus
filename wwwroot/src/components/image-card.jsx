import ImageTags from './image-tags'


const ImageCard = ({ image, allTags, selectedTagIds, onToggleTag }) => {
  return (
    <div className="image-item col-3 p-2">
      <div
        style={{
          width: '100%',
          aspectRatio: 1,
          backgroundImage: `url(assets/images/${image.file?.name})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#eee',
        }}
        className="w-100 border border-secondary"
      />
      <ImageTags
        key={`${image.id}-tags`}
        allTags={allTags}
        tags={image.tags}
        selectedTagIds={selectedTagIds}
        onToggleTag={onToggleTag}
      />
    </div>
  )
}

export default ImageCard
