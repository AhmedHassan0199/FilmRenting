import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { rentFilm } from '../redux/film';

const Rent = (props) => {
  const dispatch = useDispatch();
  var filmData = JSON.parse(localStorage.getItem('choosenFilm'));
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const rentStore = useSelector(({ filmReducer }) => filmReducer.filmRent);

  useEffect(() => {
    if (rentStore.successMsg) {
      setSuccessMsg(rentStore.successMsg);
      setErrorMsg(null);
    } else if (rentStore.errorMsg) {
      setErrorMsg(rentStore.errorMsg);
      setSuccessMsg(null);
    }
  }, [rentStore.successMsg, rentStore.errorMsg]);

  function handleToken(token, addresses) {
    dispatch(rentFilm({ token, filmData }));
  }
  return (
    <div className="container">
      <div className="col-md-6 mt-5 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Rent {filmData.filmTitle} film</h1>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}
        <StripeCheckout
          stripeKey="pk_test_51HMXmEIkP9PE94S8HxspiWckDnersehO3CbK3xWEXAYFGhrFAnxFNtyTYByadG1myyv8jC3Gssfdw7JOutrtvhFa00Inze9iiZ"
          token={handleToken}
          shippingAddress
          amount={filmData.price * 100}
          name={filmData.filmTitle}
        />
      </div>
    </div>
  );
};
export default Rent;
