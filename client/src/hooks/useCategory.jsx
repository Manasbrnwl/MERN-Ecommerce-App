import React, { useEffect, useState } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  //get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/get-category"
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
