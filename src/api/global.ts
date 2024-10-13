import axiosClient from "@api/axiosClient.ts";

export async function getKeycloak() {
    try {
        const response = await axiosClient("http://localhost:8080").get(
            "/keycloak",
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error Fetching data", error);
    }
}
