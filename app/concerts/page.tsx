const mockConcerts = [
  {
    id: 1,
    name: "Concert Name 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra bibendum volutpat. Etiam volutpat nulla ut felis sollicitudin, eget varius sapien convallis. Cras sem nunc, ullamcorper ac purus non, fringilla pulvinar dui. Quisque ut commodo mi, ut efficitur massa. Donec ligula turpis, tincidunt tempor nunc eget, congue placerat felis. Sed dictum risus vitae vulputate vehicula. Cras sit amet nibh dapibus, rutrum felis a, rhoncus augue.",
    reservations: 500,
  },
  {
    id: 2,
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra bibendum volutpat. Etiam volutpat nulla ut felis sollicitudin, eget varius sapien convallis.",
  },
];

function getConcerts() {
  return mockConcerts;
}

export default function ConcertsPage() {
  const concerts = getConcerts();

  return (
    <div>
      <h1>Concerts</h1>
      <div>
        {concerts?.map((concert) => {
          return <Concert key={concert.id} concert={concert} />;
        })}
      </div>
    </div>
  );
}

function Concert({ concert }: any) {
  const { id, name, description, reservations } = concert || {};

  return (
    <div>
      <h2>{name}</h2>
      <h5>{description}</h5>
      <p>{reservations}</p>
    </div>
  );
}
