import {
    post
} from './http'
import axios from 'axios' // 引入axios
export const findAdmin = p => post('/user/login', p);
export const findCustomer = p => post('/user/select_information', p);
export const findCuscoupon = p => post('/wowesy/Admin/findByCuscoupon', p);
export const findGoods = p => post('/wowesy/Admin/findByGoods', p);
export const findOrderMx = p => post('/wowesy/Admin/findByOrderMx', p);
export const findOrders = p => post('/order/get_all_Orders', p);
export const findServe = p => post('/wowesy/Admin/findByServe', p);
export const findSort = p => post('/manage/category/get_list_category', p);
export const findSortId = p => post('/product/get_Id_product', p);
export const deleteGoods = p => post('/wowesy/Admin/deleteGoods', p);
export const comment = p => post('/comment/user_All_Comment', p);
export const addSort = p => post('/manage/category/insert_category_controller', p);
export const updateSort = p => post('/product/update_product', p);
export const addCustomer = p => post('/user/register', p);
export const deleteCustomer = p => post('/wowesy/Admin/deleteCustomer', p);
export const customerUpdate = p => post('/wowesy/Admin/CustomerUpdate', p);
export const updateOrder = p => post('/wowesy/Admin/updateOrder', p);
export const addOrder = p => post('/wowesy/Admin/addOrder', p);
export const OrderDetail = p => post('/order/get_all_order', p);
