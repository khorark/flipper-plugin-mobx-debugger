import React, { memo, useState, useCallback } from 'react';
import { FlexRow, Input, MultiLineInput, Button } from 'flipper';

const commonMargin = {
  margin: '0.5em 1em 0.5em 1em',
};

const textBox = {
  flex: 1,
  height: '100px',
  ...commonMargin,
};

interface IProps {
  onDispatch: (payload: { action: string; payload: any }) => void;
}

const DispatchComponent: React.FC<IProps> = ({ onDispatch }) => {
  const [invokeActionName, setinvokeActionName] = useState('');
  const [invokeActionPayloadString, setinvokeActionPayloadString] = useState('');

  const setinvokeActionNameHandler = useCallback((event) => setinvokeActionName(event.target.value), []);
  const setinvokeActionPayloadStringHandler = useCallback(
    (event) => setinvokeActionPayloadString(event.target.value),
    [],
  );
  const onDispatchHandler = useCallback(() => {
    const payload = invokeActionPayloadString.trim() == '' ? [] : JSON.parse(invokeActionPayloadString);
    onDispatch({ action: invokeActionName, payload });
  }, [invokeActionName, invokeActionPayloadString]);

  return (
    <>
      <FlexRow>
        <Input placeholder={'Type your action here'} style={commonMargin} onChange={setinvokeActionNameHandler} />
      </FlexRow>
      <FlexRow>
        <MultiLineInput
          placeholder={'Type your payload json here'}
          style={textBox}
          onChange={setinvokeActionPayloadStringHandler}
        />
      </FlexRow>
      <FlexRow>
        <Button onClick={onDispatchHandler} style={commonMargin}>
          Dispatch
        </Button>
      </FlexRow>
    </>
  );
};

export default memo(DispatchComponent);
