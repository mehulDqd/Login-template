import * as React from 'react';
import { Segment, Container, Grid, Header } from 'semantic-ui-react';

const Footer: React.FunctionComponent = () => {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
            </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
            </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>    
  );
};

export default Footer;
