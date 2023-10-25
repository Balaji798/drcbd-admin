import Api from "./Api";

export default {

  getOrders(){
    return Api().get('orders/get_all_orders')
  },
  deleteProduct(productId){
    return Api().post(`product/delete_product/${productId}`)
  },
  getFeedback(){
    return Api().post('/review/get-reviews')
  },
  
};
