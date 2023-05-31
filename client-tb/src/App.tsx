import React, { useEffect } from 'react';
import { useTelegram } from './hooks/telegramHooks';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout/Layout';
import { withSuspense } from './hocs/withSuspense';
import { useAppDispatch } from './store/store';
import { setUserAction } from './store/user/asyncActions';

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage/HistoryPage'));
const InfoPage = React.lazy(() => import('./pages/InfoPage/InfoPage'));
const RecognitionPage = React.lazy(() => import('./pages/RecognitionPage/RecognitionPage'));
const ResultPage = React.lazy(() => import('./pages/ResultPage/ResultPage'));

const SuspendedMainPage = withSuspense(MainPage);
const SuspendedHistoryPage = withSuspense(HistoryPage);
const SuspendedInfoPage = withSuspense(InfoPage);
const SuspendedRecognitionPage = withSuspense(RecognitionPage);
const SuspendedResultPage = withSuspense(ResultPage);

function App() {
	const tg = useTelegram();
	const dispatch = useAppDispatch();

	useEffect(() => {
		tg.ready();
		dispatch(setUserAction());
	}, []);

	return (
		<Routes>
			<Route path={'/'} element={<Layout/>}>
				<Route path={''} element={<SuspendedMainPage/>}/>
				<Route path={'recognition'} element={<SuspendedRecognitionPage/>}/>
				<Route path={'history'} element={<SuspendedHistoryPage/>}/>
				<Route path={'info/:id'} element={<SuspendedInfoPage/>}/>
				<Route path={'result'} element={<SuspendedResultPage/>}/>
			</Route>
		</Routes>
	);
}

export default App;