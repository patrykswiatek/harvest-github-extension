import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'

import octokit from '@/api/octokit'
import { SelectOption } from '@/types/props/select.props'

type GetAuthenticatedData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.users.getAuthenticated
>

interface UserData {
  avatarUrl: GetAuthenticatedData['avatar_url']
  name: GetAuthenticatedData['name']
}

export type DataType = 'pullRequests' | 'projects' | 'tasks'

export type AppData = Record<DataType, SelectOption[]> & {
  user: UserData | null
}
