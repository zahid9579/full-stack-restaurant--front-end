import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllMenuItem = async () => {
  try {
    const response = await api.get("/restaurant/allmenu", {
      timeout: 30 * 1000,
    });

    if (response.status === 400 || response === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getMenu = async (id) => {
  try {
    const response = await api.get(`/restaurant/${id}`, {
      timeout: 30 * 1000,
    });

    if (response.status === 400 || response === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    const response = await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("User already registered");
    } else {
      console.error("Error response:", error.response);
      toast.error("Something went wrong, Please try again");
    }
    throw error;
  }
};

export const buyItem = async (propertyId, email, token) => {
  try {
    await api.post(
      `/user/buyItem/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs().format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, please try again");
    throw error;
  }
};

export const removeOrder = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeOrder/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, please try again");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAllFavourites = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log(res)
    return res.data["favRestaurantsID"];
  } catch (e) {
    toast.error("Something went wrong");
    throw e;
  }
};

export const getAllOrders = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allOrders`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    return res.data["bookedItems"]
    
  } catch (error) {
    toast.error("Something went wrong, please try again");
    throw error;
  }
};


export const createRestaurant = async (data, token) => {
  try{
    const res = await api.post(
      `/restaurant/create`,
      {
        data
      },
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      }
    )

  }catch(error){
    throw error
  }
}