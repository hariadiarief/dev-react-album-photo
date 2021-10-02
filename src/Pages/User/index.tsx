import { useEffect, useState } from 'react'
import { useParams, Switch, Route, NavLink } from 'react-router-dom'
import API from '../../API'

import TabAlbumList from './TabAlbumList'
import TabUserDetail from './TabUserDetail'
import { usersType, albumsType } from './type'

export default function User() {
    const { userID } = useParams<{ userID: string }>()
    const [user, setUser] = useState<usersType>()
    const [albums, setAlbums] = useState<Array<albumsType>>()

    const fetchUserDetail = () => {
        API.get(`/users/${userID}`).then((response) => {
            if (response.status === 200) {
                setUser(response.data)
            }
        })

        API.get(`/albums/?userId=${userID}`).then((response) => {
            if (response.status === 200) {
                setAlbums(response.data)
            }
        })
    }
    useEffect(() => {
        if (!albums && !user) {
            fetchUserDetail()
        }
    }, [user, albums])

    return (
        <div className='container'>
            <div className='user__title'>{user?.name}</div>
            <div className='tableDashboard__navigations'>
                <NavLink className='tableDashboard__navigation' activeClassName='tableDashboard__navigation--active' exact to={`/user/${userID}`}>
                    Detail
                </NavLink>

                <NavLink className='tableDashboard__navigation' activeClassName='tableDashboard__navigation--active' exact to={`/user/${userID}/album`}>
                    My Album
                </NavLink>
            </div>

            {user && albums && (
                <Switch>
                    <Route exact={true} path='/user/:userID' render={() => <TabUserDetail user={user} />} />
                    <Route exact={true} path='/user/:userID/album' render={() => <TabAlbumList albums={albums} />} />
                </Switch>
            )}
        </div>
    )
}
