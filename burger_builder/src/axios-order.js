import axios from 'axios'

const instance=axios.create({
    baseURL:"https://react-burger-project-a7a97-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

export default instance