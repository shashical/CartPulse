import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NotFoundScreen() {
  return (
    <div className="text-center">
      <h1 className="display-3">404</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  );
}
