import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import ReactGA from 'react-ga'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from 'styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt'
import { LightbulbOutline as Light } from 'styled-icons/material/LightbulbOutline'
import { GraduationCap } from 'styled-icons/fa-solid/GraduationCap'

import * as S from './styled'

const searchClickTrack = () => {
  ReactGA.event({
    category: 'search',
    action: 'click',
    label: 'Search na Menu Bar'
  })
}

const courseClickTrack = () => {
  ReactGA.event({
    category: 'cursos',
    action: 'click',
    label: 'Link na Menu Bar'
  })
}

const themeClickTrack = (theme) => {
  ReactGA.event({
    category: 'theme',
    action: 'click',
    label: `Usava ${theme} theme`
  })
}

const topClickTrack = () => {
  ReactGA.event({
    category: 'top',
    action: 'click',
    label: `Top na Menu Bar`
  })
}

const MenuBar = () => {
  const [theme, setTheme] = useState(null)
  const isDarkMode = theme === 'dark'

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  return (
    <S.MenuBarWrapper>
      <S.MenuBarGroup>
        <Link to="/" title="Voltar para Home">
          <S.MenuBarItem>
            <Home />
          </S.MenuBarItem>
        </Link>
        <Link to="/search" title="Search" onClick={() => searchClickTrack()}>
          <S.MenuBarItem>
            <Search />
          </S.MenuBarItem>
        </Link>
        <Link to="/cursos" title="Cursos" onClick={() => courseClickTrack()}>
          <S.MenuBarItem>
            <GraduationCap />
            <S.MenuBarNotification />
          </S.MenuBarItem>
        </Link>
      </S.MenuBarGroup>

      <S.MenuBarGroup>
        <S.MenuBarItem
          title="Mudar o Tema"
          onClick={() => {
            themeClickTrack(theme)
            window.__setPreferredTheme(isDarkMode ? 'light' : 'dark')
          }}
          isDarkMode={isDarkMode}
        >
          <Light />
        </S.MenuBarItem>
        <S.MenuBarItem
          title="Ir para o Topo"
          onClick={() => {
            topClickTrack()
            window.scroll({ top: 0, behavior: 'smooth' })
          }}
        >
          <Arrow />
        </S.MenuBarItem>
      </S.MenuBarGroup>
    </S.MenuBarWrapper>
  )
}

export default MenuBar