import dispatcher from "../dispatcher";
import axios from "axios";
let handlersURL = "http://localhost:80/missionariesvote/phpscripts/"
export function sendUserInfo(name, email, phone) {
  axios.post(handlersURL + "senduserinfo.php",
    {
      name,
      email,
      phone
    })
    .then((response) => {
      dispatcher.dispatch({type: "FETCH_TWEETS_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
    })
}
