import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_51GwYFyASSxSVuuPmyfO7czIRsCOrAaTvZSg6DpzSTpwyZQRsANaijkwb4amlSQ4qlWcoOiiAUOne6NdlOpVjuYZV00jbwIWaPY';

const onToken = token => {
	axios({
		url: 'payment',
		method: 'post',
		data:{
			amount: priceForStripe,
			token: token
		}
	}).then(response =>{
		alert('Payment Successful')
	}).catch(error =>{
		console.log('Payment error: ', JSON.parse(error));
		alert(
			'There was an issue with your payment. Please make sure you are using the correct credit card ');
	});
	};


	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://sendeyo.com/up/d/f3eb2117da'
			description={`Your total is ${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>

		);
};

export default StripeCheckoutButton;