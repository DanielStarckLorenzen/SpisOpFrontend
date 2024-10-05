// Import the User type from the User.ts file
import { User } from '../types/User.ts';

// Define the props type for the Companies component
export type CompaniesProps = {
  user: User;
};

// Define the Companies component
const Companies = () => {
  return (
    // Render a simple div container
    <div>
      {/* Display a heading for the Companies page */}
      <h1>Companies</h1>
    </div>
  );
};

// Export the Companies component as the default export
export default Companies;
