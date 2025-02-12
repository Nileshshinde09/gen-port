import React from "react";
import { Mail } from "./components/mail";
import { accounts, mails } from "./components/data";
import Cookies from "js-cookie";

// Define types for your layout and collapsed state
interface Layout {
  [key: string]: any; // Use more specific types based on your layout structure
}

const UserFeedback: React.FC = () => {
  // Get cookies using js-cookie
  const layout = Cookies.get("react-resizable-panels:layout:mail");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");

  // Parse cookies or set as undefined if not present
  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  return (
    <div className="h-[87%]">
      <Mail
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
};

export default UserFeedback;
