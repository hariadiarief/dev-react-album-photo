import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API'

type AlbumType = {
    id: number
    title: string
    userId: number
    userName: string
}

export default function Home() {
    const [albums, setAlbums] = useState<Array<AlbumType>>([])

    const fetchAlbum = async () => {
        let albums: any[] = []
        let users: any[] = []

        await API.get(`/albums`).then((response) => {
            if (response.status === 200) {
                albums = response.data
            }
        })

        await API.get(`/users`).then((response) => {
            if (response.status === 200) {
                users = response.data
            }
        })

        await albums.forEach((album, index) => {
            users.find((user) => {
                if (user.id === album.userId) Object.assign(albums[index], { ...album, userName: user.name })
            })
        })

        setAlbums(albums)
    }
    useEffect(() => {
        if (!albums.length) {
            fetchAlbum()
        }
    }, [albums])

    return (
        <div>
            <div className='home__title'>List of Albums</div>
            <div className='home__grid container'>
                {albums.length !== 0 &&
                    albums.map((album) => (
                        <div key={album.id} className='home__grid__item'>
                            <Link className='home__grid__item__title' to={`/album/${album.id}`}>
                                {album.title}
                            </Link>
                            <div className='home__grid__item__user'>
                                <Link to={`/user/${album.userId}`}>{album.userName}</Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
