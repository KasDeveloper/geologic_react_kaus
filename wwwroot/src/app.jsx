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
  const [filters, setFilters] = useState({
    sizeMin: '',
    sizeMax: '',
    widthMin: '',
    widthMax: '',
    heightMin: '',
    heightMax: '',
  })

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

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const filteredImages = useMemo(() => {
    const parseOrNull = (value) => {
      if (value === '' || value === null || value === undefined) return null
      const num = Number(value)
      return Number.isNaN(num) ? null : num
    }

    const sizeMin = parseOrNull(filters.sizeMin)
    const sizeMax = parseOrNull(filters.sizeMax)
    const widthMin = parseOrNull(filters.widthMin)
    const widthMax = parseOrNull(filters.widthMax)
    const heightMin = parseOrNull(filters.heightMin)
    const heightMax = parseOrNull(filters.heightMax)

    const passesRange = (value, min, max) => {
      if (min !== null && value < min) return false
      if (max !== null && value > max) return false
      return true
    }

    return images.filter((image) => {
      if (selectedTagIds.length) {
        if (!selectedTagIds.every((tagId) => image.tags?.includes(tagId))) {
          return false
        }
      }

      const fileSize = image.file?.['size (MB)']
      if (!passesRange(fileSize, sizeMin, sizeMax)) {
        return false
      }

      const width = image.dimensions?.width
      if (!passesRange(width, widthMin, widthMax)) {
        return false
      }

      const height = image.dimensions?.height
      if (!passesRange(height, heightMin, heightMax)) {
        return false
      }

      return true
    })
  }, [images, selectedTagIds, filters])

  return (
    <>
      <Filters
        tags={tags}
        selectedTagIds={selectedTagIds}
        onClearTags={handleClearTags}
        filters={filters}
        onFilterChange={handleFilterChange}
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
