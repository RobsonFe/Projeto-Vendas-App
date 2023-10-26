import Axios, { AxiosInstance } from "axios";

export const httpClient: AxiosInstance = Axios.create({
    baseURL: "http://localhost:8080"  // Troque o ponto e vírgula por uma vírgula
});

