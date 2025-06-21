import React, { useEffect, useState, useRef } from 'react';
import { useLogin } from './LoginContext';
import { useNavigate } from 'react-router-dom';

export default function Verification({ children }) {
  const {user} = useLogin();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const hasCheckedRef = useRef(false); 

  useEffect(() => {
    if (hasCheckedRef.current) return; 
     if (user === null) return;
    if (user.email === 'nikhil7597013249@gmail.com') {
      setIsVerified(true);
    } else {
      alert("You are not an admin!");
      navigate('/home');
    }

    hasCheckedRef.current = true; 
  }, [user, navigate]);

  if (!isVerified) return null;

  return children;
}
