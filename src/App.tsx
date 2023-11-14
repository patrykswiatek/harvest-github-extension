import React, { FC, useEffect, useState } from 'react'

import '@/App.css'
import { getUserOpenPullRequests } from '@/api'
import Option from '@/components/select/atoms/option/Option'
import Select from '@/components/select/Select'
import { OpenPullRequestsList } from '@/types/requests-output'

const App: FC = () => {
  const [openPullRequests, setOpenPullRequests] =
    useState<OpenPullRequestsList>()

  const getGithubData = async () => {
    const { data } = await getUserOpenPullRequests('patrykswiatek')
    setOpenPullRequests(data)
  }

  useEffect(() => {
    getGithubData()
  }, [])

  return (
    <div className='App'>
      <Select>
        {openPullRequests?.map(({ id, title }) => (
          <Option key={id} value={id}>
            {title}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default App
