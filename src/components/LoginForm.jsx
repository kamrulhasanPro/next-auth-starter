"use client";

import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";

const LoginForm = ({ callbackUrl }) => {
//   const url = useSearchParams();
//   const callbackUrl = url.get("callbackUrl") || "/";

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = {
      callbackUrl,
      email: form.email.value,
      password: form.password.value,
    };

    const result = await signIn("credentials", formData);

    // const result = await registerUser(formData);
    // alert(JSON.stringify(result));
    // console.log(result);
    // // console.log("Submitted Data:", formData);
  };

  // handle social
  const handleSocial = async (value) => {
    await signIn(value, { callbackUrl });
  };

  const inputClass =
    "p-2 rounded border-2 bg-white text-black focus:outline-green-300";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {/* Email */}
      <div className="flex flex-col space-y-1">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={inputClass}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-1">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          required
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Login
      </button>

      {/* social login */}
      <div className="flex flex-col gap-4">
        <button
          className="btn"
          type="button"
          onClick={() => handleSocial("google")}
        >
          Login With Google
        </button>
        <button
          className="btn !bg-gray-400 !text-white"
          type="button"
          onClick={() => handleSocial("github")}
        >
          Login With GitHub
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
