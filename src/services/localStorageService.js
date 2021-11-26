import logger from "./logService";
import { toast } from "react-toastify";

export const getData = (key) => {
	if (!localStorage) return;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error getting item ${key} from localStorage`, error);
	}
};

export const storeData = (key, item) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error storing item ${key} to localStorage`, error);
	}
};

export const deleteData = (key) => {
	if (!localStorage) return;

	try {
		return localStorage.removeItem(key);
	} catch (error) {
		logger.error(error);
		toast.error("An unexpected storage error occurred");
		console.error(`Error deleting item ${key} from localStorage`, error);
	}
};
