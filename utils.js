export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
  
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to log in");
      }
    });
};
  
export const signup = (data) => {
    const signupUrl = "/signup";
  
    return fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to sign up");
      }
    });
};
  
export const getMenus = (catalogId) => {
  return fetch(`/catalog/${catalogId}/menu`).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get menus");
    }

    return response.json();
  });
};

export const getCatalogs = () => {
  return fetch("/catalogs").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get catalogs");
    }

    return response.json();
  });
};

export const getAllMenuItems = () => {
return fetch("/allMenuItems").then((response) => {
  if (response.status < 200 || response.status >= 300) {
    throw Error("Fail to get all menuitems");
  }

  return response.json();
});
};

export const getCart = () => {
    return fetch("/cart").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get shopping cart data");
      }
  
      return response.json();
    });
};
  
export const checkout = () => {
    return fetch("/checkout").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to checkout");
      }
    });
};
  
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add menu item to shopping cart");
      }
    });
};
  
export const updatePassword = (password) => {
  return fetch(`/updatePassword/${password}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to update password");
    }
  });
};
export const getUserInfo = () => {
  return fetch("/userInfo").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to getUserInfo");
    }
    return response.json();

  });
};

