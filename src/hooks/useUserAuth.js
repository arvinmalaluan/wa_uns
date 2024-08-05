import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setStatus(userDocSnap.data()?.status || "pending");

        const status = userDocSnap.data()?.status || "pending";
        const verified = user.emailVerified;

        if (status == "pending" || !verified) {
          navigate(
            `/pending?verified=${verified}&approved=${status == "pending"}`
          );
        } else {
          navigate(`/home`);
        }
      } else {
        setUser(null);
        setStatus(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, status, loading };
};
