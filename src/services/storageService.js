import logger from "./logService";
import { toast } from "react-toastify";

export const getData = (key) => {
	if (!localStorage) return;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error retrieving item ${key} from localStorage`, error);
	}
};

export const saveData = (key, item) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error storing item ${key} to localStorage`, error);
	}
};

export const removeData = (key) => {
	if (!localStorage) return;

	try {
		return localStorage.removeItem(key);
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error deleting item ${key} from localStorage`, error);
	}
};

export const getSessionData = (key) => {
	if (!sessionStorage) return;

	try {
		return JSON.parse(sessionStorage.getItem(key));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error retrieving item ${key} from sessionStorage`, error);
	}
};

export const saveSessionData = (key, item) => {
	if (!sessionStorage) return;

	try {
		return sessionStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error storing item ${key} to sessionStorage`, error);
	}
};

export const removeSessionData = (key) => {
	if (!sessionStorage) return;

	try {
		return sessionStorage.removeItem(key);
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error deleting item ${key} from sessionStorage`, error);
	}
};

const storageService = {
	getData,
	saveData,
	removeData,
	getSessionData,
	saveSessionData,
	removeSessionData
}

export default storageService;
