import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Form,
  Segment,
  Button,
  InputOnChangeData,
} from 'semantic-ui-react';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import { registerUser } from '../redux/actions';

const Registration: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const [confirmedPassword, setConfirmedPassword] = React.useState('');
  const handlePasswordChange = (event: React.SyntheticEvent, data: InputOnChangeData) => {
    setPassword(data.value);
  };
  const handleConfirmPasswordChange = (event: React.SyntheticEvent, data: InputOnChangeData) => {
    setConfirmedPassword(data.value);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    event.preventDefault();

    if (password !== confirmedPassword) {
      return false;
    }

    dispatch(registerUser(formData));
  };

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Form onSubmit={handleSubmit}>
          <Grid container stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='First name'
                  name='first_name'
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Last name'
                  name='last_name'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Birth date'
                  name='birth'
                  type='date'
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Phone number'
                  name='phone_number'
                  type='phone'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Email'
                  name='email'
                  type='email'
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Picture'
                  name='image'
                  type='file'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  label='Address'
                  name='address'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  error={password !== confirmedPassword}
                  onChange={handlePasswordChange}
                  label='Password'
                  name='password'
                  type='password'
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  required
                  error={password !== confirmedPassword}
                  onChange={handleConfirmPasswordChange}
                  label='Confirm password'
                  name='password2'
                  type='password'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={1}>
              <Grid.Column>
                <Button type='submit'>Submit</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  );
}

export default Registration;
