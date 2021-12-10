import './styles/index.scss'

import { Layout } from 'widgets/layout/ui'

import { Routing, paths } from './routing'

export const App = () => {
  return (
    <Layout>
      <Routing paths={paths} />
    </Layout>
  )
}
