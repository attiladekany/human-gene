import './MasterDetailLayout.scss';
import { Flex, Box } from '@mantine/core';
import Detail from '../components/Detail/Detail';
import Table from '../components/Table/Table';

export function MasterDetailLayout() {
  return (
    <Flex
      className="flex"
      direction={{ base: 'column', sm: 'row' }}
      gap="md"
      w="100%"
      h="100vh"
    >
      {/* Master section */}
      <Box
        flex={0.65}
        style={{
          borderRight: '1px solid #8e9196',
        }}
      >
        <Table />
      </Box>

      {/* Detail section */}
      <Box flex={0.35}>
        <Detail />
      </Box>
    </Flex>
  );
}
export default MasterDetailLayout;
