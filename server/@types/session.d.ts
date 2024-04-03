import {SessionData} from 'express-session';
import express from 'express';

interface User {
  id: number;
  name: string;
  address: string;
  role: string;
}

interface MySessionData extends SessionData {
  user?: User | null;
  loggedIn?: boolean;
  admin?: boolean;
}

interface MyRequest extends express.Request {
  session: MySessionData;
}
