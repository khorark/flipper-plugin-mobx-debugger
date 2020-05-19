import React from 'react';
import {
  FlipperPlugin,
  FlexColumn,
  KeyboardActions,
  Text,
  ButtonGroup,
  Button,
  ButtonGroupChain,
  Link,
  Panel,
  styled,
  Sidebar,
  DetailSidebar,
  View,
  FlexBox,
} from 'flipper';
import MobxTree from './components/MobxTree/MobxTree';

import demoData from './json/demo.json';

type State = {};

type Data = {};

type PersistedState = {
  data: Array<Data>;
};

const Container = styled(FlexBox)({
  flex: 1,
});

export default class extends FlipperPlugin<State, any, PersistedState> {
  static keyboardActions: KeyboardActions = ['clear'];

  static defaultPersistedState: PersistedState = {
    data: [],
  };

  static persistedStateReducer = (persistedState: PersistedState, method: string, data: Data): PersistedState => {
    return {
      ...persistedState,
      data: persistedState.data.concat([data]),
    };
  };

  state = {};

  onKeyboardAction = (action: string) => {
    if (action === 'clear') {
      this.props.setPersistedState({ data: [] });
    }
  };

  render() {
    console.log('this.props => ', this.props);

    // {this.props.persistedState.data.map((d) => (
    //   <div>{d.id}</div>
    // ))}

    return (
      <Container>
        <View style={{ flex: 1 }} />
        <MobxTree data={demoData} />
      </Container>
    );
  }
}
