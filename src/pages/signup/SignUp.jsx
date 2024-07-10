import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignUp from "../../hooks/useSignUp";
import useUploadFile from "../../hooks/useUploadFile";
import logo from "../../assets/logo.png";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { loading, signup } = useSignUp();
  const { uploadFile, uploading } = useUploadFile();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profile_pic: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      if (values.profile_pic) {
        try {
          const uploadResponse = await uploadFile(values.profile_pic);
          values.profile_pic = uploadResponse.url;
          toast.success(values.profile_pic);
        } catch (error) {
           
          toast.error("Failed to upload profile picture");
          return;
        }
      }
      handleSignup(values);
    },
  });

  const handleSignup = async (values) => {
    await signup(values);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <NavLink
          to="#"
          className="flex items-center   text-2xl    "
        > <img src={logo} alt="logo" className=" w-36 object-cover  " />
         <p className="-translate-x-7 text-[#1c352f] font-bold">Chat</p>
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow md:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="name@company.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading || uploading}
              >
                {loading ? "Creating account..." : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
