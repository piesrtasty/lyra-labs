import AuthForm from "@components/auth-form";

const Signup = () => {
  return (
    <div className="text-black transition-colors duration-1000 bg-white dark:bg-black">
      <section className="h-screen bg-center body-font bg-patternTop ">
        <div className="w-full bg-white border-b dark:bg-gray-700 border-gray-200 dark:border-gray-800 lg:px-20">
          <div className="flex flex-row max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between">
              <a href="/">
                <img
                  className="h-14 w-auto"
                  src="/wordmark-logo-light.svg"
                  alt="Workflow"
                />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="container px-8 pt-8 mx-auto lg:px-4 "> */}
        <AuthForm isSignup={true} />
        {/* </div> */}
      </section>
    </div>
  );
};

export default Signup;
