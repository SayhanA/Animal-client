import api from "./config/axiosInstance";

const animalAPIs = {
  async getAnimals() {
    try {
      const response = await api.get(`/animals`);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  async getAnimalsFilter({ data }) {
    try {
      const response = await api.get(`/animals?category=${data?.category}`);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  async getCategories() {
    try {
      const response = await api.get(`/categories`);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(
        `/secret/super-admin/admins/users/${id}`
      );
      return response.data;
    } catch (error) {
      return error?.response;
    }
  },

  async updateUser(data) {
    try {
      const response = await api.put(
        `/secret/super-admin/admins/users/${data.id}`,
        {
          status: data?.status,
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return error?.response;
    }
  },

  async approvedByAdmin(id) {
    try {
      const response = await api.put(`/admins/approve/${id}`);
      return response.data;
    } catch (error) {
      return error?.response;
    }
  },

  async rejectedByAdmin(id) {
    try {
      const response = await api.put(`/admins/reject/${id}`);
      return response.data;
    } catch (error) {
      return error?.response;
    }
  },

  async registerOrSignUp(data) {
    try {
      const response = await api.post(
        "/secret/super-admin/admins/signup",
        data
      );
      // if ([200, 201].includes(response.status)) {
      // 	const { Name, email, isApprovedByAdmin } = response?.data?.data || {};
      // 	localStorage.setItem('user-details', JSON.stringify({ firstName, lastName, email, isApprovedByAdmin }));
      // }

      return response?.data;
    } catch (error) {
      return error?.response;
    }
  },

  async signIn(data) {
    try {
      const response = await api.post(
        "/secret/super-admin/admins/signin",
        data
      );

      if ([200, 201].includes(response?.status)) {
        const { name, email, role, accessToken, refreshToken } =
          response?.data?.data || {};
        localStorage.setItem(
          "user-details",
          JSON.stringify({ name, email, refreshToken })
        );
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("role", JSON.stringify(role));
      }

      return response?.data;
    } catch (error) {
      return error?.response;
    }
  },

  async getUserDetailsById(id) {
    try {
      const response = await api.get(`/users/${id}`);

      if ([200, 201].includes(response?.status)) {
        return response?.data;
      }

      return response?.data;
    } catch (error) {
      return error?.response;
    }
  },
};

export const {
  getAnimals,
  getCategories,
  registerOrSignUp,
  getAnimalsFilter,
  signIn,
  deleteUser,
  approvedByAdmin,
  rejectedByAdmin,
  getUserDetailsById,
  updateUser,
} = animalAPIs;

export default animalAPIs;
