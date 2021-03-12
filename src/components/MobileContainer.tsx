import * as React from 'react';
import { Sidebar, Menu, Segment, Container, Button, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Media } from '../utils/media';
import { ReduxState } from '../redux/reducer';

interface Props {
  children: React.ReactNode;
}

const MobileContainer: React.FunctionComponent<Props> = (props) => {
  const { children } = props;
  const history = useHistory();
  const [sidebarIsOpen, setSidebarOpen] = React.useState(false);
  const { currentUser, accessToken } = useSelector(({ state }: ReduxState) => state.user);
  const { pathname } = useLocation();
  const goToProfile = () => history.push(`/profile/${currentUser?.id}`);
  const goToHome = () => history.push('/');
  const goToSignUp = () => history.push('/signup');
  const goToLogin = () => history.push('/signin');
  const goToDashboard = () => history.push('/dashboard');

  const hideSidebar = () => {
    setSidebarOpen(false);
  };

  const showSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <Media at='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={hideSidebar}
          vertical
          visible={sidebarIsOpen}
        >
          <Menu.Item onClick={goToHome} as='a' active={pathname === '/'}>Home</Menu.Item>
          {currentUser
            &&
            <Menu.Item onClick={goToProfile} as='a' active={pathname === `/profile/${currentUser.id}`}>
              Profile
            </Menu.Item>}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarIsOpen}>
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={showSidebar}>
                  <Icon name='sidebar' />
                </Menu.Item>
                {(!accessToken || !currentUser || !currentUser.id) &&
                <Menu.Item position='right'>
                  <Button onClick={goToLogin} as='a' inverted>
                    Log in
                  </Button>
                  <Button onClick={goToSignUp} as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>}
                {currentUser?.isAdmin &&
                  <Menu.Item onClick={goToDashboard} as='a' active={pathname === '/dashboard'}>Dashboard</Menu.Item>}
              </Menu>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
};

export default MobileContainer;
