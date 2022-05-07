import useAuth from "../hooks/useAuth";

const Profile = () => {
  const user = useAuth();
  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <div className="flex-1">
      {isLoggedIn ? (
        <div>
          <h2>Merhaba {user.name},</h2>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-3xl">
          Lütfen giriş yapınız.
        </div>
      )}
    </div>
  );
};

export default Profile;
