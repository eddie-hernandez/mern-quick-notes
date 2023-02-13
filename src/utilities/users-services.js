import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);

  // Persist the "token"
  localStorage.setItem("token", token);
  return getUser()
}

export function getToken() {
  // get the token from local storage
  // get the token's payload
  // check if the token has expired
  // if it hasn't, return the token
  const token = localStorage.getItem("token");
  if (!token) return null;

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJoYWhhIiwiZW1haWwiOiJzaWxseUB3YWNreS5jb20iLCJfaWQiOiI2M2VhNWFhNDM3OTNmZDc2ODg2NDQ4YTYiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTEzVDE1OjQzOjMyLjI3OFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTEzVDE1OjQzOjMyLjI3OFoiLCJfX3YiOjB9LCJpYXQiOjE2NzYzMDMwMTIsImV4cCI6MTY3NjM4OTQxMn0.hjvTEy_8Pvlibssbp2emcL5BcElSckOoFnvtlreayKU
  // ^^ this is our JWT
  // this is broken up into three parts (represented by the periods):
  // beginning string: header
  // middle string: payload
  // end string: encrypted signature

  const payload = token.split(".")[1];
  // JWTs are base64 encoded to make it URL safe
  // we need to decode it in order to make it usable
  // JavaScript has a built-in function for decoding base64
  // called atob()

  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  // JWT's exp is expressed in seconds, not miliseconds, so we have to convert!
  if (parsedPayload.exp < Date.now() / 1000) {
    // Token has expired, so we should remove it
    localStorage.removeItem("token");
    return null;
  } else {
    return token;
  }
}

export function getUser() {
  const token = getToken();

  // if a token does exist, we want to return the user in the payload, otherwise return null

  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.user
  }
  else {
    return null
  }
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function login(credentials) {
   const token = await usersAPI.login(credentials)
   localStorage.setItem('token', token)
   return getUser()
}

export async function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}