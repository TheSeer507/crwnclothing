import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component.jsx';
import CollectionPage from '../collection/collection.component.jsx';

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils.js';

import {updateCollections} from '../../redux/shop/shop.actions.js';

import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
	state = {
		loading: true
	};

	unsubscribeFromSnapshot = null;

	componentDidMount(){
		const {updateCollections} = this.props;
		const collectionRef = firestore.collection('collections');

		
		collectionRef.get().then(async snapshot => {
			const collectionsMap = convertCollectionSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({loading:false});
		
		});
	} 

	render(){
		const {match} = this.props;
		const {loading} = this.state;
	return (
	<div className='shop-page'>
	<Route exact path={`${match.path}`} render={props =>(<CollectionOverviewWithSpinner isLoading={loading}{...props}/>)}/>
	<Route path={`${match.path}/:collectionId`} render={props =>(<CollectionPageWithSpinner isLoading={loading}{...props}/>)}/>
	</div>
);
	}
}  

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);