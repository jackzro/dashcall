const Dropdown = ({ client, setClient, customer, user }) => {
  return (
    <div className="mt-4 ml-4 dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        {client === "" ? "Select Client" : client}
      </div>

      <ul
        tabIndex="0"
        className="h-32 p-2 overflow-y-scroll bg-black shadow w-36 menu dropdown-content rounded-box"
      >
        {customer.length !== 0 &&
          customer.map((client) => (
            <li
              key={client.id}
              // key={client.cusid}
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
