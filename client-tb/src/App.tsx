import React, { useEffect } from 'react';
import { useTelegram } from './hooks/telegramHooks';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { withSuspense } from './hocs/withSuspense';

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));

const SuspendedMainPage = withSuspense(MainPage);
const SuspendedProfilePage = withSuspense(ProfilePage);

function App() {
  const tg = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route path={''} element={<SuspendedMainPage/>}/>
        <Route path={'profile'} element={<SuspendedProfilePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;