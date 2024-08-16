import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    authorities: {},
    username: ''
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setAuthorities: (state, action) => {
      state.authorities = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    }
  }
});

export const { 
  setAuthenticated, setAuthorities, setUsername 

  } = authSlice.actions




//   //제품 리스트 
// export const fetchProducts = () => async (dispatch, getState) => {
//   const { page, size } = getState().products;
//   try{
//     const response = await axios.get('/api/products', {
//       params : {
//         page,
//         size
//       }
//     });
//     dispatch(setProducts(response.data));
//   } catch (error) {
//     console.log("Error fetching products : ", error);
//   }
// }