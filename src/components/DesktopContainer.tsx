import * as React from 'react';
import { Menu, Segment, Container, Button } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/actions';
import { Media } from '../utils/media';
import { ReduxState } from '../redux/reducer';

interface Props {
  children: React.ReactNode;
}

const DesktopContainer: React.FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { children } = props;
  const { currentUser, accessToken } = useSelector(({ state }: ReduxState) => state.user);
  const { pathname } = useLocation();
  const goToProfile = () => history.push(`/profile/${currentUser?.id}`);
  const goToHome = () => history.push('/');
  const goToSignUp = () => history.push('/signup');
  const goToLogin = () => history.push('/signin');
  const goToDashboard = () => history.push('/dashboard');

  const handleLogout = () => {
    dispatch(logoutUser);
  };

  return (
    <Media greaterThan='mobile'>
      <Segment
        inverted
        textAlign='center'
        style={{ padding: '1em 0em' }}
        vertical
      >
        <Menu
          inverted
          pointing
          secondary
          size='large'
        >
          <Container>
            <Menu.Item onClick={goToHome} as='a' active={pathname === '/'}>Home</Menu.Item>
            {accessToken && currentUser && currentUser.id
              &&
                <Menu.Item onClick={goToProfile} as='a' active={pathname === `/profile/${currentUser.id}`}>
                  Profile
                </Menu.Item>}
            {(!accessToken || !currentUser || !currentUser.id) &&
            <Menu.Item position='right'>
              <Button onClick={goToLogin} as='a' inverted>
                  Log in
              </Button>
              <Button onClick={goToSignUp} as='a' inverted style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Menu.Item>}
            {(accessToken && currentUser?.id) &&
              <Menu.Item position='right'>
                <Button onClick={handleLogout} as='a' inverted style={{ marginLeft: '0.5em' }}>
                  Log out
                </Button>
              </Menu.Item>}
            {currentUser?.isAdmin &&
              <Menu.Item onClick={goToDashboard} as='a' active={pathname === '/dashboard'}>Dashboard</Menu.Item>}
          </Container>
        </Menu>
      </Segment>
      {children}
    </Media>
  );
};

export default DesktopContainer;
