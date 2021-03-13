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
import { User } from '../utils/types';
import { mapUser } from '../utils/utils';

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
  const { user: { currentUser, users } } = useSelector(({ state }: ReduxState) => state);
  const currUser = mapUser(currentUser);
  const { id } = useParams<ProfileProps>();
  const profileIsNotFromCurrentUser = currUser.isAdmin && parseInt(id, 10) !== currUser.id;
  const altUser = mapUser(users.find((user: User) => user.id === parseInt(id, 10)) || {});

  React.useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  return (
    <ResponsiveContainer>
      <Segment className='topPadding' vertical>
        <Grid container stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Image bordered rounded size='small' src={profileIsNotFromCurrentUser ? altUser.image : currUser.image} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="firstname"
                value={profileIsNotFromCurrentUser ? altUser.firstName : currUser.firstName}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="lastname"
                value={profileIsNotFromCurrentUser ? altUser.lastName : currUser.lastName}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="email"
                value={profileIsNotFromCurrentUser ? altUser.email : currUser.email}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="birth"
                value={profileIsNotFromCurrentUser ? altUser.birth : currUser.birth}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SubItem
                name="phone number"
                value={profileIsNotFromCurrentUser ? altUser.phoneNumber : currUser.phoneNumber}
              />
            </Grid.Column>
            <Grid.Column>
              <SubItem
                name="address"
                value={profileIsNotFromCurrentUser ? altUser.address : currUser.address}
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
