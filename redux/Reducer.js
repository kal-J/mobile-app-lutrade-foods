import { combineReducers } from 'redux';
import firebase from '../firebase';

const INITIAL_STATE = {
  user: {
    isLoggedin: false,
  },
  vendor: {
    name: null,
    menu: null,
    delivery_fee: null,
  },
  campus: 'Lira University',
  pickupPoint: 'Blackroof',
  delivery_fee: 2000,
  // holds cart items
  orders: [],
  // holds cart on checkout
  ordersPlaced: [],
  vendors: [],
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_CAMPUS': {
      let new_campus = action.payload;
      let newState = { ...state, campus: new_campus };
      return newState;
    }
    case 'CHANGE_PICKUP_POINT': {
      let new_pickupPoint = action.payload;
      let newState = { ...state, pickupPoint: new_pickupPoint };
      return newState;
    }
    case 'NEWORDER': {
      let new_order = action.payload;

      //
      console.log('#########\n');
      console.log(JSON.stringify(new_order, null, 4));
      let orders = state.orders;
      orders.push(new_order);
      let newState = { ...state, orders: orders };
      return newState;
    }
    case 'PLACEORDER': {
      const order = action.payload;
      // send orders to restaurant

      console.log('==========================');
      console.log(JSON.stringify(order, null, 2));
      console.log('==========================');
      console.log(JSON.stringify(state.ordersPlaced, null, 4));

      order.items.forEach((item) => {
        firebase
          .firestore()
          .collection('restaurants')
          .doc(item.vendor.id)
          .get()
          .then((snapshot) => {
            let old_orders = snapshot.data().orders;
            if (!old_orders) {
              old_orders = [];
            }
            firebase
              .firestore()
              .collection('restaurants')
              .doc(item.vendor.id)
              .update({
                orders: [
                  ...old_orders,
                  {
                    orderNumber: order.orderNumber,
                    status: order.status,
                    paymentMethod: order.paymentMethod,
                    ...item,
                  },
                ],
              })
              .catch();
          })
          .catch();
      });

      let ordersPlaced = state.ordersPlaced;
      ordersPlaced.push(order);
      let newState = { ...state, ordersPlaced: ordersPlaced };
      return newState;
    }

    case 'UPDATECART': {
      const orders = action.payload;
      if (orders.length === 0) {
        const newState = {
          ...state,
          orders: orders,
          vendor: {
            name: null,
            menu: null,
            delivery_fee: null,
          },
        };
        return newState;
      }
      const newState = { ...state, orders: orders };
      return newState;
    }

    case 'SETUSER': {
      const user = action.payload;

      const newState = {
        ...state,
        user: {
          get isLoggedin() {
            if (user.uid) {
              return true;
            }
            return false;
          },
          ...user,
        },
      };
      return newState;
    }
    case 'SETVENDORS': {
      const vendors = action.payload;

      const newState = {
        ...state,
        vendors,
      };
      return newState;
    }
    case 'SETVENDOR': {
      const vendor = action.payload;

      const newState = {
        ...state,
        vendor,
      };
      return newState;
    }

    default:
      return state;
  }
};

export default combineReducers({
  reducer: mainReducer,
});
