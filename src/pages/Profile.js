const Profile = () => {
  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <div className="flex-1">
      {isLoggedIn ? (
        <div>Profile</div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-3xl">
          Lütfen giriş yapınız.
        </div>
      )}
    </div>
  );
};

export default Profile;
