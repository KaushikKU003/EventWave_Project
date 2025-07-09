// src/utils/FeedbackContent.jsx
import React from "react";

const FeedbackModal = ({ eventId }) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">Feedback for Event ID: {eventId}</p>
      {/* Add your custom feedback logic here */}
      <p>This is where you fetch and display user feedback.</p>
    </div>
  );
};

export default FeedbackModal;
