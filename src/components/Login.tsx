import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { ReduxState } from '../redux/reducer';
import { loginUser, fetchAllConfigurations } from '../redux/actions';

const LoginForm = () => {
  const { core: { configurations: { disable_passwd: disablePasswd } } } = useSelector(({ state }: ReduxState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllConfigurations());
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
      </Header>
        <Form onSubmit={handleSubmit} size='large'>
          <Segment stacked>
            <Form.Input required name='email' fluid icon='user' iconPosition='left' />
            {!disablePasswd &&
              <Form.Input
                fluid
                icon='lock'
                required={true}
                iconPosition='left'
                name='password'
                placeholder='Password'
                type='password'
              />}
            <Button type='submit' color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
};

export default LoginForm;
