const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const tokenizationSpecification = {
  "type": "DIRECT",
  "parameters": {
    "protocolVersion": "ECv2",
    "publicKey": "Teste"
  }
}

const allowedCardNetworks = [/*"AMEX", "DISCOVER", "INTERAC", "JCB",*/ "MASTERCARD", "VISA"];

const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {tokenizationSpecification: tokenizationSpecification},
  baseCardPaymentMethod
);

const paymentsClient =
    new google.payments.api.PaymentsClient({environment: 'TEST'});

const isReadyToPayRequest = Object.assign({}, baseRequest);
    isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];

    paymentsClient.isReadyToPay(isReadyToPayRequest)
    .then(function(response) {
      console.log(response.result)
      if (response.result) {
        // add a Google Pay payment button
      }
    })
    .catch(function(err) {
      // show error in developer console for debugging
      console.error(err);
    });    

const paymentDataRequest = Object.assign({}, baseRequest);
paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];

paymentDataRequest.transactionInfo = {
  totalPriceStatus: 'FINAL',
  totalPrice: '123.45',
  currencyCode: 'BRL',
  countryCode: 'BR'
};
paymentDataRequest.merchantInfo = {
  merchantName: 'Weats Corp.'
};
paymentsClient.loadPaymentData(paymentDataRequest).then(function(paymentData){
  // if using gateway tokenization, pass this token without modification
  paymentToken = paymentData.paymentMethodData.tokenizationData.token;
  console.log(paymentToken);
}).catch(function(err){
  // show error in developer console for debugging
  console.error(err);
});