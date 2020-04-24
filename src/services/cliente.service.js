import http from "../http-common";

class ClienteDataService {
  getAll() {
    return http.get("/clientes");
  }

  get(id) {
    return http.get(`/clientes/${id}`);
  }

  create(data) {
    return http.post("/clientes", data);
  }

  update(id, data) {
    return http.put(`/clientes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clientes/${id}`);
  }

  deleteAll() {
    return http.delete(`/clientes`);
  }

  findByNome(nome) {
    return http.get(`/clientes?nome=${nome}`);
  }
}

export default new ClienteDataService();