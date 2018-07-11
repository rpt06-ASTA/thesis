import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      onDashboardPage: false
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginUser() {
    if (this.state.email === '' || this.state.password === '') {
      alert('Email and Password fields cannot be empty. Enter new values.');
    } else {
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      axios.post('/loginuser', data)
      .then(result => {
        if (result.data === 'no user') {
          alert(`User with email ${this.state.email} does not exist. Sign up.`);
        } else if (result.data.found) {
          // correct username and password
          alert(`${result.data.name} is logged in`);
          // redirect to dashboard
          this.setState({
            onDashboardPage: true
          })
        } else {
          // incorrect password
          alert('Incorrect password. Try again.');
        }
      })
    }
  }

  render() {
    if (this.state.onDashboardPage) {
      return (
        <Redirect to='/dashboard' />
      )
    }
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '90%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Login to your account
            </Header>
            <Form size='large' onSubmit={this.loginUser.bind(this)}>
              <Segment raised>
                <Form.Input
                  name='email'
                  value={this.state.email}
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  name='password'
                  value={this.state.password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Login' color='blue' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              New to us?&nbsp; <Link to='/signup'><Button primary basic size='small'>Sign up</Button></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default LoginPage;
