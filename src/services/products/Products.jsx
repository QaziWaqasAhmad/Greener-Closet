import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";


// ADMIN LOGIN
export const adminLogin = (params) => {
    return Api(`${endPoints.loginAdmin}`, params, requestType.POST,null) 
}
// USER SIGNUP
export const userRegister = (params) => {
    return Api(`${endPoints.registerUser}`, params, requestType.POST,null) 
}
// USER LOGIN
export const loginUser = (params) => {
    return Api(`${endPoints.loginUser}`, params, requestType.POST,null) 
}
// SEND OTP
export const verifiyUser = (params) => {
    return Api(`${endPoints.sendCode}`, params, requestType.POST,null) 
}



// GET PRODUCTS 
export const getProducts = (page,token) => {
    return Api(`${endPoints.getAllProducts}?page=${page}`, null, requestType.GET,token) 
}
 
export const addProducts = (params,token) => {
    return Api(`${endPoints.addProduct}`, params, requestType.POST,token) 
}
export const updateProduct = (id,params,token) => {
    return Api(`${endPoints.updateProduct}/${id}`, params, requestType.PUT,token) 
}
export const deleteProduct = (params,token) => {
    return Api(`${endPoints.deleteProduct}`, params, requestType.DELETE,token) 
}


// Categories 
export const getAllCategories = (page,token) => {
    return Api(`${endPoints.getAllCategories}?page=${page}`, null, requestType.GET,token) 
}
export const getAllCategoriesAdmin = (token) => {
    return Api(`${endPoints.getAllCategoriesAdmin}`, null, requestType.GET,token) 
}

export const createCategory = (params,token) => {
    return Api(`${endPoints.createCategory}`, params, requestType.POST,token) 
}
export const updateCategory = (id,params,token) => {
    return Api(`${endPoints.updateCategory}/${id}`, params, requestType.PUT,token) 
}
export const deleteCategory = (params,token) => {
    return Api(`${endPoints.deleteCategory}`, params, requestType.DELETE,token) 
}
// Departments 
export const getAllDepartments = (page,token) => {
    return Api(`${endPoints.getAllDepartments}?page=${page}`, null, requestType.GET,token) 
}
export const getAllDepartmentsAdmin = (token) => {
    return Api(`${endPoints.getAllDepartmentsAdmin}`, null, requestType.GET,token) 
}

export const createDepartment = (params,token) => {
    return Api(`${endPoints.createDepartment}`, params, requestType.POST,token) 
}
export const updateDepartment = (id,params,token) => {
    return Api(`${endPoints.updateDepartment}/${id}`, params, requestType.PUT,token) 
}
export const deleteDepartment = (params,token) => {
    return Api(`${endPoints.deleteDepartment}`, params, requestType.DELETE,token) 
}


// Material 
export const getAllMaterials = (page,token) => {
    return Api(`${endPoints.getAllMaterials}?page=${page}`, null, requestType.GET,token) 
}
export const getAllMaterialsAdmin = (token) => {
    return Api(`${endPoints.getAllMaterialsAdmin}`, null, requestType.GET,token) 
}
export const createMaterial = (params,token) => {
    return Api(`${endPoints.createMaterial}`, params, requestType.POST,token) 
}
export const updateMaterial = (id,params,token) => {
    return Api(`${endPoints.updateMaterial}/${id}`, params, requestType.PUT,token) 
}
export const deleteMaterial = (params,token) => {
    return Api(`${endPoints.deleteMaterial}`, params, requestType.DELETE,token) 
}


// client side category

export const clientCategory = () => {
    return Api(`${endPoints.getCategory}`, null, requestType.GET,null) 
}
export const clientProducts = (material,category,page) => {
    if (!material && !category) {
        return Api(`${endPoints.getAllProductsByUser}?page=${page}`, null, requestType.GET,null) 
    }if (material && !category) {
        return Api(`${endPoints.getAllProductsByUser}?material=${material}`, null, requestType.GET,null) 
    }if (!material && category) {
        return Api(`${endPoints.getAllProductsByUser}?category=${category}`, null, requestType.GET,null) 
    }if (material && category) {
        return Api(`${endPoints.getAllProductsByUser}?material=${material}&&category=${category}`, null, requestType.GET,null) 
    }
}



// mateiral client side

export const getMaterial = () => {
    return Api(`${endPoints.getMaterial}`, null, requestType.GET,null) 
}


//score admin side
export const calculateScore = (params) => {
    return Api(`${endPoints.calculateScore}`, params, requestType.POST,null) 
}

// PAYMENT SYSTEM

export const paymentGateway = (params, token) => {
    return Api(`${endPoints.proceedPayment}`, params, requestType.POST,token) 
}
export const cancelSubscription = (id, token) => {
    return Api(`${endPoints.cancelSubscription}/${id}`, null, requestType.PUT,token) 
}
/// get All Users
export const getAllUsersByAdmin = (page,token) => {
    return Api(`${endPoints.getAllUsersByAdmin}?page=${page}`, null, requestType.GET,token) 
}

// single product page
export const singleProduct = (id) => {
    return Api(`${endPoints.getProductDetailsById}/${id}`, null, requestType.GET,null) 
}
//forgot password
export const sendCodeToUser = (params) => {
    return Api(`${endPoints.sendCodeUser}`, params, requestType.POST,null) 
}
export const resetUserPassword = (params) => {
    return Api(`${endPoints.resetPasswordUser}`, params, requestType.POST,null) 
}
export const resetAdminPassword = (params) => {
    return Api(`${endPoints.resetPasswordAdmin}`, params, requestType.POST,null) 
}
export const sendCodeToAdmin = (params) => {
    return Api(`${endPoints.sendCodeAdmin}`, params, requestType.POST,null) 
}


// CONTACT
export const sendContactDetails = (params) => {
    return Api(`${endPoints.contactUs}`, params, requestType.POST,null) 
}

//user detail
export const userDetailsById = (id) => {
    return Api(`${endPoints.getUserDetailsById}/${id}`, null, requestType.GET,null) 
}


//user detail
export const subscribe = (params) => {
    return Api(`${endPoints.subscribe}`, params, requestType.POST,null) 
}

