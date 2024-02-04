import { FC, useEffect, useState } from 'react'

import styles from '@/App.module.scss'
import Form from '@/components/form/Form'
import Header from '@/components/header/Header'
import Loader from '@/components/loader/Loader'
import { useAppDataFetcher } from '@/hooks/use-app-data-fetcher'

import '@/styles/global.module.scss'

const GITHUB_ORIGIN = 'https://github.com'

const App: FC = () => {
  const { pullRequests, projects, tasks, user, isLoading } = useAppDataFetcher()

  const [activeGithubTabTitle, setActiveGithubTabTitle] =
    useState<chrome.tabs.Tab['title']>()

  const handleActiveTab = () => {
    chrome.tabs?.query(
      { active: true, currentWindow: true },
      ([tab]) => {
        if (tab && new URL(tab.url || '').origin === GITHUB_ORIGIN) {
          setActiveGithubTabTitle(tab.title)
        }
      }
    )
  }

  useEffect(() => {
    if (activeGithubTabTitle) return

    handleActiveTab()
  }, [activeGithubTabTitle])

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
