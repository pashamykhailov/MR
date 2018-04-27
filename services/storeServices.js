import axios from "~/plugins/axios";
export default {
  async getProducts(commit) {
    let products = await axios.get("/api/products");
    commit('setProducts', products.data);
  },
  increaseSameBucketItemQuantity(bucketArray, product) {
    let sameBucketItem;
    bucketArray.forEach((item) => {
      if (item.product._id == product.product._id) {
        item.quantity += product.quantity;
        sameBucketItem = item;
      }
    });
    return sameBucketItem ? sameBucketItem : false;
  },
  setCookieBucket(state) {
    // Setting expiring date to one day
    let date = new Date;
    date.setDate(date.getDate() + 1);
    let cookieExpireDate = `expires=${date.toUTCString()};`;
    let cookieData = `mrbucket=${JSON.stringify(state.bucket)};`
    // Setting cookie
    document.cookie = cookieData + cookieExpireDate;
  },
  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\\^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  // async getOrders(commit) {
  //   let orders = await axios.get('/api/orders');
  //   commit('')
  // }
};