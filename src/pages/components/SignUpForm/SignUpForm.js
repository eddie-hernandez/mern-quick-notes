import React, { Component } from 'react'
import { signUp } from '../../utilities/users-services'

export default class SignUpForm extends Component {
    // state is just a POJO

defaultState = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
}

    state = this.defaultState;

    handleChange = (event) => {
        this.setState({
            // name, email, password, confirm
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        // alert(JSON.stringify(this.state))
        // try something if it works – GREAT!
        try {
            // taking the state, making a copy of it, and assigning it to formData var
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm
            console.log(formData)

            // wait for a response back from the server
            const user = await signUp(formData)
            // now logging the token
            this.props.setUser(user)

        } catch (error) {
            console.log(error)
            // error handle
            this.setState({
                error: 'Sign Up failed – Try again later'
            })
        }
        this.setState(this.defaultState)
    }

    render() {

        const disable = this.state.password !== this.state.confirm

        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required></input>
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                        <label>Confirm</label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }
}