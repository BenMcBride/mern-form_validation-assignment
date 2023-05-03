import React, { useReducer } from "react";

const initialState = {
  firstName: {
    value: '',
    error: null
  },
  lastName: {
    value: '',
    error: null
  },
  email: {
    value: '',
    error: null
  }
};

function reducer(state, action) {
  return {
    ...state,
    [action.type]: {
      value: action.payload,
      error: action.error
    }
  };
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    const dispatchObj = {
      type: name,
      payload: value,
      error: null
    }
    if (['firstName', 'lastName'].indexOf(name) !== -1) {
      if (value.length <= 0) {
        dispatch({
          ...dispatchObj
        });
      } else if (value.length < 2) {
        dispatch({
          ...dispatchObj, error: 'error'
        });
      } else {
        dispatch({
          ...dispatchObj
        });
      }
    }
    if ('email'.indexOf(name) !== -1) {
      value.length <= 0 || validateEmail(value) ?
      dispatch({
        ...dispatchObj
      }) :
      dispatch({
        ...dispatchObj, error: 'error'
      });
    }
  }
  const errormsg = (error) => {
    if (error === "firstName" && state.firstName.error != null) {
      return "First Name must be at least 2 characters."
    }
    if (error === "lastName" && state.lastName.error != null) {
      return "Last Name must be at least 2 characters."
    }
    if (error === "email" && state.email.error != null) {
      return "Email must be valid."
    }
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <label>
          <span>First Name:</span>
          <input name="firstName" value={state.firstName.value} onChange={handleChange} />
        </label>
        {<p style={{color:'red'}}>{errormsg("firstName")}</p>}
      </div>
      <div>
        <label>
          <span>Last Name:</span>
          <input name="lastName" value={state.lastName.value} onChange={handleChange} />
        </label>
        {<p style={{color:'red'}}>{errormsg("lastName")}</p>}
      </div>
      <div>
        <label>
          <span>Email:</span>{" "}
          <input name="email" value={state.email.value} onChange={handleChange} />
        </label>
        {<p style={{color:'red'}}>{errormsg("email")}</p>}
      </div>
    </div>
  );
};
