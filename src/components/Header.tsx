import * as React from 'react';
import { Menu, Button } from 'semantic-ui-react';

interface Props {
  activeItem: string;
}

const HeaderComponent: React.FunctionComponent<Props> = (props) => {
  const { activeItem } = props;

  const handleItemClick = () => {
    console.log('Click');
  };

  return (
    <Menu size='massive'>
    <Menu.Item
      name='home'
      active={activeItem === 'home'}
      onClick={handleItemClick}
    />
    <Menu.Item
      name='profile'
      active={activeItem === 'profile'}
      onClick={handleItemClick}
    />

    <Menu.Menu position='right'>
      <Menu.Item>
        <Button primary>Login</Button>
      </Menu.Item>
      <Menu.Item>
        <Button primary>Signup</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
  );
};

export default HeaderComponent;
