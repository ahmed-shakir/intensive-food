import http from "../services/httpService";
import { toast } from "react-toastify";
import { foodApiEndpoint, categoryApiEndpoint } from "../config.json";

const foodService = {
  getAll: async () => {
    try {
      const {data: foods} = await http.get(foodApiEndpoint);
      return foods;
    } catch (error) {
      if (error.code === "400") {
        toast.error("Foods cannot be retrieved");
      }
    }
  },
  getCategories: async () => {
    try {
      const {data: categories} = await http.get(categoryApiEndpoint);
      return categories;
    } catch (error) {
      if (error.code === "400") {
        toast.error("Categories cannot be retrieved");
      }
    }
  },
  post: async (food) => {
    try {
      const { data: newFood } = await http.post(foodApiEndpoint, food);
      toast.success("Food created");

      return newFood;
    } catch (error) {
      if (error.code === "400") {
        toast.error("Food cannot be created");
      }
    }
  },
  update: async (food) => {
    try {
      const { data: updatedFood } = await http.put(`${foodApiEndpoint}/${food._id}`, food);
      toast.success("Food updated");

      return updatedFood;
    } catch (error) {
      if (error.status === "400") {
        toast.error("Food cannot be updated");
      }
    }
  },
  delete: async (food) => {
    try {
      const { data: deletedFood } = await http.delete(`${foodApiEndpoint}/${food._id}`);
      toast.success("Food deleted");

      return deletedFood;
    } catch (error) {
      if (error.status === "404") {
        toast.error("Food has already been deleted");
      }
    }
  },
};

export default foodService;
