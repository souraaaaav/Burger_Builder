import axios from 'axios'

const instance=axios.create({
    baseURL:"https://burgerbycr3w-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

export default instance