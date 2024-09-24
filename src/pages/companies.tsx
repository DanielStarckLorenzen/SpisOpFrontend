import {User} from "../types/User.ts";

export type CompaniesProps = {
  user: User;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Companies = ({user}: CompaniesProps) => {

  return (
    <div>
      <h1>Companies</h1>
    </div>
  );
}

export default Companies;
