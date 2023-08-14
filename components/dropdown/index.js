import { useClientById } from "@services/accumulation";

const Dropdown = ({ client, setClient, customer, user }) => {
  const { data: customers, isLoading } = useClientById(user.id);
  return (
    <div className="mt-4 ml-4 dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        {client === "" ? "Select Client" : client}
      </div>

      <ul
        tabIndex="0"
        className="p-2 bg-black shadow menu dropdown-content rounded-box w-52"
      >
        {isLoading === false &&
          customer.map((client) => (
            <li
              key={client.cusid}
              className="text-white hover:bg-blue-500 hover:rounded-lg"
              onClick={(event) => setClient(event.target.text)}
            >
              {/* <a>{client.customer.name}</a> */}
              <a>{client.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
