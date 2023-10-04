import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseURL = "http://localhost:5000"
    }
    fetchProducts() {
        return axios.get(`${this.baseURL}/admin/product/fetch`)
    }
    fetchProductById(id) {
        return axios.get(this.baseURL + "/admin/product/byid/" + id)
    }
    fetchCart(products) {
        return axios.post(`${this.baseURL}/admin/product/cart`, { products: products })
    }
    
    userLogin(data) {
        return axios.post(this.baseURL + "/user/login", data)
    }
    userRegister(data) {
        return axios.post(this.baseURL + "/user/registration", data)
    }
    
    placeOrder(orderDetails) {
        this.token=JSON.parse(localStorage.getItem("token"))
        return axios.post(`${this.baseURL}/order/create`, orderDetails,{headers:{token:this.token}})
    }
    
    verifyPayment(payment){
        this.token=JSON.parse(localStorage.getItem("token"))
        return axios.post(`${this.baseURL}/order/verify`,payment,{headers:{token:this.token}})
    }
}
const apiHelper = new ApiHelper()

export default apiHelper
