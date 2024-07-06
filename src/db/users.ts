export const users = [
  {
    email: "test@test.com",
    password: "1234",
    username: "user1",
  },
  {
    email: "test123@test.com",
    password: "1234",
    username: "user2",
  },
];

export const getUser = (email: string) => {
  return users.find((user) => user.email === email);
};
