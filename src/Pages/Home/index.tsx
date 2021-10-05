import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API'
import { ToastContainer, toast } from 'react-toastify'

type AlbumType = {
    id: number
    title: string
    userId: number
    userName: string
}

export default function Home() {
    const [albums, setAlbums] = useState<Array<AlbumType>>([])
    const [filtreDalbums, setFiltreDalbums] = useState<Array<AlbumType>>([])
    const [search, setSearch] = useState('')

    const fetchAlbum = async () => {
        let albums: any[] = []
        let users: any[] = []
        await API.get(`/albums`)
            .then((response) => {
                if (response.status === 200) {
                    albums = response.data
                }
            })
            .catch(() => toast.error('Network error, try letter'))

        await API.get(`/users`)
            .then((response) => {
                if (response.status === 200) {
                    users = response.data
                }
            })
            .catch(() => toast.error('Network error, try letter'))

        await albums.forEach((album, index) => {
            users.find((user) => {
                if (user.id === album.userId) Object.assign(albums[index], { ...album, userName: user.name })
            })
        })

        setAlbums(albums)
        setFiltreDalbums(albums)
    }
    useEffect(() => {
        if (!albums.length) {
            fetchAlbum()
        }
    }, [albums])

    const filteredAlbum = () => {
        console.log({ albums })

        if (search) {
            let newData = albums.filter(
                (item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.userName.toLowerCase().includes(search.toLowerCase())
            )
            console.log({ newData })

            setFiltreDalbums(newData)
        }
        if (search === '') setFiltreDalbums(albums)
    }
    useEffect(() => {
        filteredAlbum()
    }, [search, albums])

    return (
        <div className='container'>
            <div className='home__title' placeholder='search user name or album name'>
                List of Albums
            </div>

            <input className='home__search' type='text' value={search} onChange={({ target: { value } }) => setSearch(value)} />

            {!filtreDalbums.length ? (
                <div className='search--not-found'>
                    <span>Sorry</span>
                    <span>No Results Found.</span>
                    <span>Please try another search</span>
                </div>
            ) : (
                <div className='home__grid '>
                    {filtreDalbums.map((album) => (
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
            )}
            <ToastContainer />
        </div>
    )
}
