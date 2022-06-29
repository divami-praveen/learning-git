import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
// this is a test comment
interface IAPIConfig {
  URL: string;
  method: string;
  params: string;
  payLoad: Record<string, unknown>;
  msg: string;
}
//two
//three
//four
//dd
interface IMethods {
  URL: string;
  payLoad: Record<string, unknown>;
  msg: string;
}
//here
const useApi = (obj: IAPIConfig) => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const handleSuccessCallback = (res: AxiosResponse) => {
    setData(res);
  };
  const errorCallback = (res: AxiosError) => {
    setError(res);
  };

  /**
   * @param msg is not used yet. it is currently a placeholder. in future we will use it to handle toast message
   */
  function fetchMethod({ URL, msg }: { URL: string; msg: string }) {
    setLoading(true);
    return axios
      .get(URL)
      .then((response: AxiosResponse) => {
        handleSuccessCallback(response?.data);
        setLoading(false);
        return response;
      })
      .catch((err: AxiosError) => {
        errorCallback(err);
        return err;
      });
  }

  /**
   * @param msg is not used yet. it is currently a placeholder. in future we will use it to handle toast messages
   */
  const postMethod = ({ URL, payLoad, msg }: IMethods) => {
    return axios
      .post(URL, payLoad)
      .then((response: AxiosResponse) => {
        handleSuccessCallback(response);
        return response;
      })
      .catch((err: AxiosError) => {
        errorCallback(err);
        return err;
      });
  };

  /**
   * @param msg is not used yet. it is currently a placeholder. in future we will use it to handle toast messages
   */
  function deleteMethod({ URL, payLoad, msg }: IMethods) {
    return axios
      .delete(URL, payLoad)
      .then((response) => {
        handleSuccessCallback(response);
        return response;
      })
      .catch((err) => {
        errorCallback(err);
        return err;
      });
  }

  /**
   * @param msg is not used yet. it is currently a placeholder. in future we will use it to handle toast messages
   */
  function putMethod({ URL, payLoad, msg }: IMethods) {
    return axios
      .put(URL, payLoad)
      .then((response) => {
        handleSuccessCallback(response);
        return response;
      })
      .catch((err) => {
        errorCallback(err);
        return err;
      });
  }

  function doApi(obj: IAPIConfig) {
    switch (obj.method) {
      case "GET":
        return fetchMethod(obj);
      case "POST":
        return postMethod(obj);

      case "PUT":
        return putMethod(obj);

      case "DELETE":
        return deleteMethod(obj);

      default:
        console.log("wrong method written");
        return "";
    }
  }

  return [data, doApi];
};

export default useApi;
