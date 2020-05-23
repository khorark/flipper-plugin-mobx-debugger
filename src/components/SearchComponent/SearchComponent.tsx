import React, { memo, useMemo } from 'react';
import { SearchableTable, Button, Text, TableBodyRow } from 'flipper';
import { Row } from '../..';

const columns = {
  time: {
    value: 'Time',
  },
  action: {
    value: 'Action Type',
  },
  took: {
    value: 'Took',
  },
};

const columnSizes = {
  time: '20%',
  action: '35%',
  took: '15%',
};

interface IProps {
  actions: Row[];
  onPress: (key: string[]) => void;
  onClear: () => void;
}

const SearchComponent: React.FC<IProps> = ({ actions, onPress, onClear }) => {
  const rows = useMemo(
    () =>
      actions.map(
        (row): TableBodyRow => ({
          columns: {
            time: {
              value: <Text>{row.time}</Text>,
            },
            action: {
              value: <Text>{row.action.type}</Text>,
            },
            took: {
              value: <Text>{row.took}</Text>,
            },
          },
          key: row.id,
          copyText: JSON.stringify(row),
          filterValue: `${row.id}`,
        }),
      ),
    [actions],
  );

  return (
    <SearchableTable
      key={100}
      rowLineHeight={28}
      floating={false}
      multiline={true}
      columnSizes={columnSizes}
      columns={columns}
      onRowHighlighted={onPress}
      multiHighlight={false}
      rows={rows}
      stickyBottom={true}
      actions={<Button onClick={onClear}>Clear</Button>}
    />
  );
};

export default memo(SearchComponent);
