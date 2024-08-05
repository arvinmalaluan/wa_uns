import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword( auth, email, password ); // prettier-ignore
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (user.emailVerified) {
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.status != "pending") {
          return { status: 1, message: user };
        } else {
          return {
            status: 2,
            message: "Redirecting in 2s.",
            approved: false,
            verified: true,
          };
        }
      }
    } else {
      return {
        status: 2,
        message: "Redirecting in 2s.",
        approved: false,
        verified: false,
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      status: 0,
      message: "Please check your sign in credentials",
      additionalInfo: error.message,
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.location.href = window.location.origin;
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

export const signUp = async (email, password, fullname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: fullname,
        status: "pending",
      });
    } catch (docError) {
      await deleteUser(user);
      return {
        status: 0,
        message: "Failed to complete user setup. User has been deleted.",
        additionalInfo: docError,
      };
    }

    await sendEmailVerification(user);
    return { status: 1, message: "Email verification was sent" };
  } catch (error) {
    return {
      status: 0,
      message: "Error signing up",
      additionalInfo: error.message,
    };
  }
};
