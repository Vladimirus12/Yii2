import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router"
import { taskReducer } from "./tasksReducer"
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";
import { messageReducer } from "./messageReducer";
import { projectsReducer } from "./projectsReducer";

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	tasks: taskReducer,
	auth: authReducer,
	errors: errorReducer,
	message: messageReducer,
	projects: projectsReducer,
});

export default createRootReducer;
