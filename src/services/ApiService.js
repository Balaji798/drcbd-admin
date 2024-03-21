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
  changeStatus(status,orderId){
    return Api().post(`orders/update_order/${orderId}`,{status:status})
  },
  getTopSpender(){
    return Api().get('orders/get_top_spender')
  }
};
