import Axios from 'axios';

const getAllUser = async () => {
    Axios.get('https://vic-corporation.herokuapp.com')
    .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
       console.log(error);
      })
};

getAllUser();
export default getAllUser;