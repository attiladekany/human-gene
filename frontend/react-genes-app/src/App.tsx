import './App.scss';
import MasterDetailLayout from './layouts/MasterDetailLayout';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <div className="content">
        <h1>Human genes</h1>
        {/* <p>Start building amazing things with Rsbuild.</p> */}
        <MasterDetailLayout />
      </div>
    </MantineProvider>
  );
};

export default App;
