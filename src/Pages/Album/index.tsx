import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../API'

type photoType = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export default function Album() {
    const { albumId } = useParams<{ albumId: string }>()
    const [photos, setPhotos] = useState<Array<photoType>>()
    const [user, setUser] = useState<{ name: string; email: string; id: number }>()

    const fetchPhotosAlbum = () => {
        API.get(`photos?albumId=${albumId}`).then((response) => {
            if (response.status === 200) {
                setPhotos(response.data)
            }
        })
    }
    useEffect(() => {
        if (!photos) {
            fetchPhotosAlbum()
        }
    }, [photos])

    const fetchUserFromAlbumId = () => {
        API.get(`/albums/${albumId}`).then((response) => {
            if (response.status === 200) {
                let { userId } = response.data
                API.get(`/users/${userId}`).then((response) => {
                    setUser(response.data)
                })
            }
        })
    }
    useEffect(() => {
        if (!user) {
            fetchUserFromAlbumId()
        }
    }, [user])

    return (
        <div className='container'>
            {user && (
                <div className='album__owner'>
                    <Link to={`/user/${user.id}`}>
                        <div className='album__title'>{user.name}</div>
                    </Link>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
            )}
            {photos && (
                <div className='album__grid '>
                    {photos.map((photo) => (
                        <div key={photo.id} className='album__grid__item'>
                            <img src={photo.thumbnailUrl} alt='' className='album__grid__item__thumbnail' />
                            <div className='album__grid__item__title' title={photo.title}>
                                <span>{photo.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
