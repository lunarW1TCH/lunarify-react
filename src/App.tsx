import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import StatsRootLayout from './pages/stats/StatsRoot';
import StyleSheet from './interfaces/StyleSheet';
import { StoreInterface } from './store/store';
import SettingsPage from './pages/Settings';

const App = () => {
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  const styles: StyleSheet = {
    mainBody: {
      backgroundColor: theme.backgroundColor,
      flexGrow: 1,
      minHeight: '100vh',
      color: theme.mainTextColor,
    },
  };

  const router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'settings', element: <SettingsPage /> },
        {
          path: 'stats',
          element: <StatsRootLayout />,
        },
      ],
    },
  ]);

  return (
    <div style={styles.mainBody}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
