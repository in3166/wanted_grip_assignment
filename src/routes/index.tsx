import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import Container from 'components/container'
import Header from 'components/Header'
import GNB from './_shared/GNB'

import MainPage from './mainPage'
import FavoritePage from './favoritePage'

const App = () => {
  return (
    <div className={styles.app}>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='favorites' element={<FavoritePage />} />
          <Route path='*' element={<div className={styles.notFound}>404: Page Not found.</div>} />
        </Routes>
        <GNB />
      </Container>
    </div>
  )
}

export default App
