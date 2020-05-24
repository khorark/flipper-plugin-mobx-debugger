import React from 'react';
import { FlipperPlugin, FlexColumn, Button, MultiLineInput, FlexRow, Input, ErrorBlock } from 'flipper';
import SidebarComponent from './components/SidebarComponent';
import SearchComponent from './components/SearchComponent';
import DispatchComponent from './components/DispatchComponent/DispatchComponent';

type State = {
  selectedId: string;
  error: string | null;
};

export type Row = {
  id: string;
  action: {
    type: string;
    payload: any;
  };
  took: string;
  time: string;
  before: object;
  after: object;
};

type PersistedState = {
  actions: Row[];
};

export enum TabLabel {
  state = 'StateTree',
  diff = 'Diff',
}

export type DispatchAction = {
  op: 'replace' | 'add' | 'remove';
  path: string;
  value: any;
};

export default class ReduxViewer extends FlipperPlugin<State, any, any> {
  state = {
    selectedId: '',
    error: '',
  };

  static defaultPersistedState: PersistedState = {
    actions: [],
  };

  static persistedStateReducer(persistedState: PersistedState, method: string, payload: Row) {
    console.log('payload: ', payload);
    console.log('method', method);

    switch (method) {
      case 'init':
        return {
          ...persistedState,
          actions: [payload],
        };
      case 'action':
        return {
          ...persistedState,
          actions: [...persistedState.actions, payload],
        };
      default:
        return persistedState;
    }
  }

  onRowHighlighted = (key: string[]) => {
    this.setState({ selectedId: key[0] });
  };

  clear = () => {
    this.setState({ selectedId: '' });
    this.props.setPersistedState({ actions: [] });
  };

  handleDispatch = (payload: DispatchAction) => {
    this.setState({ error: null });

    try {
      this.client.call('applyPatch', payload).then((res) => {
        if (res.error) {
          this.setState({ error: res.message });
        }
      });
    } catch (ex) {
      if (ex instanceof SyntaxError) {
        // json format wrong
        console.group('WrongJsonFormat');
        console.error(ex);
        console.groupEnd();
      } else {
        console.group('DispatchError');
        console.error(ex);
        console.groupEnd();
      }

      this.setState({ error: ex });
    }
  };

  render() {
    const { error, selectedId } = this.state;
    const { actions } = this.props.persistedState;

    return (
      <FlexColumn grow={true}>
        {error && <ErrorBlock error={error}></ErrorBlock>}
        <DispatchComponent onDispatch={this.handleDispatch} />
        <SearchComponent actions={actions} onPress={this.onRowHighlighted} onClear={this.clear} />
        <SidebarComponent selectedId={selectedId} actions={actions} />
      </FlexColumn>
    );
  }
}
