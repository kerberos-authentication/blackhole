

// Function to validate password
export default function validatePassword(password) {
  const regex = /^.{8,}$/;

  // Check if password is valid
  if (!regex.test(password)) {
    // Emit a notification if password is invalid
    // io.emit('notification', { message: 'Password must be at least 8 characters long' });
    return false;
  }

  return true;
}

// Start the server
// server.listen(3000, () => {
//   console.log({`Server running on {import.meta.env.VITE_PUBLIC_ROOT_URL}`});
// });


//const regex = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d)).{8,}$/;