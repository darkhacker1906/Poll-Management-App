import axios from "axios";
const Instance=axios.create({
    baseURL:"https://etechpolltesting.onreander.com",
})
export default Instance;