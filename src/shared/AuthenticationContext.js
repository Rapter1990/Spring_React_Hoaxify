// 201) AuthenticationContext Component yarattık Authentication olayını en üstte tutmak için (stateful)
import React, { Component } from 'react';

// 202) Authentication değişkeni oluşturduk context olduğu bir component olarak belirledik.
export const Authentication = React.createContext();

class AuthenticationContext extends Component {
  state = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  onLoginSuccess = authState => {
    this.setState({
      ...authState, // authState.username, authState.displayName, authState.image, authState.password 
      isLoggedIn: true
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      username: undefined
    });
  };
  render() {
    return (
      <Authentication.Provider
        value={{
          state: { ...this.state },
          onLoginSuccess: this.onLoginSuccess,
          onLogoutSuccess: this.onLogoutSuccess
        }}
      >
        {this.props.children}
      </Authentication.Provider>
    );
  }
}

export default AuthenticationContext;