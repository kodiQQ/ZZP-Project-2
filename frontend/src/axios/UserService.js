import axios from "axios";


async function fetchData(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parsujemy zawartość jako JSON
    //   console.log("teraz wypisuje tresc")
    //   console.log(data)
      return data;

    } catch (error) {
      console.error("Błąd:", error); // Obsługa błędów
    }
  }


class UserService{
    static BASE_URL = import.meta.env.VITE_ENV_BACKEND_URL;
    static FRONTEND_URL =import.meta.env.VITE_ENV_FRONTEND_URL;

    static async login(email, password) {
        console.log(email, password);
        try {
            let userData = await axios.post(`${UserService.BASE_URL}/api/auth/login`, {
                email,
                password
            });
            console.log("Userdata token")
            console.log(userData.data.token)
            sessionStorage.setItem('token', userData.data.token);
            sessionStorage.setItem('role', userData.data.role);

            // Obsługa sukcesu logowania
            console.log('Login successful:', userData.data);
            alert('Login successful!');
        } catch (err) {
            // Obsługa błędu
            console.error('Login failed:', err);
            // setError('Invalid login or password.');
        }
    }
    static async getTasks(token){
        let tasks = await axios.get(`${UserService.BASE_URL}/api/adminuser/getAllTasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return tasks.data.taskEntityList
    }


    static async addTasks(token,title,description,statusId,categoryId){
        try {
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.post(
                `${UserService.BASE_URL}/api/adminuser/add_task`,
                {
                    title: title,
                    description: description,
                    customStatusId: statusId,
                    categoryId: categoryId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async updateTask(token,taskid,title,description,statusId,categoryId){
        try {
            console.log("taskid");
            console.log(taskid);
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.put(
                `${UserService.BASE_URL}/api/adminuser/putTask/${taskid}`,
                {
                    title: title,
                    description: description,
                    customStatusId: statusId,
                    categoryId: categoryId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async deleteTask(token,id){
        await axios.delete(`${UserService.BASE_URL}/api/adminuser/deleteTask/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }

    static async getCategories(token){
        let tasks = await axios.get(`${UserService.BASE_URL}/api/adminuser/getAllCategories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return tasks.data.categoryEntityList
    }

    static async getStatuses(token){
        let customStatuses = await axios.get(`${UserService.BASE_URL}/api/adminuser/getAllCustomStatuses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return customStatuses.data.customStatusEntityList
    }
    static async addStatus(token,name){
        try {
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.post(
                `${UserService.BASE_URL}/api/adminuser/add_status`,
                {
                    name: name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async updateStatus(token,taskid,name){
        try {
            console.log("taskid");
            console.log(taskid);
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.put(
                `${UserService.BASE_URL}/api/adminuser/putCustomStatus/${taskid}`,
                {
                    name: name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async deleteStatus(token,id){
        await axios.delete(`${UserService.BASE_URL}/api/adminuser/deleteCustomStatus/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }




    static async addCategory(token,name){
        try {
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.post(
                `${UserService.BASE_URL}/api/adminuser/add_category`,
                {
                    name: name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async updateCategory(token,categoryid,name){
        try {
            console.log("taskid");
            console.log(categoryid);
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.put(
                `${UserService.BASE_URL}/api/adminuser/putCategory/${categoryid}`,
                {
                    name: name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async deleteCategory(token,id){
        await axios.delete(`${UserService.BASE_URL}/api/adminuser/deleteCategory/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }




    static async handleCallback(key) {
        // console.log("wykonanie handlecallback")
        // console.log(window.location.href)
        try {
            let userData= await fetchData(`${UserService.BASE_URL}/auth/get_temporary_tokens/${key}`)
            // const response = await fetch(`${UserService.BASE_URL}/auth/get_temporary_tokens/${key}`);
            // const response = await fetch("http://localhost:8080/auth/get_temporary_tokens/af8cd21e-8cdb-4086-a53c-956710b4c350");
            // console.log(response)
            // console.log("Pomyślnie wykonany fetch")
            // console.log(data)
            console.log("ROLA:::::")
            console.log(userData.role)
            console.log(userData)
            sessionStorage.setItem('token', userData.token)
            sessionStorage.setItem('role', userData.role)
            console.log("pomyślne wykonanie handlecallback")
            
            // return response.data;
        } catch (err) {
            throw err;
        }
        fetch(`${UserService.BASE_URL}/auth/delete_temporary_tokens/${key}`, {
    method: 'DELETE'
})
    window.location.href = `${UserService.FRONTEND_URL}/`;

    }

    static async register(email,password){
        try {
            // Wysyłanie żądania POST z odpowiednimi danymi
            await axios.post(
                `${UserService.BASE_URL}/api/auth/register`,
                {
                    email:email,
                    password:password
                },

            );
            // Zwrócenie listy zadań
        } catch (error) {
            console.error("Błąd podczas dodawania zadania:", error);
            throw error; // Opcjonalnie wyrzucenie błędu, jeśli coś pójdzie nie tak
        }
    }

    static async getUser(token){
        try{
                const response = await axios.get(`${UserService.BASE_URL}/api/adminuser/getUser`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data.ourUsersEntity.email;
        }catch(err){
            throw err;
        }
    }


    // static async getAllUsers(token){
    //     try{
    //         const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }
    //
    //
    // static async getYourProfile(token){
    //     try{
    //         const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }
    //
    // static async getUserById(userId, token){
    //     try{
    //         const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }
    //
    // static async deleteUser(userId, token){
    //     try{
    //         const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }


    // static async updateUser(userId, userData, token){
    //     try{
    //         const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }

    /**AUTHENTICATION CHECKER */
    static logout(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        window.location.reload();

    }

    static isAuthenticated(){
        const token = sessionStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = sessionStorage.getItem('role')
        console.log("ROLA:")
        console.log(role)
        return role === 'ADMIN'
    }

    static isUser(){
        const role = sessionStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;