import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { User } from "@heroui/user";

import { useUser } from "@/contexts/user_context_provider";

export const UserDropdown = () => {
  const { userState, logout } = useUser();

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            size: "sm",
            showFallback: true,
            className: "mr-1",
            isBordered: true,
            src: userState.user.photo_url,
          }}
          className="transition-transform"
          description={userState.user.email}
          name={userState.user.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="basic_info" showDivider className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{userState.user.name}</p>
        </DropdownItem>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="settings" showDivider>
          My Settings
        </DropdownItem>
        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}

        <DropdownItem key="logout" color="danger" onPress={() => logout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}