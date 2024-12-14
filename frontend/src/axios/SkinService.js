// import axios from "axios";
//
//
// class SkinService{
//
//     // static BASE_URL = `${process.env.REACT_APP_ENV_BACKEND_URL}`;
//     // static FRONTEND_URL = `${process.env.REACT_APP_ENV_FRONTEND_URL}`;
//
//
//     static BASE_URL = import.meta.env.VITE_ENV_BACKEND_URL;
//     // console.log(BASE_URL);
//     static FRONTEND_URL =import.meta.env.VITE_ENV_FRONTEND_URL;
//
// // static async getAllSkins(){
// //     try{
// //         const response = await axios.get(`${SkinService.BASE_URL}/public/get-all-products`)
// //         console.log(response);
// //         return response.data;
// //     }catch(err){
// //         throw err;
// //     }
// // }
//
// static async getAllSkins() {
//
//     console.log(SkinService.BASE_URL);
//     console.log(SkinService.FRONTEND_URL);
//     try {
//         const response = await fetch(`${SkinService.BASE_URL}/public/get-all-products`);
//         console.log("getAllSkins: ");
//         console.log(response);
//         // Sprawdź, czy odpowiedź jest OK (status 200-299)
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (err) {
//         // throw err;
//         console.log(err);
//     }
// }
//
//
// static async addSkin(skinData, token) {
//     try {
//         const response = await axios.post(
//             `${SkinService.BASE_URL}/admin/add-product`,
//             skinData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }
//
//
// static async deleteSkin(skinid,token) {
//     try {
//         const response = await axios.delete(
//             `${SkinService.BASE_URL}/admin/delete-product/${skinid}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }
//
// static async updateSkin(skinid, skin, token) {
//     console.log(skin);
//     try {
//         const response = await axios.put(
//             `${SkinService.BASE_URL}/admin/update/product/${skinid}`,
//             skin,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//
//             }
//         );
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }
//
// static async addOrder(products_id_list, token) {
//     try {
//         const response = await axios.post(
//             `${SkinService.BASE_URL}/adminuser/add_order`,
//             products_id_list,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }
//
//
//
//
//
//
//
// }
// export default SkinService;