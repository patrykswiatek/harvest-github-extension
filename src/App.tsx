import React, { FC, useEffect, useState } from 'react'

import styles from '@/App.module.scss'
import Form from '@/components/form/Form'
import Header from '@/components/header/Header'
import Loader from '@/components/loader/Loader'
import { useAppData } from '@/hooks/use-app-data'

import '@/styles/global.scss'

const GITHUB_ORIGIN = 'https://github.com'

const App: FC = () => {
  const { pullRequests, projects, tasks, user, isLoading } = useAppData()

  const [activeGithubTabTitle, setActiveGithubTabTitle] =
    useState<chrome.tabs.Tab['title']>()

  const handleActiveTab = () => {
    chrome.tabs?.query(
      { active: true, currentWindow: true },
      ([{ url = '', title }]) => {
        if (new URL(url).origin !== GITHUB_ORIGIN) return

        setActiveGithubTabTitle(title)
      }
    )
  }

  useEffect(() => {
    if (activeGithubTabTitle) return

    handleActiveTab()
  }, [])

  return (
    <div className={styles.App}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <Header user={user} />
          <Form
            data={{ pullRequests, projects, tasks, isLoading }}
            activeTabTitle={activeGithubTabTitle}
          />
        </div>
      )}
    </div>
  )
}

export default App
