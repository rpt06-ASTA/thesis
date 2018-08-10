import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Container, Menu, Header, Button, Input, Search } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import ArticleItem from './ArticleItem.jsx';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: '',
      value: '',
      isLoading: false,
      results: [],
      onLandingPage: false,
      article: null,
    };
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleResultSelect(e, { result }) {
    this.setState({
      value: result.title,
      article: result
    });
  }

  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      value: value
    });
    axios.get(`/search?term=${value}`)
      .then(searchResults => {
        var searchResults = searchResults.data.hits;
        var results = searchResults.map(item => item._source);
        this.setState ({
          isLoading: false,
          results: results
        })
      });
  }

  handleLogout() {
    this.props.updateUserInfo({user: '', companyId: '', company: '', role: ''})
    axios.get('/logout')
      .then(result => {
        if (result.data === 'logged out') {
          this.props.history.push('/');
        }
      })
  }

  render () {
    if (this.state.article) {
      // go to article selected from search results
      var article = this.state.article;
      return (
        <Redirect to={{
          pathname: `/articles/${article.id}`,
          state: { article: article }
        }} />
      );
    }
    // show login and signup buttons if user is not logged in
    // show logout button if user is logged in
    if (this.props.user === '') {
      return (
        <Container className='navbar'>
        <Menu fixed='top' inverted>
          <Menu.Item>
            <Link to='/home'><Header as='h1' style={{ 'color': '#61dafb' }}>Know-how</Header></Link>
          </Menu.Item>
          <Menu.Item position='right'>
           <Button primary><Link className='nav-button' to='/signup'>Sign up</Link></Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary><Link className='nav-button' to='/login'>Login</Link></Button>
          </Menu.Item>
        </Menu>
        </Container>
      );
    } else if (this.props.user !== '') {
      const { results, value, isLoading } = this.state;
      return (
        <Container className='navbar'>
          <Menu fixed='top' inverted>
            <Menu.Item>
              <Link to='/home'><Header as='h1' style={{ 'color': '#61dafb' }}>Know-how</Header></Link>
            </Menu.Item>
            <Menu.Item  position='right'>
              <p>Hello {this.props.user}</p>
            </Menu.Item>
            <Menu.Item>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
              />
            </Menu.Item>
            <Menu.Item>
              <Button primary onClick={() => this.handleLogout()}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Container>
      );
    }
  }

}

export default withRouter(NavBar);
