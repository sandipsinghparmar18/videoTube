import { useEffect, useState } from "react";

function SubscribeButton({ onclick }) {
  const [subscribed, setSubscribed] = useState(
    JSON.parse(localStorage.getItem("subscribed")) || false
  );

  useEffect(() => {
    localStorage.setItem("subscribed", JSON.stringify(subscribed));
  }, [subscribed]);

  const handleClick = () => {
    setSubscribed((prev) => !prev);
    onclick && onclick(); // Calls the parent-provided function if available
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 text-sm font-semibold rounded-full transition duration-300 ${
        subscribed
          ? "bg-gray-800 border border-gray-400 text-white hover:bg-gray-700 hover:border-white"
          : "bg-red-500 text-white hover:bg-red-600 hover:border hover:border-red-700"
      }`}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
}

export default SubscribeButton;