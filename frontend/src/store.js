import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productReducer, productDetailsReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { authReducer, userReducer, allUsersReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer,  allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;