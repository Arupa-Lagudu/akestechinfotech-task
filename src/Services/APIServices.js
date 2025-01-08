import axios from "axios";
import { toast } from "react-toastify";

class APIServices {
  // Private method for handling errors
  static handleError(error) {
    if (error.response) {
      const status = error.response.status;
      if (status >= 400 && status < 500) {
        toast.error("Client error occurred. Please check your request.");
      } else if (status >= 500) {
        toast.error("Server error occurred. Please try again later.");
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    } else if (error.request) {
      toast.error("No response from server. Please check your network.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
    console.error("API Error:", error);
  }

  // Example API call
  static async fetchPosts() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Add more API calls here...
}

export { APIServices };
