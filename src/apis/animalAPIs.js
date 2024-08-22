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

  async addCategoryAPIs(data) {
    try {
      const response = await api.post(
        "/categories",
        data
      );

      return response?.data;
    } catch (error) {
      return error?.response;
    }
  },

  async postCategoriesAPIs(data){
    console.log(data);
    try {
      const res = await api.post('animals', data);
      console.log(res?.data)
      return res.data;
    } catch (error) {
      return error.message;
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
  addCategoryAPIs,
  postCategoriesAPIs,
  signIn,
  deleteUser,
  approvedByAdmin,
  rejectedByAdmin,
  getUserDetailsById,
  updateUser,
} = animalAPIs;

export default animalAPIs;
