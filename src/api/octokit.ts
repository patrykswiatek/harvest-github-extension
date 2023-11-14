import { createTokenAuth } from '@octokit/auth-token'
import { Octokit } from 'octokit'

const auth = createTokenAuth(process.env.REACT_APP_GITHUB_TOKEN || '')
const { token } = await auth()
const octokit = new Octokit({ auth: token })

export default octokit
