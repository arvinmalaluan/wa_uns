import { useToast } from "@/components/ui/use-toast";
import { signIn, signUp } from "@/firebase/authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthhook = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signupPayload, setSignupPayload] = useState({ email: "", fullname: "", password: "", confpass: "", agree: false }); // prettier-ignore
  const [signinPayload, setSigninPayload] = useState({email: "", password: ""}); // prettier-ignore

  const showToast = (variant, title, description, duration) => {
    toast({
      variant,
      title,
      description,
      duration: parseInt(duration),
    });
  };

  const handleSignupChange = (e, name) => {
    setSignupPayload((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSigninChange = (e, name) => {
    setSigninPayload((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let errors = [];
    let passwordError = "";
    const { email, fullname, password, confpass, agree } = signupPayload;

    email == "" && errors.push("Email");
    fullname == "" && errors.push("Fullname");
    password == "" && errors.push("Password");
    confpass == "" && errors.push("Password confirmation");
    password != confpass && passwordError.push("Password and Password confirmation does not match!"); // prettier-ignore

    if (errors.length > 0) {
      showToast(
        "destructive",
        "Attempt Unsuccessful",
        `${errors.join(", ")} ${errors.length > 1 ? "are" : "is"} missing.`,
        3000
      );
    } else {
      if (passwordError != "") {
        showToast("destructive", "Attempt Unsuccessful", passwordError, 3000);
      } else {
        const response = await signUp(email, password, fullname);

        if (response.status) {
          showToast(
            "success",
            "Signed in successfully",
            response.message,
            3000
          );
        } else {
          showToast("destructive", "Failed to signin", response.message, 3000);
        }
      }
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    let errors = [];
    const { email, password } = signinPayload;

    email == "" && errors.push("Email");
    password == "" && errors.push("Password");

    if (errors.length > 0) {
      showToast(
        "destructive",
        "Attempt Unsuccessful",
        `${errors.join(", ")} ${errors.length > 1 ? "are" : "is"} missing.`,
        3000
      );
    } else {
      const response = await signIn(email, password);

      if (response.status == 1) {
        showToast(
          "success",
          "Signed in successfully",
          "You will now be redirected to home in 2s.",
          2000
        );
      } else if (response.status == 2) {
        console.log(response.message);
        setTimeout(() => {
          navigate(
            `/pending?verified=${response.verified}&approved=${response.approved}`
          );
        }, 2000);
      } else {
        showToast("destructive", "Failed to signin", response.message, 3000);
      }
    }
  };

  return {
    setSignupPayload,
    handleSignupChange,
    handleSignupSubmit,
    handleSigninSubmit,
    handleSigninChange,
  };
};

export default useAuthhook;
