import { UserDropdown } from "@/components/user";
import { NotificationDropdown } from "@/components/notification/notification-dropdown";
import { Link } from "react-router-dom";
import { Sidebar } from ".";
import { PrimaryButton, SecondaryButton } from "../buttons";
import RequestEmployerProfile from "../../pages/requestEmployer";
import PostJob from "../../pages/PostJob";
import { HeartIcon } from "@heroicons/react/24/outline";
export function AppLayout({ children }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="hidden lg:block lg:w-[300px]">
        <Sidebar />
      </div>
      <div className="flex-1 border-t border-gray-300 lg:border-l lg:border-t-0">
        {children}
      </div>
    </div>
  );
}

AppLayout.Header = function AppLayoutHeader({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex h-[56px] items-center justify-between border-b border-gray-300 px-6">
      <div className="font-medium">
        {" "}
        <span
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
          className="font-medium"
        >
          {children}
        </span>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <UserDropdown user={user} />
            <Link to="/wishlist">
              <HeartIcon className="ml-2 h-6 w-6 " />
            </Link>
            <NotificationDropdown />
          </>
        ) : (
          <>
            <Link to="/sign-in" className="mr-5">
              <SecondaryButton>Sign In</SecondaryButton>
            </Link>
            <Link to="/sign-up">
              <PrimaryButton>Join Us</PrimaryButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

AppLayout.Content = function AppLayoutContent({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="border-gray-300 lg:w-[640px] lg:border-r">{children}</div>
      <div className="p-6 lg:w-[350px]">
        {user && user.role === "student" && (
          <RequestEmployerProfile> </RequestEmployerProfile>

        )}
        {user && user.role === "employer" && (<PostJob />)}
      </div>
    </div>
  );
};

export default AppLayout;
