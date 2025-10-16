import './Table.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
} from 'mantine-react-table';
import { Gene } from '@/models/gene.model';
import { ApiResponse } from '@/models/api-response.model';
import { COLUMNS } from './columns';
import { getApiUrl } from '@/tools/api-url.helper';

import { useSearchParams } from 'react-router-dom';
import { ENSEMBL } from '@/tools/constants';
import { Divider } from '@mantine/core';

const Table = () => {
  const [data, setData] = useState<Gene[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { pageIndex, pageSize } = pagination;

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = getApiUrl();
      url.searchParams.set('page_index', `${pageIndex}`);
      url.searchParams.set('page_size', `${pageSize}`);

      try {
        const response = await fetch(url.href);
        const json = (await response.json()) as ApiResponse;
        setData(json.items);
        setRowCount(json.total);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }

      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();
  }, [pageIndex, pageSize]);

  const columns = useMemo<MRT_ColumnDef<Gene>[]>(() => COLUMNS, []);

  return (
    <>
      <MantineReactTable
        columns={columns}
        data={data || []}
        // enableRowSelection={false}
        getRowId={(row) => row.ensembl}
        initialState={{ showColumnFilters: false, pagination }} // start with URL pagination
        manualFiltering={false}
        manualPagination={true} // controlled pagination
        manualSorting={false}
        rowCount={rowCount}
        autoResetPageIndex={false}
        onPaginationChange={setPagination}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
        }}
        mantineToolbarAlertBannerProps={
          isError ? { color: 'red', children: 'Error loading data' } : undefined
        }
        mantineTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            setSearchParams({ [ENSEMBL]: row.id });
            console.info(event, row.id);
          },
          style: {
            cursor: 'pointer',
          },
        })}
      />

      <Divider
        labelPosition="center"
        style={{
          marginTop: '1rem',
          // remove the line segments
          ['--divider-color' as any]: 'transparent', // optional variable override
        }}
        className="no-line-divider"
      />
    </>
  );
};

export default Table;
