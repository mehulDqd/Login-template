import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { ReduxState } from '../redux/reducer';
import { loginUser, fetchAllConfigurations } from '../redux/actions';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';

const LoginForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const { core: { configurations: { disable_passwd: disablePasswd } } } = useSelector(({ state }: ReduxState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllConfigurations());
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    event.preventDefault();
    setLoading(true);
    dispatch(loginUser(formData));
  };

  return (
    <ResponsiveContainer>
      <Segment vertical>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
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
                <Button loading={isLoading} type='submit' color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  )
};

export default LoginForm;
