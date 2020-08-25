import React ,{Component} from 'react'

import jwt_decode from 'jwt-decode'

class Profile extends Component
{
    constructor()
    {
        super()
        this.state={
            first_name:' ',
            last_name:' ',
            username:' ',
            phone_number:' '
        }
    }
    componentDidMount(){
        const token =localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name:decoded.first_name,
            last_name:decoded.last_name,
            phone_number:decoded.phone_number,
            username:decoded.username
        })
    }
    render()
    {
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className= "col-sm-8 mx-auto">
                        <h1 className="text-center"> PROFILE</h1>
                    </div>
                    <table className ="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            
                            <tr>
                                <td>UserName</td>
                                <td>{this.state.username}</td>
                            </tr>
                            
                            <tr>
                                <td>Phone Number</td>
                                <td>{this.state.phone_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Profile