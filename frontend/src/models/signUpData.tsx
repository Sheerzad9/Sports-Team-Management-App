interface SignUpData {
  name: string;
  username: string;
  password: string;
  birthDay: string;
  email: string;
}

interface LoginData {
  username: string;
  password: string;
}

export { type SignUpData, type LoginData };
