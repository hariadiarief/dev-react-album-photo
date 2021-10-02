import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { publicRoutes } from './Routes'

import { Layout } from './Components'

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    {publicRoutes.map((route, index) => (
                        <Route exact={route.exact} path={route.path} component={route.component} key={index} />
                    ))}
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
