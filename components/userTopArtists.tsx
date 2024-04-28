import Image from "next/image";

interface UserTopArtistProps {
  topArtists: object;
}

const UserTopArtists = ({ topArtists }: UserTopArtistProps) => {
  return (
    <div className="flex flex-col mb-6 w-full">
      <h2 className="text-2xl mb-6">Top Artists</h2>
      <div className="flex flex-wrap gap-4">
        {topArtists &&
          topArtists.items.map((artist) => (
            <div key={artist.id}>
              <h3>{artist.name}</h3>
              <Image
                height={200}
                alt={artist.name}
                width={200}
                src={artist.images[0].url}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserTopArtists;
