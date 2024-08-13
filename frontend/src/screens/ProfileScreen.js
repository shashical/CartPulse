import { useContext, useReducer, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (currentState, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...currentState, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...currentState, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...currentState, loadingUpdate: false };
    default:
      return currentState;
  }
};

const ProfileScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      dispatch({ type: 'UPDATE_REQUEST' });

      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          ...(password && { password }),
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: 'UPDATE_SUCCESS' });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully!');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={userInfo.email} readOnly />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileScreen;
