import { useClientById } from "@services/accumulation";

const Dropdownvii = ({ client, setClient, customer, user }) => {
  const { data: customers, isLoading } = useClientById(user.id);

  const handleSelect = (e) => {
    setClient(e.target.value);
  };

  return (
    <div className="mt-4 ml-4 outline-none">
      <select
        className="p-4 text-white bg-green-500 outline-none rounded-xl"
        onChange={handleSelect}
      >
        <option value={""}>Select Client</option>
        {customer.map((client) => (
          <option value={client.id} key={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdownvii;
