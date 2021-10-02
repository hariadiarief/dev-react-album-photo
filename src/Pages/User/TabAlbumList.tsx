import { Link } from 'react-router-dom'
import { albumsType } from './type'

export default function TabAlbumList({ albums }: { albums: Array<albumsType> }) {
    return (
        <div className='user__grid container'>
            {albums.length !== 0 &&
                albums.map((album) => (
                    <Link key={album.id} to={`/album/${album.id}`} className='user__grid__item'>
                        {album.title}
                    </Link>
                ))}
        </div>
    )
}
