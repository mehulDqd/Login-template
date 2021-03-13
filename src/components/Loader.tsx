import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Segment,
  Grid,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { ReduxState } from '../redux/reducer';

interface Props {
  children: React.ReactNode;
}

const LoadingScreen: React.FunctionComponent<Props> = (props: Props) => {
  const { loaded } = useSelector(({ state }: ReduxState) => state.core);

  if (loaded) {
    return <>{props.children}</>;
  }

  return (
    <Segment vertical>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default LoadingScreen;
