import React from "react";
import { checkToken } from '../../utilities/users-services'

export default function OrderHistoryPage() {

    async function handleCheckToken() {
        checkToken()
    }
  return (
    <>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}
