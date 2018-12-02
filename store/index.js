import storeService from "./../services/storeServices";


export const state = () => ({
  bucket: [],
  products: [],
  categories: {},
  orders: [],
  user: null
});

// Like a computed properties
export const getters = {
  bucketLength(state) {
    return state.bucket.length;
  },
  getProductById(state) {
    return (id) => state.products.find((item) => item._id == id);
  },
  getProductByUrl(state) {
    return (url) => state.products.find((item) => item.url == url);
  },
  totalBucketPrice(state) {
    let price = 0;
    state.bucket.forEach((item) => {
      price += item.product.productProperties[item.sizeIndex].price * item.quantity;
    });
    return price;
  },
  getCategoryById(state) {
    return (id) => {
      let categoriesNames = Object.keys(state.categories);
      let findCategory;
      categoriesNames.some((catName) => {
        if (!findCategory) {
          findCategory = state.categories[catName].find((item) => item._id == id);
        }
      })
      return findCategory;
    }
  },
  getCategoryByUrl(state) {
    return (url) => {
      let categoriesNames = Object.keys(state.categories);
      let findCategory;
      categoriesNames.some((catName) => {
        if (!findCategory) {
          findCategory = state.categories[catName].find((item) => item.url == url);
        }
      })
      return findCategory;
    }
  },
  currentUser(state) {
    return state.user;
  }
}

// methods for sync operations
export const mutations = {
  addNewBucketItem(state, payload) {
    // Increasing same bucket item quantity if bucket item already exists in state.bucket
    // if not -> pushing new one in array
    let sameBucketItem = storeService.increaseSameBucketItemQuantity(state.bucket, payload);
    if (!sameBucketItem) {
      state.bucket.push(payload);
    }
    storeService.setLocalStorageBucket(state);
  },
  setProducts(state, payload) {
    state.products = payload.slice();
  },
  addProduct(state, payload) {
    state.products.push(payload);
  },
  setCategories(state, payload) {
    state.categories = Object.assign({}, payload);
  },
  setOrders(state, payload) {
    state.orders = payload.slice();
  },
  removeItemFromBucketByIndex(state, payload) {
    if (state.bucket) {
      state.bucket.splice(payload.index, 1);
    }
  },
  icreaseBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id && item.sizeIndex == payload.item.sizeIndex && item.colorIndex == payload.item.colorIndex) {
        item.quantity += payload.amount;
      }
    });
  },
  decreaseBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id && item.sizeIndex == payload.item.sizeIndex && item.colorIndex == payload.item.colorIndex) {
        if (item.quantity > 0) {
          item.quantity += -payload.amount;
        }
      }
    });
  },
  setBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id) {
        item.quantity = parseInt(payload.amount);
      }
    });
  },
  setUser(state, payload) {
    state.user = payload;
  },
  removeUser(state) {
    state.user = null;
  }
};

// methods for async operations
export const actions = {
  async nuxtServerInit({
    commit
  }) {
    let [products, categories, orders] = await Promise.all([storeService.getProducts(), storeService.getCategories(), storeService.getOrders()])
    commit('setCategories', categories.data);
    commit('setProducts', products.data);
    commit('setOrders', orders.data);
  }
};