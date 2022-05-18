import { lazy, Suspense, useState } from 'react'

import styles from './FavoritePage.module.scss'
import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state/'
import { favoritesState } from 'states/favoriteItem'
import { Loading, Modal } from 'components'

import DragListButton from './DragListButton'

const LazyMovieItem = lazy(() => import('components/MovieItem'))

const FavoritePage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [favoriteMovies, ,] = useRecoil(favoritesState)
  const [selectedFavoriteMovie, setSelectedFavoriteMovie] = useState<IMovieItem | null>(null)
  const [isDraggable, setIsDraggable] = useState(false)
  const [grab, setGrab] = useState<HTMLLIElement | null>(null)

  const handleOpenModal = (value: IMovieItem) => {
    if (isDraggable) return
    setSelectedFavoriteMovie(value)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <DragListButton setIsDraggable={setIsDraggable} isDraggable={isDraggable} />
      <main className={styles.wrapper}>
        <ul className={styles.movieLists}>
          <Suspense fallback={<Loading />}>
            {favoriteMovies?.length > 0 &&
              favoriteMovies.map((value, index) => (
                <LazyMovieItem
                  grab={grab}
                  setGrab={setGrab}
                  isDraggable={isDraggable}
                  index={index}
                  key={`${value.imdbID}-list-${index + 1}`}
                  movie={value}
                  onClick={() => handleOpenModal(value)}
                />
              ))}
          </Suspense>
        </ul>

        {modalVisible && selectedFavoriteMovie && (
          <Modal onCancel={handleCloseModal} movie={selectedFavoriteMovie} isRemove />
        )}
      </main>
    </>
  )
}

export default FavoritePage
