import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const buttonStyle =
  "rounded-md py-2 px-4 text-xl hover:bg-indigo-500 transition-colors duration-300 ease-in-out";

export const SignInOrOut = () => {
  const { isSignedIn } = useUser();
  const toolTip = isSignedIn ? "Logout" : "Login";

  return (
    <div className="group fixed bottom-0 mt-2 flex h-12 rounded-t-md bg-indigo-700 opacity-90">
      {isSignedIn ? (
        <SignOutButton>
          <button className={buttonStyle}>🚶‍♀️🚪</button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className={buttonStyle}>🗝️</button>
        </SignInButton>
      )}
      <span
        className="absolute left-1/2 -m-2 mx-auto -translate-x-1/2 -translate-y-full rounded-md bg-indigo-800 px-1 
    text-sm text-slate-100 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {toolTip}
      </span>
    </div>
  );
};
