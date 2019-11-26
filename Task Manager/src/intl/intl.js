import React, { useState } from "react";
import { MessagesEn, MessagesRu } from "../intl/translate";
import { IntlProvider } from "react-intl";
import en_US from "antd/es/locale/en_US";
import ru_RU from "antd/es/locale/ru_RU";
import { ConfigProvider } from "antd";

export const getLocaleMessages = (lang) => {
	if (lang === "ru") {
		return MessagesRu;
	}
	return MessagesEn;
};

export const IntlContext = React.createContext({
	intl: null,
	changeLang: (lang) => {
	},
});

const lsKey = "lang";

export const IntlComponent = props => {
	const [state, setState] = useState(getLocaleMessages(localStorage.getItem(lsKey)));

	const changeLang = (lang) => {
		const msg = getLocaleMessages(lang);
		const { locale } = msg;
		localStorage.setItem(lsKey, locale);
		setState(msg);
	};

	const antLocale = (lang) => {
		if (lang === "ru") {
			return ru_RU;
		}
		return en_US;
	};

	return (
		<IntlProvider { ...state }>
			<ConfigProvider locale={ antLocale(state.locale) }>
				<IntlContext.Provider value={ { intl: state, changeLang } }>
					{ props.children }
				</IntlContext.Provider>
			</ConfigProvider>
		</IntlProvider>
	);
};
