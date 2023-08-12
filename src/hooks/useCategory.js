import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get categories
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return categories;
}
