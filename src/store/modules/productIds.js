const state = {
  restaurant_id: '',
};

const getters = {};
const mutations = {
  setRestaurantId(restaurantId) {
    state.restaurant_id = restaurantId.restaurantId;
  },
};
const actions = {
  saveRestaurantId(context, restaurantId) {
    context.commit({
      type: 'setRestaurantId',
      restaurantId,
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
