import { onMount } from 'solid-js';

function Login() {
  onMount(() => {
    // Step 1: Redirect the user to the AWS Cognito Hosted UI in a new window or tab
    window.open(process.env.COGNITO_LOGIN_LINK, '_blank');
  });

  return (
    <div>Loading...</div>
  );
}

export default Login;