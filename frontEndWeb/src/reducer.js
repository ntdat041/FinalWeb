export const initialState = {
	basket: [],
	user: null,
	shop: null,
	queryString: '',
};

// Selector
export const getBasketTotal = (basket) => 
	basket?.reduce((amount, item) => item.price*item.quantity + amount, 0);

export const getProductInCart = function(products) {
		// viết code ở đây.
		let result= new Map();
		for(let item of products){
			let orr=products.reduce(function(times,product){
				if(product.id===item.id) return times+=1;
				return times;
			},0);  
		result.set(item,orr);
		}
		let obj = Array.from(result).reduce((obj, [key, value]) => (
		Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
		), {});
		return obj;
};  

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case "ADD_QUANTITY_BASKET":
			function addQuantityBasket(){
				let index = state.basket.findIndex(
					(basketItem) => basketItem.id === action.item.id
				);
				let newBasket = [...state.basket];  
				if (index >=0 ){
					let newItem = newBasket[index];
					newItem.quantity +=1;
					newBasket = [
						...newBasket.slice(0,index),
						newItem,
						...newBasket.slice(index+1,newBasket.length)
					]
				}
				else {
					let newItem = action.item;
					newItem.quantity = action.item.quantity;
					newBasket = [...newBasket,newItem];
				}
				return newBasket;
			}
				return {
					...state,
					basket: addQuantityBasket(),
				};
		case "ADD_TO_BASKET":
			function addToBasket(){
				let index = state.basket.findIndex(
					(basketItem) => basketItem.id === action.item.id
				);
				let newBasket = [...state.basket];  
				if (index >=0 ){
					let newItem = newBasket[index];
					newItem.quantity +=1;
					newBasket = [
						...newBasket.slice(0,index),
						newItem,
						...newBasket.slice(index+1,newBasket.length)
					]
				}
				else {
					let newItem = action.item;
					newItem.quantity = 1;
					newBasket = [...newBasket,newItem];
				}
				return newBasket;
			}
				return {
					...state,
					basket: addToBasket(),
				};      
		
			case "DECREASE_TO_BASKET":
				function decreaseToBasket(){
					let index = state.basket.findIndex(
						(basketItem) => basketItem.id === action.item.id
					);
					let newBasket = [...state.basket];  
					if (index >=0 ){
						let newItem = newBasket[index];
						if(newItem.quantity > 1)
							newItem.quantity -=1;
						newBasket = [
							...newBasket.slice(0,index),
							newItem,
							...newBasket.slice(index+1,newBasket.length)
						]
					}
					return newBasket;
				}
					return {
						...state,
						basket: decreaseToBasket(),
					};
		
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: []
			}
			
		case "REMOVE_FROM_BASKET":
			let index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);

			} else {
				console.warn(
					`Cant remove product (id: ${action.id}) as its not in basket!`
				)
			}

			return {
				...state,
				basket: newBasket
			}
		
		case "SET_USER":
			return {
				...state,
				user: action.user
			}

		case "SET_SHOP":
			return {
				...state,
				shop: action.shop
			}

		case "SET_QUERY":
			return {
				...state,
				queryString: action.queryString
			}

		default:
			return state;
	}
};

export default reducer;
