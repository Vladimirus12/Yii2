import React from "react";
import store, { persistor, history } from "./store";
import "assets/App.css";
import { Layout } from "antd";
import { Header } from "components/header";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router"
import Provider from "react-redux/es/components/Provider";
import { RouteSwitch } from "./routing/routes";
import loadReCaptcha from "react-recaptcha-google/src/loadReCaptcha";
import { ErrorBoundary } from "./components/errorBoundary/ErrorBoundary";
import { MessageNotification } from "./components/message/MessageNotification";
import { IntlComponent } from "./intl/intl";


class App extends React.Component {

	componentDidMount() {
		loadReCaptcha();
	}

	render() {
		return (
			<Provider store={ store }>
				<ConnectedRouter history={ history }>
					<PersistGate loading={ null } persistor={ persistor }>
						<IntlComponent>
							<div className="App">
								<Header/>
								<Layout.Content className="Content">
									<ErrorBoundary>
										<MessageNotification>
											<RouteSwitch/>
										</MessageNotification>
									</ErrorBoundary>
								</Layout.Content>
							</div>
						</IntlComponent>
					</PersistGate>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
