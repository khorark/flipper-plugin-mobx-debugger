import React, { memo, useState, useCallback } from 'react';
import { FlexRow, Input, MultiLineInput, Button, Select, styled } from 'flipper';
import { DispatchAction } from '../..';

const commonMargin = {
  margin: '0.5em 1em 0.5em 1em',
};

const textBox = {
  flex: 1,
  height: '100px',
  ...commonMargin,
};

const selectOptions = {
  replace: 'replace',
  add: 'add',
  remove: 'remove',
};

const SelectOp = styled(Select)({
  ...commonMargin,
});

type op = 'replace' | 'add' | 'remove';

interface IProps {
  onDispatch: (payload: DispatchAction) => void;
}

const DispatchComponent: React.FC<IProps> = ({ onDispatch }) => {
  const [path, setPath] = useState('');
  const [invokePayloadString, setinvokeActionPayloadString] = useState('');
  const [op, setOp] = useState<op>('add');

  const setPathHandler = useCallback((event) => setPath(event.target.value), []);
  const setinvokePayloadStringHandler = useCallback((event) => setinvokeActionPayloadString(event.target.value), []);
  const onDispatchHandler = useCallback(() => {
    const value = invokePayloadString.trim() == '' ? [] : JSON.parse(invokePayloadString);
    onDispatch({
      op,
      path,
      value,
    });
  }, [path, invokePayloadString]);

  const onChangeWithKey = useCallback((key: op) => setOp(key), []);

  return (
    <>
      <FlexRow>
        <SelectOp options={selectOptions} selected={op} onChangeWithKey={onChangeWithKey} />
      </FlexRow>
      <FlexRow>
        <Input placeholder={'Type your path here'} style={commonMargin} onChange={setPathHandler} />
      </FlexRow>
      <FlexRow>
        <MultiLineInput
          placeholder={'Type your payload json here'}
          style={textBox}
          onChange={setinvokePayloadStringHandler}
        />
      </FlexRow>
      <FlexRow>
        <Button onClick={onDispatchHandler} style={commonMargin}>
          Apply patch
        </Button>
      </FlexRow>
    </>
  );
};

export default memo(DispatchComponent);
