import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const buttonStyle =
  "rounded-md py-2 px-4 text-xl hover:bg-indigo-600 transition-colors duration-300 ease-in-out";

export const SignInOrOut = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="fixed bottom-0 mt-2 flex h-12 w-full justify-end rounded-t-md bg-indigo-900 opacity-90 md:max-w-2xl">
      {isSignedIn ? (
        <SignOutButton>
          <button className={buttonStyle}>🚪</button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className={buttonStyle}>🗝️</button>
        </SignInButton>
      )}
    </div>
  );
};
