import Api from "./Api";

export default {

  getOrders(){
    return Api().get('order/get-orders')
  },
  deleteProduct(productId){
    return Api().post(`product/delete_product/${productId}`)
  },
  getFeedback(){
    return Api().post('/review/get-reviews')
  }
};
