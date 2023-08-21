import React from 'react';
import { useRecoilValue } from 'recoil';
import { MaterialReactTable } from 'material-react-table';
import { queryResultState } from '../../state/atoms';
import { capitalizeString, fetchOutputColumns } from '../../utils/helpers/utilities';
import './Table.css';

const Table = () => {
  const queryResult = useRecoilValue(queryResultState);

  
  const columns = fetchOutputColumns(queryResult[0]).map((column) => ({
    accessorKey: column,
    header: capitalizeString(column),
  }));


  return (
    <div className="output-table">
      {queryResult.length > 0 && (
        <MaterialReactTable
          columns={columns}
          data={queryResult}
          enablePagination={false}
          enableColumnResizing
          enableRowVirtualization
          enableRowNumbers
          rowVirtualizerProps={{ overscan: '5' }}
          muiTableContainerProps={{ sx: { maxHeight: '300px' } }}
        />
      )}
    </div>
  );
};

export default Table;
