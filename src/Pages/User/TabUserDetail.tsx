import { usersType } from './type'

export default function TabUserDetail({ user }: { user: usersType }) {
    return (
        <div>
            <table className='custom-table table--overflow-y'>
                <tbody>
                    <tr>
                        <td>User ID:</td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td className='custom-table--nested'>
                            <tr>
                                <td>street:</td>
                                <td>{user.address.street}</td>
                            </tr>
                            <tr>
                                <td>suite:</td>
                                <td>{user.address.suite}</td>
                            </tr>
                            <tr>
                                <td>city:</td>
                                <td>{user.address.city}</td>
                            </tr>
                            <tr>
                                <td>zipcode:</td>
                                <td>{user.address.zipcode}</td>
                            </tr>
                            <tr>
                                <td>Map:</td>
                                <td>See on Map</td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Website:</td>
                        <td>{user.website}</td>
                    </tr>
                    <tr>
                        <td>Company</td>
                        <td className='custom-table--nested'>
                            <tr>
                                <td>name:</td>
                                <td>{user.company.name}</td>
                            </tr>
                            <tr>
                                <td>catchPhrase:</td>
                                <td>{user.company.catchPhrase}</td>
                            </tr>
                            <tr>
                                <td>bs:</td>
                                <td>{user.company.bs}</td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
