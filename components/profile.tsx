import { UserProfile } from "@/app/page";
import Link from "next/link";

interface ProfileProps {
  profile: UserProfile;
}

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="flex flex-col mb-6 w-full">
      <h1 className="text-2xl mb-2 flex-grow">{profile.display_name}</h1>
      <Link href={profile.uri}>View on spotify</Link>
      <p>{profile.country}</p>
    </div>
  );
};

export default Profile;
