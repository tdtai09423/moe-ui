import { useEffect, useState } from "react";
import { accountService } from "../../services/accountService";


const DEFAULT_FILTER = {
  pageNumber: 1,
  pageSize: 20,
  Search: "",
  EducationLevel: [],
  SchoolingStatus: "",
  ResidentialStatus: [],
  MinBlance: null,
  MaxBlance: null,
  MinAge: null,
  MaxAge: null,
//   SortBy: "",
//   SortDescending: false,
};

export const useAccountList = () => {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (customFilter = filter) => {
    setLoading(true);
    try {
      const result = await accountService.getListAccount(customFilter);
      console.log(result.data);
      setData(result.data.items);
      setTotal(result.data.totalCount);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  // 🔹 update filter
  const updateFilter = (newFilter) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
      pageNumber: 1,
    }));
  };

  const changePage = (page, pageSize) => {
    setFilter((prev) => ({
      ...prev,
      pageNumber: page,
      pageSize,
    }));
  };

  return {
    data,
    total,
    loading,
    filter,
    updateFilter,
    changePage,
    fetchData,
  };
};
