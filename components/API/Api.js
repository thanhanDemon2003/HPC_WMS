import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';

const api = axios.create({
  baseURL: 'http://192.168.1.14:3000/', 
  timeout: 5000 ,
});
//http://localhost:3000/ibibt/searchProduct/12?page=1
const getItemsPage = async (user, page, searchTerm) => {
  try {
    console.log('hiiiii', user, page, searchTerm);
    const response = await api.get(`/ibibt/searchProduct/${user}?page=${page}&search=${searchTerm}`);
    console.log('>>>>>kho',response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//http://localhost:3000/ibibt/getimportpage/12?page=1 
const getImportItemsPage = async (user, filterType, page, date, filterTypeTT) => {
  try {
    const response = await api.get(`/ibibt/getimportpage/${user}?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//http://localhost:3000/ibibt/getexportpage/12?page=1 
const getExportItemsPage = async (user, filterType, page, date, filterTypeTT) => {
  try {
    const response = await api.get(`/ibibt/getexportpage/${user}?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const detailSanPham = async (sp) => {
  try {
    const response = await api.get(`/ibibt/detailproduct?sp=${sp}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const detailSanPhamXuat = async (sp) => {
  try {
    const response = await api.get(`/ibibt/detailproductxuat?sp=${sp}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const locNhapHang = async (user, filterType, page, date, filterTypeTT) => {
  console.log('>>>>>>',user, filterType, page, date, filterTypeTT)
  
  try {
    const response = await api.get(`/ibibt/locnhaphang/${user}/${filterType}?page=${page}&date=${date}&statusfe=${filterTypeTT}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}


const locXuatHang = async (user, filterType, page, date, filterTypeTT) => {
  console.log('>>>>>>',user, filterType, page, date, filterTypeTT)
  try {
    const response = await api.get(`/ibibt/locxuathang/${user}/${filterType}?page=${page}&date=${date}&statusfe=${filterTypeTT}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const Login = async (username, password) => {
  try {
    const response = await api.post(`/ibibt/Login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data.message)
      return (error.response.data);
    } else {
      throw error;
    }
  }
};

export default {
  getItemsPage,
  getExportItemsPage,
  getImportItemsPage,
  Login,
  detailSanPham,
  detailSanPhamXuat,
  locXuatHang,
  locNhapHang
};
