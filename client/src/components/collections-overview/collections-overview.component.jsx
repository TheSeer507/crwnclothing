import React from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component.jsx';

import {selectCollectionsForPreview} from '../../redux/shop/shop.selector.js';

import { CollectionsOverviewContainer } from './collections-overview.styles';


const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
);

const mapStatetoProps = createStructuredSelector({
	collections: selectCollectionsForPreview
});


export default connect (mapStatetoProps)(CollectionsOverview);