import { useEffect, useState } from 'react'
import { useParams, Switch, Route, NavLink } from 'react-router-dom'
import API from '../../API'

import TabAlbumList from './TabAlbumList'
import TabUserDetail from './TabUserDetail'
import { usersType } from './type'

export default function User() {
    const { userID } = useParams<{ userID: string }>()
    const [user, setUser] = useState<usersType>()
    const [album, setAlbum] = useState<string[]>([])

    const fetchUserDetail = () => {
        API.get(`/users/${userID}`).then((response) => {
            if (response.status === 200) {
                setUser(response.data)
            }
        })

        API.get(`/albums/?userId=${userID}`).then((response) => {
            if (response.status === 200) {
                setAlbum(response.data)
            }
        })
    }
    useEffect(() => {
        if (!album.length && !user) {
            fetchUserDetail()
        }
    }, [user, album])

    return (
        <div className='container'>
            <div className='user__title'>{user?.name}</div>
            <div className='tableDashboard__navigations'>
                <NavLink className='tableDashboard__navigation' activeClassName='tableDashboard__navigation--active' exact to={`/user/${userID}`}>
                    Detail
                </NavLink>

                <NavLink className='tableDashboard__navigation' activeClassName='tableDashboard__navigation--active' exact to={`/user/${userID}/album`}>
                    Album
                </NavLink>
            </div>

            {user && album && (
                <Switch>
                    <Route exact={true} path='/user/:userID' render={() => <TabUserDetail user={user} />} />
                    <Route exact={true} path='/user/:userID/album' render={() => <TabAlbumList />} />
                </Switch>
            )}
        </div>
    )
}
