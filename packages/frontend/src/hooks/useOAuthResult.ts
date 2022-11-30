import { useSearchParams } from "react-router-dom";

export function useOAuthResult() {
    const [searchParams] = useSearchParams(window.location.hash);
  
    return {
      state: searchParams.get("state"),
      error: searchParams.get("error"),
      customToken: searchParams.get("access_token")
    };
}