import './Table.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
} from 'mantine-react-table';
import { API_URL } from '@/constants';
import { Gene } from '@/models/gene.model';
import { ApiResponse } from '@/models/api-response.model';
import { COLUMNS } from './columns';

const Table = () => {
  //data and fetching state
  const [data, setData] = useState<Gene[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  //if you want to avoid useEffect, look at the React Query Table instead
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(API_URL);
      url.searchParams.set(
        'page',
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set('page_size', `${pagination.pageSize}`);

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
  }, [
    pagination.pageIndex, //refetch when page index changes
    pagination.pageSize, //refetch when page size changes
  ]);
  const columns = useMemo<MRT_ColumnDef<Gene>[]>(() => COLUMNS, []);

  const table = useMantineReactTable({
    columns,
    data: data || [],
    enableRowSelection: false,
    getRowId: (row) => row.ensembl,
    initialState: { showColumnFilters: false },
    manualFiltering: false,
    manualPagination: false,
    manualSorting: false,
    rowCount,
    onPaginationChange: setPagination,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    mantineToolbarAlertBannerProps: isError
      ? { color: 'red', children: 'Error loading data' }
      : undefined,

    mantineTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
      },
      style: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MantineReactTable table={table} />;
};

export default Table;
