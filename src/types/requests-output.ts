import { GetResponseTypeFromEndpointMethod } from '@octokit/types'

import octokit from '@/api/octokit'

export type OpenPullRequestsList = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.issues.list
>['data']
