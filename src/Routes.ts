import Home from './Pages/Home'
import Favorite from './Pages/Favorite'
import User from './Pages/User'
import About from './Pages/About'
import Album from './Pages/Album'

export const publicRoutes = [
    {
        component: Home,
        path: '/',
        exact: true,
    },
    {
        component: About,
        path: '/about',
        exact: true,
    },
    {
        component: Favorite,
        path: '/favorite',
        exact: true,
    },
    {
        component: Album,
        path: '/album/:albumId',
        exact: true,
    },
    {
        component: User,
        path: '/user/:userID',
        exact: false,
    },
]
