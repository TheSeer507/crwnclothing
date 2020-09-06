import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container.jsx';
import CollectionPagContainer from '../collection/collection.container.jsx';


import {fetchCollectionsStart} from '../../redux/shop/shop.actions.js';




const ShopPage = ({fetchCollectionsStart, match}) =>  {
	useEffect(() =>{
		fetchCollectionsStart();
	},[fetchCollectionsStart]);

	return (
	<div className='shop-page'>
	<Route exact path={`${match.path}`}component={CollectionsOverviewContainer}/>
	<Route path={`${match.path}/:collectionId`}component={CollectionPagContainer}/>
	</div>
);
	}



const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);

