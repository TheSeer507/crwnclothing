import React from 'react';

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles.jsx'

class ErrorBoundary extends React.Component {
	constructor(){
		super();

		this.state ={
			hasErrored: false
		};
	}
	static getDerivedStateFromError(error){
		return {hasErrored: true};
	}

	componentDidCatch(error, info){
		console.log(error);
	}

	render(){
		if(this.state.hasErrored){
			return (
					<ErrorImageOverlay>
					<ErrorImageContainer imageUrl='https://i.imgur.com/g3hgqe8.png' />
					<ErrorImageText> A broken clock is right twice a day...what is time anyway? while You try to find
					the existential answer to that question We'll be working to fix this webpage and continue serving you
					</ErrorImageText>
					</ErrorImageOverlay>
				);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;