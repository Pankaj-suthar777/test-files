import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetAllUser } from "../apicalls/users";

export function UserList() {
  const [users, setUsers] = useState([]);

  async function getData() {
    const UsersData = await GetAllUser();
    setUsers(UsersData.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="mt-6 text-lg ">All Users</h1>
      <Card className="w-full mb-5 ">
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt="candice"
                  src={user.profilePicture}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {user.name}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {user.email}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
