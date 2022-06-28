import { Dispatch, MouseEvent, useState, SetStateAction } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

import defaultImg from 'assets/defaultImg.png'
import { cx } from 'styles'
import styles from './MovieItem.module.scss'
import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state'
import useDragList from 'hooks/dragList'
import useFavoriteUpdate from 'hooks/favoriteUpdate'
import { favoritesState } from 'states/favoriteItem'
import { useIsFavorite } from 'hooks'

interface IMovieItemProps {
  movie: IMovieItem
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  isDraggable: boolean
  index: number
  grab?: HTMLLIElement | null
  setGrab?: Dispatch<SetStateAction<HTMLLIElement | null>>
}

const MovieItem = ({ movie, onClick, isDraggable, index, grab, setGrab }: IMovieItemProps) => {
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoritesState)
  const [dragVisible, setDragVisible] = useState(false)
  const [grabbing, setGrabbing] = useState(false)
  const isFavorite = useIsFavorite(movie)

  const { removeFromFavorite, addToFavorite } = useFavoriteUpdate({ selectedMovie: movie })

  const handleClickStar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isDraggable) return
    if (isFavorite) {
      removeFromFavorite()
    } else {
      addToFavorite()
    }
  }

  const handleImgOnError = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImg
  }

  const { handleOnDragOver, handleOnDragStart, handleOnDragEnd, handleOnDrop, handleOnDragEnter, handleOnDragLeave } =
    useDragList({
      setDragVisible,
      setGrabbing,
      grab,
      setGrab,
      favoriteMovies,
      setFavoriteMovies,
    })

  return (
    <li
      className={cx(
        styles.itemWrapper,
        { [styles.dragVisible]: dragVisible },
        { [styles.grabbing]: grabbing },
        { [styles.isDraggable]: isDraggable }
      )}
      title={movie.title}
      draggable={isDraggable}
      data-position={index}
      onDragOver={handleOnDragOver}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      onDrop={handleOnDrop}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
    >
      <button type='button' onClick={onClick} className={styles.contentButton}>
        <div className={styles.poster}>
          <img src={movie.poster} alt='movie poster' onError={handleImgOnError} />
        </div>
        <ul className={styles.content}>
          <li className={styles.title}>{movie.title}</li>
          <li className={styles.type}>{movie.type}</li>
          <li className={styles.year}>{movie.year}</li>
        </ul>
      </button>
      <button type='button' className={styles.likes} onClick={handleClickStar}>
        {isFavorite ? <FaStar /> : <FaRegStar color='black' />}
      </button>
    </li>
  )
}

export default MovieItem
