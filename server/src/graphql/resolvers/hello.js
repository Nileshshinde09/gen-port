const hello = () => "Hello, world !";
const getHelloUser = (_,{ id },context) => {
  console.log('====================================');
  console.log(context.user);
  console.log('====================================');
  return {
    id,
    name: "John Doe",
    email: "john.doe@example.com", 
  };
};

const Hello = { hello, getHelloUser };
export default Hello;
