import axios from 'axios'

export const returnToDispatch = (dispatch: any, type: string, payload?: any) => {
    dispatch({
      type: type,
      payload: payload,
    });
};

export const postApi = (url: string, body: any, headers: any) => {
  return new Promise((resolve, reject) => {
    console.log('url ==>' + url);
    // console.log("AuthToken ==>" + JSON.stringify(AuthToken));
    console.log('body ==>' + JSON.stringify(body));

    axios
      .post(url, body, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('postApi Response' + JSON.stringify(response));
        resolve(response);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};