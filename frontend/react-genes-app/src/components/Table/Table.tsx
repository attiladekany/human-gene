import './Table.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useEffect, useMemo, useState, useRef } from 'react';
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
    pageSize: 10,
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

  // Ref for the wrapper so we can inspect its parent (the flex container)
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // measuredParentWidth will contain the parent element width in pixels
  const [measuredParentWidth, setMeasuredParentWidth] = useState<number | null>(
    null
  );

  // dynamic resize was needed for configure horizontal table scrolling
  useEffect(() => {
    const compute = () => {
      if (window.innerWidth < 768) {
        setMeasuredParentWidth(window.innerWidth);
      } else {
        const masterLayoutFlexFraction = 0.65;
        setMeasuredParentWidth(
          Math.floor(window.innerWidth * masterLayoutFlexFraction)
        );
      }
    };

    compute();

    const parent = wrapperRef.current?.parentElement ?? document.body;
    const ro = new ResizeObserver(() => compute());
    ro.observe(parent);

    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  const columns = useMemo<MRT_ColumnDef<Gene>[]>(() => COLUMNS, []);

  return (
    <>
      {/* wrapper measures parent width and applies it as maxWidth so the table fits the flex allocation */}
      <div
        ref={wrapperRef}
        style={{
          maxWidth: measuredParentWidth
            ? `${measuredParentWidth}px`
            : undefined,
          width: '100%',
          overflowX: 'auto',
        }}
        aria-label="table-wrapper"
      >
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
            isError
              ? { color: 'red', children: 'Error loading data' }
              : undefined
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
      </div>

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
