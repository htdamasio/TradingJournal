import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";

import { useUser } from "@/contexts/user_context_provider";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";
import env from "@/constants";

export default function RegistrationPage(props: { bIsLogin: boolean }) {
  const navigate = useNavigate();
  const { userState, setUserState } = useUser();

  const [loading, setLoading] = useState<Boolean>(false);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const getConfirmPasswordError = (
    value: string,
    isSubmitted: boolean = false,
  ) => {
    if (!isSubmitted && !value) {
      return null;
    }

    if (value !== password) {
      return "Passwords do not match";
    }

    return getPasswordError(value, true);
  };
  // Real-time password validation
  const getPasswordError = (value: string, isSubmitted: boolean = false) => {
    if (!isSubmitted && !value) {
      return null;
    }

    if (!value) {
      return "Password is required";
    }

    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password, true);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    // if (data.name === "admin") {
    //   newErrors.name = "Nice try! Choose a different username";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // if (data.terms !== "true") {
    //   setErrors({terms: "Please accept the terms"});

    //   return;
    // }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);

    const strEndPoint = props.bIsLogin ? "sessions" : "registrations";

    fetch(`${env.API_URL}/${strEndPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { ...data } }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "created") {
          if (
            (strEndPoint === "sessions" && data.logged_in) ||
            strEndPoint === "registrations"
          ) {
            setUserState({
              loggedInStatus: "LOGGED_IN",
              user: data.user,
            });
            navigate("/dashboard");
          }
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Registration</h1>
        </div> */}
        <Form
          className="w-full justify-center items-center space-y-4"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 max-w-md">
            <h1 className={title()}>{userState.loggedInStatus}</h1>
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
              }}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              isRequired
              endContent={
                <Button
                  isIconOnly
                  className="focus:outline-none"
                  type="button"
                  variant="light"
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeFilledIcon className="bg-none text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeSlashFilledIcon className="bg-none text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
              errorMessage={getPasswordError(password)}
              isInvalid={getPasswordError(password) !== null}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onValueChange={setPassword}
            />

            {!props.bIsLogin && (
              <Input
                isRequired
                errorMessage={getConfirmPasswordError(password_confirmation)}
                isInvalid={
                  getConfirmPasswordError(password_confirmation) !== null
                }
                label="Confirm Password"
                labelPlacement="outside"
                name="password_confirmation"
                placeholder="Enter your password"
                type="password"
                value={password_confirmation}
                onValueChange={setPasswordConfirmation}
              />
            )}

            {/* TODO: Change this to a better component */}
            {submitted && errors.length > 0 && (
              <div className="border-red-400 text-red-700 px-1 py-0">
                {errors}
              </div>
            )}

            <div className="flex gap-4">
              <Button color="danger" type="reset" onPress={() => navigate("/")}>
                Cancel
              </Button>
              <Button className="w-full" color="primary" type="submit">
                {loading ? (
                  <Spinner color="white" variant="gradient" />
                ) : (
                  <> {props.bIsLogin ? "Login" : "Register"} </>
                )}
              </Button>
            </div>

            {props.bIsLogin && (
              <div className="flex flex-row-reverse">
                <Link
                  className="text-blue-500 hover:underline text-sm"
                  // href="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </Form>
      </section>
    </DefaultLayout>
  );
}
