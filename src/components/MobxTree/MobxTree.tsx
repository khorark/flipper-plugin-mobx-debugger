// import { PureComponent } from 'flipper';
import React, { memo, useState, useCallback } from 'react';
import {
  styled,
  Sidebar,
  ToggleButton,
  Button,
  View,
  Panel,
  Glyph,
  Text,
  colors,
  TabsContainer,
  Tabs,
  Tab,
} from 'flipper';

interface IProps {
  readonly data: Object;
}

const MobxTreeContainer = styled(Sidebar)({
  color: colors.blueTint15,
  flex: 1,
  fontSize: 16,
  fontWeight: 600,
});

const Content = styled(View)({
  flex: 1,
  marginLeft: 16,
  // paddingRight: 16,
});

const Chevron = styled(Glyph)({
  marginRight: 4,
  marginLeft: -2,
  marginBottom: 1,
});

const RowItem = styled(View)((props: { level: number }) => ({
  marginTop: 15,
  marginLeft: 15 * props.level,
}));

const TABS = {
  tree: {
    key: '0',
    label: 'Tree',
  },
  raw: {
    key: '1',
    label: 'Raw',
  },
};

const MobxTree = ({ data }: IProps) => {
  const [opennedKeys, toggleKeys] = useState([]);
  const [activeTab, toggleTab] = useState(TABS.tree.key);

  const generateKey = useCallback((key: string, level: number) => `${key}-${level}`, []);

  const handleToggleKeys = useCallback(
    (keyValue: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      if (opennedKeys.includes(keyValue)) toggleKeys(opennedKeys.filter((k) => k !== keyValue));
      else toggleKeys([...opennedKeys, keyValue]);
    },
    [opennedKeys],
  );

  const renderValue = useCallback((value: any) => {
    switch (typeof value) {
      case 'boolean':
        return <Text color={colors.orange}>{value + ''}</Text>;
      case 'string':
        return <Text color={colors.green}>{value + ''}</Text>;
      case 'number':
        return <Text color={colors.aluminumDark3}>{value + ''}</Text>;
      default:
        return <Text>{value + ''}</Text>;
    }
  }, []);

  const renderRow = useCallback(
    (key: string, value: any, level: number) => {
      const keyValue = generateKey(key, level);

      if (['string', 'number', 'boolean'].includes(typeof value)) {
        return (
          <RowItem key={keyValue} level={level}>
            {key}: {renderValue(value)}
          </RowItem>
        );
      } else {
        const isOpen = opennedKeys.includes(keyValue);

        return (
          <RowItem key={keyValue} level={level} onClick={(e) => handleToggleKeys(keyValue, e)}>
            <Chevron color={colors.blueTint15} name={isOpen ? 'triangle-down' : 'triangle-right'} size={12} />
            {isOpen ? (
              <Text>
                {key} {Object.entries(value).map(([key1, value1]) => renderRow(key1, value1, level + 1))}
              </Text>
            ) : (
              <Text>{key}: [...]</Text>
            )}
          </RowItem>
        );
      }
    },
    [opennedKeys],
  );

  return (
    <MobxTreeContainer>
      <Content>
        <TabsContainer>
          <Tabs active={activeTab} onActive={toggleTab}>
            <Tab key={TABS.tree.key} label={TABS.tree.label}>
              {Object.entries(data).map(([key, value]) => {
                return renderRow(key, value, 0);
              })}
            </Tab>
            <Tab key={TABS.raw.key} label={TABS.raw.label}>
              <Text>>Hello tab 2!</Text>
            </Tab>
          </Tabs>
        </TabsContainer>
      </Content>
    </MobxTreeContainer>
  );
};

export default memo(MobxTree);
