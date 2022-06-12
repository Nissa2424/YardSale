import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Cart from '../views/Cart';
import Home from '../views/Home';
import Shop from '../views/Shop';

export default function Routing() {
	return (
	  <Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/shop' element={<Shop />} />
		<Route path='/cart' element={<Cart />} />
	  </Routes>
	);
  }