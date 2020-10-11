import {takeLatest, call, put, all} from 'redux-saga/effects';
import shopActionTypes from './shop.types.js';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils.js';
import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure
} from './shop.actions.js';

export function* fetchCollectionsAsync(){

	try{
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	}catch (error){
		yield put(fetchCollectionsFailure(error.message));
	}

}

export function* fetchCollectionsStart(){
	yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START,
	fetchCollectionsAsync);
}

export function* shopSagas(){
	yield all([call(fetchCollectionsStart)]);
}