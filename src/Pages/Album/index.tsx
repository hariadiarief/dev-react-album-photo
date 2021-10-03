import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from 'react-modal'

import API from '../../API'

import { ReactComponent as IconLoveFilled } from '../../Assets/love-filled.svg'

const SHOW_MODAL_DETAIL = 1
const SHOW_MODAL_COMMENT = 2

type photoType = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

type modalType = {
    type: number
    selectedPhoto: photoType | null
}

type favoriteType = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
    albumTitle: string
}

export default function Album() {
    const { albumId } = useParams<{ albumId: string }>()
    const [photos, setPhotos] = useState<Array<photoType>>()
    const [user, setUser] = useState<{ name: string; email: string; id: number }>()
    const [album, setAlbum] = useState<{ title: string }>()

    const [whichModalShow, setWhichModalShow] = useState<modalType>({ type: 1, selectedPhoto: null })
    const [favoritePhoto, setFavoritePhoto] = useState<Array<favoriteType> | []>(JSON.parse(localStorage.getItem('favoritePhoto') || '[]'))

    const fetchPhotosAlbum = () => {
        API.get(`photos?albumId=${albumId}`).then((response) => {
            if (response.status === 200) setPhotos(response.data)
        })
    }
    useEffect(() => {
        if (!photos) fetchPhotosAlbum()
    }, [photos])

    const fetchUserFromAlbumId = () => {
        API.get(`/albums/${albumId}`).then((response) => {
            if (response.status === 200) {
                setAlbum(response.data)
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

    const favoriteToggle = (parms: photoType) => {
        let payload: any[] = JSON.parse(localStorage.getItem('favoritePhoto') || '[]')

        if (payload.map((item) => item.id).includes(parms.id)) {
            payload = payload.filter((item) => item.id !== parms.id)
        } else {
            payload.push({ ...parms, albumTitle: album?.title })
        }

        localStorage.setItem('favoritePhoto', JSON.stringify(payload))
        setFavoritePhoto(payload)
    }

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
                <div className='album__grid'>
                    {photos.map((photo) => (
                        <div key={photo.id} className='album__grid__item'>
                            <button className={`ablum__like`} onClick={() => favoriteToggle(photo)}>
                                <IconLoveFilled className={`ablum__like__icon${favoritePhoto.map((item) => item.id).includes(photo.id) ? '--liked' : ''}`} />
                            </button>
                            <div onClick={() => setWhichModalShow({ type: SHOW_MODAL_DETAIL, selectedPhoto: photo })}>
                                <img src={photo.thumbnailUrl} alt='' className='album__grid__item__thumbnail' />
                                <div className='album__grid__item__title' title={photo.title}>
                                    <span>{photo.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={whichModalShow.type !== 0 && whichModalShow.selectedPhoto !== null}
                onRequestClose={() =>
                    setWhichModalShow({
                        type: 0,
                        selectedPhoto: null,
                    })
                }
                contentLabel='Modal Photo'
                className='modal-container'
                overlayClassName='moda-overley-center'
            >
                {photos && renderWhicModal()}
            </Modal>
        </div>
    )

    function renderWhicModal() {
        switch (whichModalShow.type) {
            case SHOW_MODAL_DETAIL:
                return (
                    <div className='container'>
                        <div className='modal__detail'>
                            <img src={whichModalShow.selectedPhoto?.url} alt='' />
                            <div className='modal__detail__comment'>
                                <form>
                                    <label id='username'>User Name</label>
                                    <input id='username' type='text' placeholder='Username' />
                                    <label id='comment'>Comment</label>
                                    <textarea name='' id='comment'></textarea>
                                    <button>Send</button>
                                </form>
                                <hr />
                                <div>no comments yet, be the first one</div>
                            </div>
                        </div>
                    </div>
                )
            default:
                break
        }
    }
}
