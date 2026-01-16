import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ImagesList from './components/images-list'
import Filters from './components/filters'
import 'bootstrap/dist/css/bootstrap.css'


document.onreadystatechange = () => {
  if (document.readyState !== 'loading') {
    initApplication()
  }
}

const initApplication = () => {
  const rootContainer = document.querySelector('.container')
  const root = createRoot(rootContainer)
  root.render(
    <App />
  )
}

const App = () => {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/data/images.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      fetch('/data/tags.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ])
      .then(async ([imagesResponse, tagsResponse]) => {
        const [imagesData, tagsData] = await Promise.all([
          imagesResponse.json(),
          tagsResponse.json(),
        ])

        if (imagesData?.length) {
          setImages(imagesData)
        } else {
          setErrorMessage('No images found')
        }

        if (tagsData?.length) {
          setTags(tagsData)
        } else {
          setErrorMessage('No tags found')
        }
      })
      .catch(() => {
        setErrorMessage('Failed to load images or tags')
      })
  }, [])

  const handleToggleTag = (tagId) => {
    setSelectedTagIds((current) => {
      if (current.includes(tagId)) {
        return current.filter((id) => id !== tagId)
      }
      return [...current, tagId]
    })
  }

  const handleClearTags = () => {
    setSelectedTagIds([])
  }

  const filteredImages = useMemo(() => {
    if (!selectedTagIds.length) {
      return images
    }
    return images.filter((image) =>
      selectedTagIds.every((tagId) => image.tags?.includes(tagId))
    )
  }, [images, selectedTagIds])

  return (
    <>
      <Filters
        tags={tags}
        selectedTagIds={selectedTagIds}
        onClearTags={handleClearTags}
      />
      <ImagesList
        images={filteredImages}
        tags={tags}
        selectedTagIds={selectedTagIds}
        errorMessage={errorMessage}
        onToggleTag={handleToggleTag}
      />
    </>
  )
}
