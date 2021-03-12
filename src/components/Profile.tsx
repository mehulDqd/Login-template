import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import { fetchUser } from '../redux/actions';
import { ReduxState } from '../redux/reducer';

type Props = {
  name: string;
  value: string;
}

const SubItem: React.FunctionComponent<Props> = ({ name, value }: Props) => (
  <div>
    <Header sub size="large">{name}</Header>
    <span>{value}</span>
  </div>
);

interface ProfileProps {
  id: string;
}

const Profile: React.FunctionComponent<ProfileProps> = () => {
  const dispatch = useDispatch();
  const { user: { currentUser } } = useSelector(({ state }: ReduxState) => state);
  const {
    first_name: firstName = '',
    last_name: lastName = '',
    email = '',
    birth = '',
    phone_number: phoneNumber = '',
    address = '',
    image = '',
  } = currentUser;
  const { id } = useParams<ProfileProps>();

  React.useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Image bordered rounded size='small' src={image} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="firstname"
                value={firstName}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="lastname"
                value={lastName}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="email"
                value={email}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="birth"
                value={birth}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="phone number"
                value={phoneNumber}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="address"
                value={address}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  );
}

export default Profile;
