import {environment} from "../../environments/environment";

const {API} = environment

export const urls = {
  auth: `${API}/auth`,
  board: `${API}/boards`,
  task: `${API}/board`,
  user: `${API}/users`
}
