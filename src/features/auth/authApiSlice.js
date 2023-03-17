import { apiSlice } from "../../app/api/apiSlice";
import { setCSRFToken } from '../../features/auth/authSlice'
import { useCSRFToken } from "../hooks/useCSRFToken";

const csrfToken = useCSRFToken();

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    "Content-Type": "application/json"
                  },
            })
        }),
        onfulfilled: (response) => {
            const csrftoken = response.headers.get('csrftoken');
            if (csrftoken) {
      
              store.dispatch(setCSRFToken(csrftoken));
            }
          },
    }),
    refreshTokens: builder.mutation({
        query: () => ({
          url: '/auth/refresh-tokens',
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }),
      }),
    // }),
    onError: (error) => {
      if (error.status === 403) {
        // Refresh the CSRF token
        fetch('/auth/login/', { credentials: 'include' })
          .then((response) => {
            const csrftoken = response.headers.get('csrftoken');
            if (csrftoken) {
              // Update the authentication slice with the new CSRF token
              store.dispatch(setCSRFToken(csrftoken));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
})



export const {
    useLoginMutation
} = authApiSlice