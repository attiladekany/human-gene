import { initStore } from './+state/query-params.store';
import './App.scss';
import MasterDetailLayout from './layouts/MasterDetailLayout';
import { createTheme, MantineProvider } from '@mantine/core';
import { Text } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const App = () => {
  initStore();

  return (
    <MantineProvider theme={theme}>
      <div className="content">
        <Text
          style={{ zIndex: 10 }}
          pos={'absolute'}
          top={0}
          left={0}
          m="md"
          ta="center"
        >
          Human genes
        </Text>
        <MasterDetailLayout />
      </div>
    </MantineProvider>
  );
};

export default App;
