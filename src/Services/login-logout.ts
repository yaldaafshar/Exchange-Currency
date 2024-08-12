export const handleLogin = async (username:string) => {
    console.log({username});

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username}),
    });
    if (response.ok) {
      const data = await response.json();
      const user = data.user
      console.log('login Message', data.message)
      return user
    } else {
      const error = await response.json();
      console.log('error loggin in--->', error)
    }
  };