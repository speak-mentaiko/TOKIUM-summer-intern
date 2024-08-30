import { useNavigate } from "react-router-dom";

export const ListHeader = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <button onClick={handleBackToHome}>戻る</button><br />
    </>
  );
};
