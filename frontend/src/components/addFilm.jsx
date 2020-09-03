import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../inputs';
import { addFilm } from '../redux/film';
import { useForm } from 'react-hook-form';

const AddFilm = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    watch,
    errors,
    // eslint-disable-next-line
    getValues,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const addFilmStore = useSelector(({ filmReducer }) => filmReducer.filmList);

  useEffect(() => {
    if (addFilmStore.successMsg) {
      setSuccessMsg(addFilmStore.successMsg);
      setErrorMsg(null);
    } else if (addFilmStore.errorMsg) {
      setErrorMsg(addFilmStore.errorMsg);
      setSuccessMsg(null);
    }
  }, [addFilmStore.successMsg, addFilmStore.errorMsg]);

  const onSubmit = (formData) => {
    if (formState.isValid) {
      dispatch(addFilm(formData));
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mt-2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h3 mb-3 font-weight-normal">Create a new film for rent</h1>
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
          <div className="form-group">
            <Input
              name="filmTitle"
              placeholder="Enter the Film Title"
              label="Film Title"
              errors={errors}
              register={register}
              required={'Required!'}
            />
          </div>
          <div className="form-group">
            <Input
              name="price"
              placeholder="Enter the film price"
              label="Film Price"
              type="Number"
              errors={errors}
              register={register}
              required={'Required!'}
            />
          </div>
          <div className="form-group">
            <Input name="genre" placeholder="Enter the genre" label="Genre" errors={errors} register={register} required={'Required!'} />
          </div>
          <div className="form-group">
            <Input
              name="initialRelease"
              placeholder="Released"
              label="Release Date"
              errors={errors}
              type="date"
              register={register}
              required={'Required!'}
            />
          </div>

          <button type="submit" className="btn btn-lg btn-primary btn-block mb-2">
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFilm;
