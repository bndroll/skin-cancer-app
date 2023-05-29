import { useNavigate } from 'react-router-dom';

const tg = window.Telegram.WebApp;

export const useTelegram = () => {
	return {...tg};
};

export const useWebAppInitDataUnsafe = () => {
	return {
		...tg.initDataUnsafe
	};
};

export const useWebAppInitData = () => {
	return {
		initData: tg.initData
	};
};

export const useBackButton = () => {
	const navigate = useNavigate();
	const onClickBackButton = () => {
		navigate(-1);
	};
	tg.BackButton.onClick(onClickBackButton);
	return {
		hide: tg.BackButton.hide,
		show: tg.BackButton.show
	};
};

export const useWebAppUser = () => {
	return {
		...tg.initDataUnsafe.user
	};
};