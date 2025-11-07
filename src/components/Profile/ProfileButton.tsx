import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthProvider";

import AuthDrawer from "../../auth/AuthDrawer";

const ProfileButton = ({ onClick }: { onClick?: () => void }) => {
  const { currentUser } = useContext(AuthContext);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {currentUser ? (
        <Link to="/profile">
          <Button
            variant={
              location.pathname.startsWith("/profile") ? "subtle" : "ghost"
            }
            // _hover={{ bg: "whiteAlpha.200" }}
            onClick={onClick}
            // fontWeight="semibold"
          >
            <Icon as={FaUser} mr={2} />
            Profile
          </Button>
        </Link>
      ) : (
        <>
          <Button
            onClick={() => {
              setAuthOpen(true);
            }}
            variant="ghost"
            // _hover={{ bg: "whiteAlpha.200" }}
          >
            <Icon as={FaUser} mr={2} />
            Log in
          </Button>

          {/* Auth Drawer */}
          <AuthDrawer
            open={authOpen}
            onOpenChange={(open: boolean) => {
              setAuthOpen(open);
            }}
          />
        </>
      )}
    </>
  );
};

export default ProfileButton;
