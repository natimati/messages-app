const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export function login({ username }: { username: string }) {
  return fetch(baseUrl + '/api/users', {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("user", data.user);
      return data
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export function getAllUsers() {
  return fetch(baseUrl + "/api/users", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e)
      throw e;
    });
};

export function sendMessage({
  senderId,
  recipientId,
  title,
  messageBody
} : {
    senderId: string,
    recipientId: string,
    title: string,
    messageBody: string
}) {
  return fetch(baseUrl + '/api/messages', {
    method: 'POST',
    body: JSON.stringify({
      senderId,
      recipientId,
      title,
      messageBody
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export function getMessages(recipientId: string) {
  return fetch(baseUrl + `/api/messages/${recipientId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
