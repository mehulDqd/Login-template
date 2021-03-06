import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  CheckboxProps,
  Grid,
  Header,
  Segment,
  Table,
  Image,
} from 'semantic-ui-react';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import { ReduxState } from '../redux/reducer';
import { User } from '../utils/types';
import { fetchAllConfigurations, fetchAllUsers, updateConfiguration } from '../redux/actions'; 
import { useHistory } from 'react-router-dom';

const TableHeaders: React.FunctionComponent = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>First name</Table.HeaderCell>
      <Table.HeaderCell>Last name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

interface TableRowProps {
  data: User;
}

const TableRow: React.FunctionComponent<TableRowProps> = (props: TableRowProps) => {
  const {
    data: {
      first_name: firstName,
      last_name: lastName,
      id,
      email,
      image,
    }
  } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/profile/${id}`);    
  };

  return (
    <Table.Row key={id} className='clickable' onClick={handleClick}>
      <Table.Cell><Image className='table-picture' src={image} size='mini' bordered /></Table.Cell>
      <Table.Cell>{firstName}</Table.Cell>
      <Table.Cell>{lastName}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
    </Table.Row>
  );
};

const Dashboard: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { user: { currentUser , users }, core: { configurations } } = useSelector(({ state }: ReduxState) => state);
  const { is_admin: isAdmin } = currentUser;
  const { disable_passwd: disablePasswd } = configurations;
  const passwordProtection = !disablePasswd;
  const [passwordProt, setPasswordProt] = React.useState(passwordProtection);
  const rows = users.map((user: User) => <TableRow data={user} />);

  React.useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllConfigurations());
  }, []);

  const handleChange = (event: React.SyntheticEvent, data: CheckboxProps) => {
    setPasswordProt(!passwordProt);
    dispatch(updateConfiguration({ disable_passwd: !data.checked }));
  };

  if (!isAdmin) {
    return <></>;
  }

  return (
    <ResponsiveContainer>
      <Segment className='topPadding' vertical>
        <Grid container stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header content='Registered users' />
            </Grid.Column>
            <Grid.Column className='right'>
              <Checkbox onChange={handleChange} checked={passwordProt} toggle label='Password protection' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table className='customTable' inverted>
                <TableHeaders />
                <Table.Body>
                  {rows}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  );
};

export default Dashboard;
