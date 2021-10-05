import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'

import { ReactComponent as IconLoveFilled } from '../../Assets/love-filled.svg'

const SHOW_MODAL_DETAIL = 1

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

type commentType = {
    photoId: number
    username: string
    comment: string
}

export default function Favorite() {
    const [whichModalShow, setWhichModalShow] = useState<modalType>({ type: 1, selectedPhoto: null })
    const [favoritePhoto, setFavoritePhoto] = useState<Array<favoriteType> | []>(JSON.parse(localStorage.getItem('favoritePhoto') || '[]'))
    const [inputComment, setInputComment] = useState({
        username: '',
        comment: '',
    })
    const [comments, setComments] = useState<Array<commentType> | []>(JSON.parse(localStorage.getItem('comments') || '[]'))

    const favoriteToggle = (parms: photoType) => {
        let payload: any[] = JSON.parse(localStorage.getItem('favoritePhoto') || '[]')
        payload = payload.filter((item) => item.id !== parms.id)
        localStorage.setItem('favoritePhoto', JSON.stringify(payload))
        setFavoritePhoto(payload)
    }

    const addComent = (e: any) => {
        e.preventDefault()
        let payload: any[] = JSON.parse(localStorage.getItem('comments') || '[]')
        let params = {
            photoId: whichModalShow.selectedPhoto?.id,
            ...inputComment,
        }

        payload.push({ ...params })
        localStorage.setItem('comments', JSON.stringify(payload))
        setInputComment({ comment: '', username: '' })
        setComments(payload)
    }

    return (
        <div className='container'>
            <div className='home__title'>Favorit Photo</div>

            {!favoritePhoto.length ? (
                <div className='search--not-found'>
                    <span>Sorry</span>
                    <span>No Results Found.</span>
                    <span>Please try another search</span>
                </div>
            ) : (
                <div className='album__grid'>
                    {favoritePhoto.map((photo) => (
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
                onRequestClose={() => {
                    setWhichModalShow({ type: 0, selectedPhoto: null })
                    setInputComment({ comment: '', username: '' })
                }}
                contentLabel='Modal Photo'
                className='modal-container'
                overlayClassName='moda-overley-center'
            >
                <div className='container'>
                    <div className='modal__detail'>
                        <img src={whichModalShow.selectedPhoto?.url} alt='' />
                        <div className='modal__detail__comment'>
                            <form onSubmit={(e) => addComent(e)}>
                                <label id='username'>User Name</label>
                                <input
                                    id='username'
                                    type='text'
                                    placeholder='Username'
                                    value={inputComment.username}
                                    onChange={({ target: { value } }) => setInputComment((prevState) => ({ ...prevState, username: value }))}
                                />
                                <label id='comment'>Comment</label>
                                <textarea
                                    name=''
                                    id='comment'
                                    value={inputComment.comment}
                                    onChange={({ target: { value } }) => setInputComment((prevState) => ({ ...prevState, comment: value }))}
                                ></textarea>
                                <button>Send</button>
                            </form>
                            <hr />
                            {comments.find((comment) => comment.photoId === whichModalShow.selectedPhoto?.id) ? (
                                comments
                                    .filter((comment) => comment.photoId === whichModalShow.selectedPhoto?.id)
                                    .map((item) => (
                                        <div className='modal__detail__comment__item'>
                                            <b>{item.username}</b>
                                            <div>{item.comment}</div>
                                        </div>
                                    ))
                            ) : (
                                <div>no comments yet, be the first one</div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    )
}
